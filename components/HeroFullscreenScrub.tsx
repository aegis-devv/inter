'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
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

interface HeroFullscreenScrubProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

// Ultra-smooth piecewise frame mapping with extended runway for frames 84-273
function calculateTargetFrame(norm: number, totalFrames: number): number {
  const f84Ratio = 84 / 476;
  const f273Ratio = 273 / 476;

  let frameRatio: number;

  if (norm <= 0.18) {
    const t = norm / 0.18;
    frameRatio = f84Ratio * t;
  } else if (norm <= 0.58) {
    const t = (norm - 0.18) / 0.40;
    const smoothT = 0.5 - 0.5 * Math.cos(t * Math.PI);
    frameRatio = f84Ratio + (f273Ratio - f84Ratio) * smoothT;
  } else {
    const t = Math.min(1, (norm - 0.58) / 0.42);
    frameRatio = f273Ratio + (1.0 - f273Ratio) * t;
  }

  return Math.min(totalFrames - 1, Math.max(0, Math.floor(frameRatio * (totalFrames - 1))));
}

export function HeroFullscreenScrub({ isMuted, onToggleSound }: HeroFullscreenScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentRenderedFrameRef = useRef<number>(0);
  const isSurpriseActiveRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  const [totalFrames, setTotalFrames] = useState<number>(476);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHoldActive, setIsHoldActive] = useState<boolean>(false);

  // 1. Clamped nearest-frame selector
  const getBestAvailableImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    const clamped = Math.max(0, Math.min(Math.round(targetIdx), frames.length - 1));

    if (frames[clamped]) return frames[clamped];
    for (let i = clamped - 1; i >= 0; i--) if (frames[i]) return frames[i];
    for (let i = clamped + 1; i < frames.length; i++) if (frames[i]) return frames[i];
    return null;
  }, []);

  // 2. Full-bleed canvas blitter optimized for low GPU overhead
  const renderCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
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

      ctx.drawImage(img, 0, 0, iw, ih, renderX, renderY, renderW, renderH);
    }
  }, [getBestAvailableImage]);

  // 3. Viewport resize & hardware-scaled DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const isLowEnd = typeof navigator !== 'undefined' && (
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
      ((navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4)
    );

    // Capping DPR to 1 on mobile/low-end prevents GPU fill-rate throttling
    const dpr = isMobile || isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    renderCanvas(currentRenderedFrameRef.current);
  }, [renderCanvas]);

  // 4. Smooth continuous frame lerp rendering loop
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        currentRenderedFrameRef.current += diff * 0.16;
        renderCanvas(currentRenderedFrameRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderCanvas]);

  // Fetch Manifest
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
    const count = manifest ? manifest[tierKey].count : (isMobile ? 160 : 476);
    const prefix = manifest ? manifest[tierKey].prefix : (isMobile ? '/sequence/mobile/frame_' : '/sequence/desktop/frame_');
    const suffix = manifest ? manifest[tierKey].suffix : '.webp';
    const scrubFactor = isMobile ? 0.6 : 0.8;

    setTotalFrames(count);
    const frames: (HTMLImageElement | null)[] = new Array(count).fill(null);
    framesRef.current = frames;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Instant First Frame Render on Mount
    const firstImg = new Image();
    firstImg.src = `${prefix}0001${suffix}`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      setIsLoaded(true);
      renderCanvas(0);
    };

    // Non-blocking chunked preloader (Prevents network and main thread freeze on mobile taps)
    let isCancelled = false;
    let currentIndex = 1;
    const CHUNK_SIZE = isMobile ? 3 : 6;

    const loadNextBatch = () => {
      if (isCancelled || currentIndex >= count) return;

      const end = Math.min(currentIndex + CHUNK_SIZE, count);
      for (let i = currentIndex; i < end; i++) {
        const img = new Image();
        img.src = `${prefix}${String(i + 1).padStart(4, '0')}${suffix}`;
        img.onload = () => {
          frames[i] = img;
        };
      }
      currentIndex = end;

      if (currentIndex < count) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextBatch, { timeout: 80 });
        } else {
          setTimeout(loadNextBatch, 30);
        }
      }
    };

    // Start streaming after initial frame paints
    setTimeout(loadNextBatch, 50);

    // GSAP ScrollTrigger
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
          setScrollProgress(progress);

          const rawNorm = Math.min(1, progress / 0.65);
          const targetFrame = calculateTargetFrame(rawNorm, count);
          targetFrameRef.current = targetFrame;

          if (progress >= 0.65 && !isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = true;
            setIsHoldActive(true);
            soundManager.playSurpriseChime();
          } else if (progress < 0.58 && isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = false;
            setIsHoldActive(false);
          }
        },
      });
    }, containerRef);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [manifest, renderCanvas, resizeCanvas]);

  const entryOpacity = Math.max(0, 1 - scrollProgress * 3.5);
  const entryTranslateY = scrollProgress * -70;

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[450vh] bg-[#0E1218]">
      
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center select-none">
        
        {/* Full-Bleed 3D Scrubbed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
          style={{ opacity: isLoaded ? 1 : 0.85 }}
        />

        {/* Soft gradient vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E1218]/80 via-transparent to-[#0E1218]/50" />

        {/* Clean Editorial Opening Layer */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-16 py-24 sm:py-32 pointer-events-none transition-all duration-300"
          style={{
            opacity: entryOpacity,
            transform: `translateY(${entryTranslateY}px)`,
          }}
        >
          {/* Top Sub-tag */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-ochre" />
              <span className="font-mono text-xs tracking-[0.3em] text-ochre uppercase font-medium">
                VOLUME NO. 04 / SANCTUARY OF DAYLIGHT
              </span>
            </div>
          </div>

          {/* Center Clean Editorial Title */}
          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-8xl md:text-9xl xl:text-[10.5rem] font-serif tracking-tight text-white leading-[0.92]">
                Spaces that
              </h1>
              <h1 className="text-5xl sm:text-8xl md:text-9xl xl:text-[10.5rem] font-serif italic text-ochre leading-[1.0]">
                breathe
              </h1>
              <h1 className="text-5xl sm:text-8xl md:text-9xl xl:text-[10.5rem] font-serif tracking-tight text-white leading-[0.92]">
                light.
              </h1>
            </div>

            <p className="max-w-xl text-sm sm:text-lg font-sans text-white/80 font-light leading-relaxed pt-2">
              We compose monolithic sanctuaries from celestial daylight, quiet materiality, and proportions allowed to breathe.
            </p>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                <ArrowDown className="w-3.5 h-3.5 text-ochre" />
              </div>
              <span className="text-xs font-mono tracking-widest text-white/60 uppercase">
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>
        </div>

        {/* Clean Pinned Hold Runway Bottom Card */}
        <div
          className={`absolute bottom-6 sm:bottom-12 left-0 right-0 z-30 px-4 sm:px-12 flex justify-center transition-all duration-500 ease-out ${
            isHoldActive
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="w-full max-w-4xl bg-[#11161D]/95 sm:backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-medium text-ochre uppercase tracking-widest block">
                ATELIER SANCTUARY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                Crafted Without Compromise.
              </h2>
              <p className="text-xs sm:text-sm font-sans text-white/70 max-w-md font-light leading-relaxed">
                The interior transition has reached full spatial stillness. The space is now yours to inhabit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/work"
                className="px-6 py-3.5 rounded-full bg-ochre hover:bg-ochre-dark text-charcoal font-mono text-xs font-medium tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>Explore Works</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/philosophy"
                className="px-5 py-3.5 rounded-full border border-white/15 hover:border-white/30 text-white font-mono text-xs tracking-widest uppercase transition-all bg-white/5"
              >
                Material Matrix
              </a>
            </div>

          </div>
        </div>

        {/* Minimal Bottom Right Controls */}
        <div className="absolute right-4 sm:right-10 bottom-6 sm:bottom-8 z-20 flex items-center gap-3">
          <button
            onClick={onToggleSound}
            className="p-3 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-ochre transition-all"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-ochre" />}
          </button>

          <div className="px-3.5 py-2 rounded-full bg-black/60 border border-white/10 text-xs font-mono tracking-widest text-white/70 hidden sm:flex items-center gap-2">
            <span className="text-ochre">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
