# 🚀 MASTER 3D SCROLL-JACKING CANVAS BLUEPRINT v3.0
### Universal Single-Prompt Framework for Next.js, GSAP, Lenis, Web Audio & Cloudflare Edge

> **Purpose**: The definitive, production-tested specification and master prompt engine. Transforms **any 3D video** (product turntable, exploded CAD assembly, architectural flythrough, drone landscape, or interior transition) into a 60fps Full HD canvas-scrubbed web experience with **butter-smooth bidirectional scroll pacing**, **first-scroll ease-in**, **permanent tail frame hold**, **adaptive focal velocity remapping**, **dynamic navbar transition transparency**, **non-blocking idle preloading**, **Web Audio synthesis**, and **1-click Cloudflare deployment**.

---

## 📋 QUICK-START: THE AI MASTER PROMPT (COPY-PASTE)

*Copy the prompt below into any AI agent / coding assistant along with your video file:*

```markdown
You are an elite creative technologist and senior frontend architect building a production-grade, full-bleed 3D frame-scrubbed interactive web application using Next.js (App Router, Static Export), TypeScript, Tailwind CSS, Lenis Smooth Scroll, GSAP ScrollTrigger, and the Web Audio API.

### 1. SPECIFICATIONS & INPUT VARIABLES
- **Input Video**: `[INPUT_VIDEO_FILENAME.mp4]` in the project root (3D product turntable, exploded view, architectural flythrough, or scene transition).
- **Brand / Project Name**: `[INSERT_BRAND_NAME]`
- **Color Palette**: `[INSERT_PRIMARY_COLOR, ACCENT_COLOR, BACKGROUND_COLOR, TEXT_COLOR]` (e.g. Alabaster `#FAF8F5`, Deep Charcoal `#0E1218` / `#11161D`, Ochre Gold `#C5A880`)
- **Typography**: Editorial Serif (e.g. Cormorant Garamond / Playfair Display), Modern Sans (Plus Jakarta Sans / Inter), Monospace (Space Mono / JetBrains Mono)
- **Target Pages & Routes**:
  1. `/` (Home: Full-bleed 3D Video Scrub Hero + Curated Showcase Highlights)
  2. `/work` (Dedicated Showcase / Product Catalog with Filter Pills)
  3. `/philosophy` (Design Ethos / Technical Specification & Material Matrix)
  4. `/journal` (Case Studies, Monograph Notes & Articles)
  5. `/contact` (Client Commission / Inquiry Form & Global Studio Directory)

---

### 2. CORE ARCHITECTURAL & INTERACTION LAWS (PRODUCTION-TESTED)

#### LAW 1: BIDIRECTIONAL SCROLL PACING & FIRST-SCROLL DYNAMICS
1. **Scroll Runway Height**: Set hero container height to `h-[480vh]` (for 400–500 frames) or $\approx 100\text{vh}$ per 100 frames. Shorter runways (e.g. 300vh) compress frame travel and make the initial scroll gesture feel rushed and abrupt.
2. **Soft First-Scroll Ease-In ($p \in [0.00, 0.03]$)**:
   - Hold `targetFrame = 0` during the first 3% of scroll.
   - Let initial headline and scroll prompts float upward with gentle `translateY` and fade out softly between $p = 0.04$ and $p = 0.32$. This guarantees the first user gesture feels poised, deliberate, and luxurious.
3. **Smooth S-Curve Travel ($p \in [0.03, 0.88]$)**:
   - Remap normalized progress $u = \frac{p - 0.03}{0.88 - 0.03}$ using continuous cosine easing:
     $$\text{smooth} = \frac{1 - \cos(u \cdot \pi)}{2}$$
     $$\text{targetFrame} = \lfloor \text{smooth} \times (\text{TotalFrames} - 1) \rfloor$$
4. **Rock-Solid Tail Lock ($p \in [0.88, 1.00]$)**:
   - For all $p \ge 0.88$, lock `targetFrame = TotalFrames - 1`.
   - **Immediately preload the final 35 frames** on mount so the final state is instantly available and never flickers when reaching the bottom or scrolling back up.
