'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundManager } from '../lib/audio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ManifestTier {
  count: number;
  width: number;
  height: number;
  prefix: string;
  suffix: string;
}

interface Manifest {
  desktop: ManifestTier;
  mobile: ManifestTier;
}

export function HeroArchCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameIdxRef = useRef<number>(0);
  const isSurpriseActiveRef = useRef<boolean>(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  const [totalFrames, setTotalFrames] = useState<number>(240);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 1. Clamped nearest-frame selector to guarantee zero stutter
  const getBestAvailableImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    const clamped = Math.max(0, Math.min(targetIdx, frames.length - 1));

    if (frames[clamped]) return frames[clamped];
    for (let i = clamped - 1; i >= 0; i--) if (frames[i]) return frames[i];
    for (let i = clamped + 1; i < frames.length; i++) if (frames[i]) return frames[i];
    return null;
  }, []);

  // 2. Cover-fit blit math with DPR scaling
  const renderCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getBestAvailableImage(frameIdx);
    const cw = canvas.width;
    const ch = canvas.height;

    if (img && img.naturalWidth > 0) {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const ratio = Math.max(cw / iw, ch / ih);
      const renderW = iw * ratio;
      const renderH = ih * ratio;
      const renderX = (cw - renderW) / 2;
      const renderY = (ch - renderH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, renderX, renderY, renderW, renderH);
    }
  }, [getBestAvailableImage]);

  // 3. Viewport & DPR Handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    renderCanvas(currentFrameIdxRef.current);
  }, [renderCanvas]);

  // Load manifest
  useEffect(() => {
    fetch('/sequence/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setManifest(data);
      })
      .catch(() => {});
  }, []);

  // Frame preloading & ScrollTrigger Setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const tierKey = isMobile && manifest?.mobile ? 'mobile' : 'desktop';
    const count = manifest ? manifest[tierKey].count : (isMobile ? 120 : 240);
    const prefix = manifest ? manifest[tierKey].prefix : (isMobile ? '/sequence/mobile/frame_' : '/sequence/desktop/frame_');
    const suffix = manifest ? manifest[tierKey].suffix : '.webp';
    const scrubFactor = isMobile ? 1.0 : 0.7;

    setTotalFrames(count);
    const frames: (HTMLImageElement | null)[] = new Array(count).fill(null);
    framesRef.current = frames;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Instant First Paint
    const firstImg = new Image();
    firstImg.src = `${prefix}0001${suffix}`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      setIsLoaded(true);
      renderCanvas(0);
    };

    // Progressive streaming preload
    for (let i = 1; i < count; i++) {
      const img = new Image();
      img.src = `${prefix}${String(i + 1).padStart(4, '0')}${suffix}`;
      img.onload = () => {
        frames[i] = img;
        if (Math.abs(currentFrameIdxRef.current - i) <= 1) {
          renderCanvas(currentFrameIdxRef.current);
        }
      };
    }

    // GSAP ScrollTrigger with 65% frame scrub and 35% hold runway
    const gsapCtx = gsap.context(() => {
      const handleScrollVelocity = () => {
        const now = performance.now();
        const delta = now - lastScrollTime.current;
        if (delta > 0) {
          const dist = Math.abs(window.scrollY - lastScrollY.current);
          soundManager.updateVelocity((dist / delta) * 100);
        }
        lastScrollY.current = window.scrollY;
        lastScrollTime.current = now;
      };
      window.addEventListener('scroll', handleScrollVelocity, { passive: true });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: scrubFactor,
        onUpdate: (self) => {
          const progress = self.progress;
          // Partition: 0.00 to 0.65 scrubs frame indices 0 to count-1; 0.65 to 1.00 holds last frame
          const scrubProgress = Math.min(1, progress / 0.65);
          const targetFrame = Math.floor(scrubProgress * (count - 1));
          currentFrameIdxRef.current = targetFrame;
          renderCanvas(targetFrame);

          // Reveal chime trigger
          if (progress >= 0.65 && !isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = true;
            soundManager.playSurpriseChime();
          } else if (progress < 0.58 && isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = false;
          }
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [manifest, renderCanvas, resizeCanvas]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[380vh] bg-cream-100">
      {/* Sticky Viewport Holder */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pt-20 sm:pt-24 px-6 sm:px-12">
        <div className="max-w-7xl w-full h-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 z-20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-ochre" />
              <span className="font-mono text-xs tracking-[0.25em] text-charcoal/60 uppercase">
                VOLUME NO. 04
              </span>
            </div>

            <div className="space-y-0">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif tracking-tight text-charcoal leading-[0.95]">
                Spaces that
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif italic text-ochre leading-[1.05]">
                  breathe
                </span>
                <span className="font-mono text-xs sm:text-sm text-charcoal/40 font-normal">
                  01
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif tracking-tight text-charcoal leading-[0.95]">
                light
              </h1>
            </div>

            <p className="max-w-md text-sm sm:text-base font-sans text-charcoal/70 leading-relaxed font-light">
              We compose rooms from daylight, quiet geometry and materials allowed to show their age.
            </p>

            <div className="pt-2 flex items-center gap-6">
              {/* Circular Explore Button Matching Reference */}
              <a
                href="#projects"
                className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-charcoal/20 hover:border-ochre flex items-center justify-center text-xs font-mono tracking-widest text-charcoal uppercase transition-all duration-300 hover:scale-105 bg-cream-50/50 backdrop-blur-sm shadow-sm"
              >
                <span className="group-hover:text-ochre transition-colors">EXPLORE</span>
                <div className="absolute inset-0 rounded-full border border-ochre/0 group-hover:border-ochre/40 transition-all duration-500 scale-110 opacity-0 group-hover:opacity-100 animate-pulse" />
              </a>

              <div className="hidden sm:flex flex-col text-[11px] font-mono text-charcoal/40 tracking-widest uppercase space-y-1">
                <span>SCROLL TO DIVE</span>
                <span className="text-ochre">60FPS CANVAS SCRUB</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Arched Canvas Frame */}
          <div className="lg:col-span-7 h-full flex items-center justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[540px] h-[60vh] sm:h-[72vh] rounded-t-[180px] sm:rounded-t-[240px] rounded-b-2xl overflow-hidden shadow-2xl border border-charcoal/5 bg-sand/30">
              
              {/* 3D Canvas Blitter */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover block transition-opacity duration-500"
                style={{ opacity: isLoaded ? 1 : 0.8 }}
              />

              {/* Floating Circular Lens Portal matching mockup */}
              <div className="absolute top-1/3 -right-3 sm:right-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden pointer-events-none z-10 bg-cream-200">
                <img
                  src="/images/staircase.jpg"
                  alt="Detail Lens"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Architectural Ambient Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal/20 via-transparent to-black/5" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