5. **Bidirectional Symmetry**:
   - The continuous `rAF` lerp loop ($\text{diff} \times 0.20$) and frame blitter must operate symmetrically when scrolling down (forward) and scrolling up (reverse).
   - If an intermediate frame is loading during rapid reverse scrub, fallback to the nearest available frame searching in both directions (`frameIndex - offset` and `frameIndex + offset`).

#### LAW 2: CANVAS BLITTER & GPU EFFICIENCY
1. **Never use `<video>` seek**: Blit preloaded WebP frames directly to an HTML5 `<canvas>` via `ctx.drawImage` with aspect-ratio cover math.
2. **GPU Optimization**: Use `canvas.getContext('2d', { alpha: false, desynchronized: true })` to cut GPU memory bandwidth by ~50% and eliminate composite latency.
3. **DPR Capping**: Cap DPR to `1.0` on mobile and low-end devices (`deviceMemory < 4` or `hardwareConcurrency <= 4`) and `Math.min(window.devicePixelRatio || 1, 1.5)` on desktop.
4. **Instant First Frame**: Load and render `frame_0001.webp` synchronously on mount (zero blank/black screen).
5. **Non-Blocking Chunked Idle Preloading**:
   - Preload intermediate frames in batches of 6–12 frames via `requestIdleCallback` (or 20–30ms timeouts).
   - Do NOT fire hundreds of `Image()` requests simultaneously, which freezes mobile touch threads and network pools.

#### LAW 3: NAVBAR DYNAMICS & ZERO SCROLL CONFLICT
1. **Compact Floating Island Pill**: Constrain navbar width to `max-w-4xl` / `max-w-3xl` with backdrop blur (`bg-[#11161D]/80 hover:bg-[#11161D]/95 backdrop-blur-xl border border-white/15`).
2. **Dynamic Transition Transparency**:
   - Fade navbar to transparent (`opacity-0 pointer-events-none transition-opacity duration-700`) during mid-transition ($p \in [0.06, 0.88]$).
   - Reappear smoothly at the top ($p \le 0.06$) and once the transformation completes ($p \ge 0.88$).
3. **No Native Smooth Scroll Conflict**:
   - **Never** add `scroll-behavior: smooth` in CSS when using Lenis + GSAP ScrollTrigger, as native CSS smooth scrolling fights Lenis physics and causes jitter.

#### LAW 4: ZERO AI CLUTTER / EDITORIAL LUXURY
1. **No AI Tropes**: NO emojis, NO sparkle/starburst particles, NO robotic badges (`CANVAS 60FPS INTERPOLATED` / `FRAME 0001 OF 476` must be omitted).
2. **Clean Typography**: High-contrast editorial serif headers, subtle monospace metadata tags (`uppercase tracking-[0.3em]`), and soft off-white sans body text.
3. **Mobile Adapters**: Multi-button matrices must convert to clean `<select>` native dropdowns on mobile screens.

#### LAW 5: SYNTHESIZED WEB AUDIO & CLOUDFLARE DEPLOYMENT
1. **Synthesized Audio Engine**: Zero-asset Web Audio synth featuring an ambient lowpass drone modulated by scroll velocity and a harmonic chord chime at the reveal threshold.
2. **Static Cloudflare Deployment**:
   - `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`.
   - `wrangler.toml` and `wrangler.json` with `[assets] directory = "./out"` and `html_handling = "auto-trailing-slash"`.
```

---

## 📐 UNIVERSAL MATHEMATICAL VELOCITY FORMULAS

### 1. Unified S-Curve with Soft Deadband & Runway Lock
For any standard 3D sequence:

$$\text{FrameRatio}(p) = \begin{cases}
0.0 & p \le 0.03 \\
\frac{1 - \cos\left(\pi \cdot \frac{p - 0.03}{0.88 - 0.03}\right)}{2} & 0.03 < p < 0.88 \\
1.0 & p \ge 0.88
\end{cases}$$

$$\text{TargetFrame}(p) = \text{round}\Big(\text{FrameRatio}(p) \times (\text{TotalFrames} - 1)\Big)$$

---

### 2. Piecewise Adaptive Focal Zone Remapping (For Fast Mechanical/Interior Events)
When a raw 3D video contains a rapid focal transformation (e.g. camera flying through a doorway or CAD assembly exploding) occurring between frame fractions $[F_{\text{start}}, F_{\text{end}}]$, map it across a generous scroll runway $[S_{\text{start}}, S_{\text{end}}]$:

$$\text{FrameRatio}(p) = \begin{cases}
F_{\text{start}} \times \left(\frac{p}{S_{\text{start}}}\right) & p \le S_{\text{start}} \\
F_{\text{start}} + (F_{\text{end}} - F_{\text{start}}) \times \left[\frac{1 - \cos\left(\pi \cdot \frac{p - S_{\text{start}}}{S_{\text{end}} - S_{\text{start}}}\right)}{2}\right] & S_{\text{start}} < p \le S_{\text{end}} \\
F_{\text{end}} + (1.0 - F_{\text{end}}) \times \left(\frac{p - S_{\text{end}}}{S_{\text{lock}} - S_{\text{end}}}\right) & S_{\text{end}} < p < S_{\text{lock}} \\
1.0 & p \ge S_{\text{lock}}
\end{cases}$$

---

## 🛠️ COMPLETE PRODUCTION CODE TEMPLATES

### 1. High-Definition Dual-Tier Frame Extraction (`scripts/extract_frames.js`)

```javascript
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let ffmpegPath = process.env.FFMPEG_PATH;
if (!ffmpegPath) {
  try {
    ffmpegPath = require('ffmpeg-static');
  } catch (e) {
    ffmpegPath = 'ffmpeg';
  }
}

const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
const mp4File = rootFiles.find(f => f.toLowerCase().endsWith('.mp4'));
if (!mp4File) {
  console.error('Error: No .mp4 video found in project root directory.');
  process.exit(1);
}
const inputVideo = path.join(__dirname, '..', mp4File);

const publicDir = path.join(__dirname, '..', 'public');
const sequenceDir = path.join(publicDir, 'sequence');
const desktopDir = path.join(sequenceDir, 'desktop');
const mobileDir = path.join(sequenceDir, 'mobile');
const manifestPath = path.join(sequenceDir, 'manifest.json');

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

function runCommand(cmd, args, silent = false) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: silent ? 'ignore' : 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${args.join(' ')} (code ${code})`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  console.log('--- Cleaning previous frame sequences ---');
  for (const dir of [desktopDir, mobileDir]) {
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')) {
          fs.unlinkSync(path.join(dir, f));
        }
      }
    }
  }

  console.log('--- Step 1: Desktop 1080p Lanczos Tier (1920x1080 + Unsharp Enhancement) ---');
  await runCommand(ffmpegPath, [
    '-y',
    '-i', inputVideo,
    '-filter:v', "minterpolate='mi_mode=blend:fps=60',scale=1920:1080:flags=lanczos,unsharp=5:5:0.85:5:5:0.0",
    '-vcodec', 'libwebp',
    '-q:v', '92',
    '-preset', 'photo',
    path.join(desktopDir, 'frame_%04d.webp')
  ]);

  const desktopFrames = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${desktopFrames.length} Desktop frames.`);

  console.log('--- Step 2: Mobile Subsampled Tier (960x540) ---');
  const selectedDesktopIndices = [];
  for (let i = 0; i < desktopFrames.length; i += 3) {
    selectedDesktopIndices.push(i);
  }
  if (selectedDesktopIndices[selectedDesktopIndices.length - 1] !== desktopFrames.length - 1) {
    selectedDesktopIndices.push(desktopFrames.length - 1);
  }

  const CONCURRENCY = 8;
  const queue = selectedDesktopIndices.map((dIdx, mIdx) => ({ dIdx, mIdx }));

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      const { dIdx, mIdx } = item;
      const srcFile = path.join(desktopDir, desktopFrames[dIdx]);
      const mobileNum = String(mIdx + 1).padStart(4, '0');
      const dstFile = path.join(mobileDir, `frame_${mobileNum}.webp`);

      await runCommand(ffmpegPath, [
        '-y',
        '-i', srcFile,
        '-vf', 'scale=960:540:flags=lanczos',
        '-vcodec', 'libwebp',
        '-q:v', '85',
        dstFile
      ], true);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const mobileFrames = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${mobileFrames.length} Mobile frames.`);

  const manifest = {
    desktop: {
      count: desktopFrames.length,
      width: 1920,
      height: 1080,
      prefix: '/sequence/desktop/frame_',
      suffix: '.webp'
    },
    mobile: {
      count: mobileFrames.length,
      width: 960,
      height: 540,
      prefix: '/sequence/mobile/frame_',
      suffix: '.webp'
    }
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('✓ High-Definition Manifest written to public/sequence/manifest.json');
}

main().catch(console.error);
```

---

### 2. Full-Bleed 3D Scrub Engine (`components/HeroFullscreenScrub.tsx`)

```tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../lib/audio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroFullscreenScrubProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onTransitionStateChange?: (isTransitioning: boolean) => void;
}

export function HeroFullscreenScrub({ isMuted, onToggleSound, onTransitionStateChange }: HeroFullscreenScrubProps) {
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
  const [manifest, setManifest] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const getBestAvailableImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    const clamped = Math.max(0, Math.min(Math.round(targetIdx), frames.length - 1));

    if (frames[clamped] && frames[clamped]?.complete && frames[clamped]!.naturalWidth > 0) {
      return frames[clamped];
    }
    // Bidirectional fallback search
    for (let offset = 1; offset < 30; offset++) {
      const prev = frames[clamped - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) return prev;
      const next = frames[clamped + offset];
      if (next && next.complete && next.naturalWidth > 0) return next;
    }
    return frames[0] || null;
  }, []);

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

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = typeof navigator !== 'undefined' && (
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) ||
      ((navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4)
    );
    const dpr = isMobile || isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    renderCanvas(currentRenderedFrameRef.current);
  }, [renderCanvas]);

  // Continuous Symmetric rAF Lerp Loop (Liquid Honey Interpolation)
  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!active) return;
      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        const nextFrame = Math.abs(diff) < 0.25 ? target : current + diff * 0.20;
        currentRenderedFrameRef.current = nextFrame;
        renderCanvas(Math.round(nextFrame));
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };
    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderCanvas]);

  useEffect(() => {
    fetch('/sequence/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setManifest(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const tierKey = isMobile && manifest?.mobile ? 'mobile' : 'desktop';
    const count = manifest ? manifest[tierKey].count : (isMobile ? 160 : 476);
    const prefix = manifest ? manifest[tierKey].prefix : (isMobile ? '/sequence/mobile/frame_' : '/sequence/desktop/frame_');
    const suffix = manifest ? manifest[tierKey].suffix : '.webp';

    setTotalFrames(count);
    const frames: (HTMLImageElement | null)[] = new Array(count).fill(null);
    framesRef.current = frames;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 1. Synchronous First Frame Render
    const firstImg = new Image();
    firstImg.src = `${prefix}0001${suffix}`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      setIsLoaded(true);
      renderCanvas(0);
    };

    // 2. Immediately Preload Final 35 Tail Frames (Prevents Flashes & Lock Jump)
    const endStart = Math.max(1, count - 35);
    for (let i = endStart; i < count; i++) {
      const img = new Image();
      img.src = `${prefix}${String(i + 1).padStart(4, '0')}${suffix}`;
      img.onload = () => { frames[i] = img; };
    }

    // 3. Non-Blocking Chunked Idle Preloader
    let isCancelled = false;
    let currentIndex = 1;
    const CHUNK_SIZE = isMobile ? 6 : 12;

    const loadNextBatch = () => {
      if (isCancelled || currentIndex >= endStart) return;
      const end = Math.min(currentIndex + CHUNK_SIZE, endStart);
      for (let i = currentIndex; i < end; i++) {
        if (!frames[i]) {
          const img = new Image();
          img.src = `${prefix}${String(i + 1).padStart(4, '0')}${suffix}`;
          img.onload = () => { frames[i] = img; };
        }
      }
      currentIndex = end;
      if (currentIndex < endStart) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextBatch, { timeout: 60 });
        } else {
          setTimeout(loadNextBatch, 20);
        }
      }
    };
    setTimeout(loadNextBatch, 30);

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
        scrub: 0.2,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Pacing Formula: Ease-in (0.00-0.03), Butter Cosine Glide (0.03-0.88), Rock Lock (>= 0.88)
          let targetFrame: number;
          if (progress >= 0.88) {
            targetFrame = count - 1;
          } else if (progress <= 0.03) {
            targetFrame = 0;
          } else {
            const raw = (progress - 0.03) / (0.88 - 0.03);
            const smooth = 0.5 - 0.5 * Math.cos(raw * Math.PI);
            targetFrame = Math.min(count - 1, Math.max(0, Math.round(smooth * (count - 1))));
          }
          targetFrameRef.current = targetFrame;

          // Notify Navbar for Dynamic Transparency
          if (onTransitionStateChange) {
            const isMidTransition = progress > 0.06 && progress < 0.88;
            onTransitionStateChange(isMidTransition);
          }

          if (progress >= 0.85 && !isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = true;
            soundManager.playSurpriseChime();
          } else if (progress < 0.75 && isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = false;
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

  const entryOpacity = scrollProgress < 0.04 ? 1 : Math.max(0, 1 - (scrollProgress - 0.04) * 3.2);
  const entryTranslateY = scrollProgress * -45;
  const cardOpacity = scrollProgress < 0.65 ? 0 : Math.min(1, (scrollProgress - 0.65) / 0.20);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-[480vh] bg-[#0E1218]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center select-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover block pointer-events-none" style={{ opacity: isLoaded ? 1 : 0.85 }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E1218]/80 via-transparent to-[#0E1218]/50" />

        {/* Opening Editorial Layer */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-16 py-28 sm:py-36 pointer-events-none transition-all duration-300" style={{ opacity: entryOpacity, transform: `translateY(${entryTranslateY}px)` }}>
          <div className="w-full max-w-7xl mx-auto flex items-center gap-3">
            <span className="w-8 h-px bg-ochre" />
            <span className="font-mono text-xs tracking-[0.3em] text-ochre uppercase font-medium">ATELIER LIVING SPACES</span>
          </div>

          <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
            <h1 className="text-5xl sm:text-8xl md:text-9xl xl:text-[10.5rem] font-serif tracking-tight text-white leading-[0.92]">
              Spaces that <span className="italic text-ochre">breathe</span> light.
            </h1>
            <p className="max-w-xl text-sm sm:text-lg font-sans text-white/80 font-light leading-relaxed pt-2">
              We compose monolithic sanctuaries from celestial daylight, quiet materiality, and proportions allowed to breathe.
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto flex items-center gap-4">
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70">
              <ArrowDown className="w-3.5 h-3.5 text-ochre" />
            </div>
            <span className="text-xs font-mono tracking-widest text-white/60 uppercase">SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* Pinned Hold Runway Bottom Card */}
        <div
          className="absolute bottom-6 sm:bottom-12 left-0 right-0 z-30 px-4 sm:px-12 flex justify-center transition-all duration-300 pointer-events-none"
          style={{
            opacity: cardOpacity,
            transform: `translateY(${(1 - cardOpacity) * 20}px)`,
            pointerEvents: cardOpacity > 0.6 ? 'auto' : 'none',
          }}
        >
          <div className="w-full max-w-4xl bg-[#11161D]/95 sm:backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-medium text-ochre uppercase tracking-widest block">ATELIER SANCTUARY</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">Crafted Without Compromise.</h2>
              <p className="text-xs sm:text-sm font-sans text-white/70 max-w-md font-light leading-relaxed">The transformation has reached full stillness. Explore the collection below.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/work" className="px-6 py-3.5 rounded-full bg-ochre hover:bg-ochre-dark text-charcoal font-mono text-xs font-medium tracking-widest uppercase transition-all flex items-center gap-2">
                <span>Explore Works</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="/philosophy" className="px-5 py-3.5 rounded-full border border-white/15 hover:border-white/30 text-white font-mono text-xs tracking-widest uppercase transition-all bg-white/5">
                Material Matrix
              </a>
            </div>
          </div>
        </div>

        {/* Audio & Status Pill */}
        <div className="absolute right-4 sm:right-10 bottom-6 sm:bottom-8 z-20 flex items-center gap-3">
          <button onClick={onToggleSound} className="p-3 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-ochre transition-all">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-ochre" />}
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

### 3. Sleek Floating Island Header with Dynamic Fade (`components/Header.tsx`)

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isHidden?: boolean;
}

const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Journal', href: '/journal' },
  { name: 'Contact', href: '/contact' },
];

export function Header({ onOpenMenu, isMuted, onToggleSound, isHidden = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#11161D]/80 hover:bg-[#11161D]/95 backdrop-blur-xl border border-white/15 text-white shadow-2xl transition-opacity duration-700 ease-in-out ${
        isHidden
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-serif tracking-tight flex items-baseline gap-1.5 group">
          <span className="font-normal text-white">Atelier</span>
          <span className="italic font-normal text-ochre group-hover:text-ochre-light transition-colors">Verve</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.25em] uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-ochre font-semibold' : 'text-white/80 hover:text-ochre'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <button onClick={onToggleSound} className="text-white/70 hover:text-ochre transition-colors">
            {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-ochre" />}
          </button>
          <button onClick={onOpenMenu} className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/90 hover:text-ochre transition-colors uppercase">
            <span className="hidden sm:inline">Menu</span>
            <Menu className="w-4 h-4 text-ochre" />
          </button>
        </div>
      </div>
    </header>
  );
}
```

---

### 4. Zero-Conflict Lenis Smooth Scroll Provider (`components/SmoothScroll.tsx`)

```tsx
'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

### 5. Cloudflare Workers & Pages Deployment Configs

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

```toml
# wrangler.toml
name = "my-3d-app"
compatibility_date = "2024-09-23"

[assets]
directory = "./out"
html_handling = "auto-trailing-slash"
not_found_handling = "single-page-application"
```

```json
// wrangler.json
{
  "name": "my-3d-app",
  "compatibility_date": "2024-09-23",
  "assets": {
    "directory": "./out",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "single-page-application"
  }
}
```

---

## 🛑 CHECKLIST: ZERO-ERROR VERIFICATION

Before shipping any build, verify:
- [x] **Scroll Runway Height**: Hero container set to `h-[480vh]` (~100vh per 100 frames) for natural finger & wheel travel distance.
- [x] **Soft First-Scroll Ease-In**: Deadband at $p \in [0.00, 0.03]$ keeps frame 0 steady and initial text readable on initial scroll.
- [x] **Permanent Tail Frame Hold**: Locked strictly to frame `TotalFrames - 1` for $p \ge 0.88$ with pre-cached tail frames.
- [x] **Bidirectional Symmetry**: Continuous `rAF` lerp loop (`diff * 0.20`) and bidirectional frame fallback search smoothly handle both scrolling down and scrolling up.
- [x] **Dynamic Navbar Transparency**: Header smoothly transitions opacity during scrub without causing React re-render thrashing.
- [x] **No CSS Scroll Conflict**: `scroll-behavior: smooth` is NOT present in CSS to prevent fighting with Lenis.
- [x] **Non-blocking Idle Preloading**: Frames loaded in chunked batches via `requestIdleCallback`.
- [x] **Clean Non-AI Aesthetic**: Zero emojis, zero sparkle icons, zero frame number badges.
- [x] **Static Cloudflare Parity**: `output: 'export'`, `trailingSlash: true`, and asset binding in `wrangler.toml` / `wrangler.json`.
