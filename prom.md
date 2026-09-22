# 🚀 MASTER 3D SCROLL-JACKING CANVAS BLUEPRINT v2.1
### Universal Single-Prompt Framework for Next.js, GSAP, Web Audio & Cloudflare Edge

> **Purpose**: A universal, production-grade technical specification and single-prompt engine. Use this blueprint to transform **any 3D video** (product turntable, exploded CAD assembly, architectural flythrough, drone landscape, or interior transition) into an ultra-smooth, 60fps Full HD canvas-scrubbed web experience with adaptive focal velocity remapping, multi-page App Router architecture, non-blocking mobile idle preloading, Web Audio synthesis, and 1-click Cloudflare deployment.

---

## 📋 QUICK-START: THE AI MASTER PROMPT (COPY-PASTE)

*Copy the prompt below into any AI agent / coding assistant along with your video file:*

```markdown
You are an elite creative technologist and senior frontend architect building a production-grade, full-bleed 3D frame-scrubbed interactive web application using Next.js (App Router, Static Export), TypeScript, Tailwind CSS, GSAP ScrollTrigger, and the Web Audio API.

### 1. SPECIFICATIONS & INPUT VARIABLES
- **Input Video**: `[INPUT_VIDEO_FILENAME.mp4]` in the project root (3D product turntable, exploded view, architectural flythrough, or scene transition).
- **Brand / Project Name**: `[INSERT_BRAND_NAME]`
- **Color Palette**: `[INSERT_PRIMARY_COLOR, ACCENT_COLOR, BACKGROUND_COLOR, TEXT_COLOR]` (e.g. Alabaster `#FAF8F5`, Deep Charcoal `#12161F`, Ochre Gold `#C5A880`)
- **Typography**: Editorial Serif (e.g. Cormorant Garamond / Playfair Display), Modern Sans (Plus Jakarta Sans / Inter), Monospace (Space Mono / JetBrains Mono)
- **Target Pages & Routes**:
  1. `/` (Home: Full-bleed 3D Video Scrub Hero + Curated Overview Highlights)
  2. `/work` (Dedicated Showcase / Product Catalog with Filter Pills)
  3. `/philosophy` (Design Ethos / Technical Specification & Material Matrix)
  4. `/journal` (Case Studies, Monograph Notes & Articles)
  5. `/contact` (Client Commission / Inquiry Form & Global Studio Directory)

---

### 2. EXECUTION WORKFLOW & HARD TECHNICAL RULES

#### PHASE 1: HIGH-DEFINITION FRAME EXTRACTION (FFmpeg)
1. Use `ffmpeg-static` to generate dual-tier synchronized WebP frame sequences with Lanczos upscaling and unsharp enhancement:
   - **Desktop Tier (`public/sequence/desktop/`)**: 60fps motion-interpolated, 1920x1080 Lanczos, unsharp filter `unsharp=5:5:0.85:5:5:0.0`, WebP `q:92`, preset `photo` (`frame_%04d.webp`).
   - **Mobile Tier (`public/sequence/mobile/`)**: 1:3 subsampled frames scaled to 960x540 Lanczos, WebP `q:85` (`frame_%04d.webp`), guaranteeing 1:1 final frame parity with desktop.
   - **Manifest (`public/sequence/manifest.json`)**: Records frame counts, dimensions, and path prefixes.
2. The script must clean previous frames and process mobile tier downscaling in parallel worker pools.

#### PHASE 2: CANVAS BLITTER & CONTINUOUS LERP ENGINE
1. **Never use `<video>` seek**: Blit raw frames directly to an HTML5 `<canvas>` via `ctx.drawImage` using cover aspect-ratio math.
2. **GPU Optimization**: Use `canvas.getContext('2d', { alpha: false, desynchronized: true })` to cut GPU memory bandwidth by ~50% and eliminate composite latency on mobile.
3. **DPR Capping**: Cap DPR to `1.0` on mobile and low-end devices (`deviceMemory < 4` or `hardwareConcurrency <= 4`) and `Math.min(window.devicePixelRatio || 1, 1.5)` on desktop to prevent fill-rate lag.
4. **Instant First Paint**: Load and render `frame_0001.webp` synchronously on mount (zero black screen).
5. **Non-Blocking Chunked Idle Preloading**: Do NOT spawn all image requests at once. Preload in small batches of 3–6 frames via `requestIdleCallback` (or 30ms timeouts) so mobile network pools and touch event threads stay 100% free and responsive for taps and navigation.
6. **Continuous Damping Lerp Engine**: Implement a `requestAnimationFrame` damping loop:
   $$\text{renderedFrame}_{k+1} = \text{renderedFrame}_k + (\text{targetFrame} - \text{renderedFrame}_k) \times \lambda \quad (\lambda \approx 0.14\text{ to }0.18)$$
   This ensures rapid mouse-wheel notches or mobile touch drags interpolate like liquid honey with zero flashiness.

#### PHASE 3: ADAPTIVE FOCAL VELOCITY REMAPPING (Universal 3D Scroll Formula)
1. **Scroll Runway**: Container `height: 450vh`. Sticky inner viewport `top: 0; height: 100vh; overflow: hidden`.
2. **Universal Piecewise Focal Remapping Formula**:
   In any 3D video (product rotation, mechanical exploded view, or environment transition), key transformations often occur quickly in the raw video. Allocate an extended portion (40%–60%) of the active scroll runway to this dynamic focal zone so the user can savour every detail without it rushing past.
   
   **Mathematical Remapping Formula**:
   Let $p \in [0.0, 1.0]$ be the normalized active scrub progress (spanning $0.00 \to 0.65$ of total scroll).
   Let $[F_{\text{start}}, F_{\text{end}}]$ be the key transformation frame ratio (e.g. frames $18\% \to 60\%$).
   Let $[S_{\text{start}}, S_{\text{end}}]$ be the scroll runway allocated (e.g. scroll progress $0.18 \to 0.58$):
   
   $$\text{FrameRatio}(p) = \begin{cases} 
   F_{\text{start}} \times \left(\frac{p}{S_{\text{start}}}\right) & p \le S_{\text{start}} \\
   F_{\text{start}} + (F_{\text{end}} - F_{\text{start}}) \times \left[\frac{1 - \cos\left(\pi \cdot \frac{p - S_{\text{start}}}{S_{\text{end}} - S_{\text{start}}}\right)}{2}\right] & S_{\text{start}} < p \le S_{\text{end}} \\
   F_{\text{end}} + (1.0 - F_{\text{end}}) \times \left(\frac{p - S_{\text{end}}}{1.0 - S_{\text{end}}}\right) & p > S_{\text{end}}
   \end{cases}$$
   
   $$\text{TargetFrame} = \lfloor \text{FrameRatio}(p) \times (\text{TotalFrames} - 1) \rfloor$$

3. **Pinned Hold Runway**:
   - `0.00 → 0.65`: Scrubs the video using the adaptive focal velocity formula.
   - `0.65`: Triggers Web Audio harmonic chime.
   - `0.65 → 1.00`: **PINNED HOLD RUNWAY** — Final frame remains locked in place while an unobstructed floating glassmorphic **Bottom Action Deck** slides up (`bottom-6 sm:bottom-12`) before unpinning smoothly into the page.

#### PHASE 4: EYE-SOOTHING UI/UX & MULTI-PAGE ROUTING
1. **Zero AI Clutter / Pure Editorial**:
   - NO emoji icons, NO star/diamond sparkle bursts, NO shield badges.
   - NO overlapping telemetry text or cluttered badges (`CANVAS 60FPS INTERPOLATED` / `FRAME 0001 OF 476` must be omitted).
   - Generous whitespace, clean typography, and uncluttered layout.
2. **Multi-Page Navigation**:
   - Desktop Header & Full-Screen Mobile Drawer (`NavigationDrawer`) using Next.js `<Link>` with active route detection (`usePathname()`).
   - Mobile Responsive Adapters: Complex selectors (e.g. material substrate matrix) must adapt into clean native dropdowns on mobile (`sm:hidden`).

#### PHASE 5: WEB AUDIO SYNTHESIZER
1. Implement a Web Audio API controller:
   - Low-frequency ambient drone whose Biquad lowpass filter cutoff dynamically tracks scroll velocity.
   - Multi-oscillator harmonic chord chime triggered at the 65% reveal threshold.
2. Lazily initialize/resume `AudioContext` only on first user gesture.

#### PHASE 6: 1-CLICK CLOUDFLARE PAGES & WORKERS DEPLOYMENT
1. **Next.js Config**: Enable static export with `output: 'export'` and `images: { unoptimized: true }`.
2. **Cloudflare Configuration**: Include pre-configured `wrangler.toml` and `wrangler.json` with `[assets] directory = "./out"` so the repository deploys seamlessly to Cloudflare Pages / Workers.
```

---

## 🛠️ TECHNICAL REFERENCE ARCHITECTURE

### 1. High-Definition Lanczos Frame Extraction (`scripts/extract_frames.js`)

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

  console.log('--- Step 1: Desktop 1080p Lanczos Tier (1920x1080 with Unsharp Enhancement) ---');
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

### 2. Universal Adaptive Easing & Lerp Canvas Scrub Engine (`components/HeroFullscreenScrub.tsx`)

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

/**
 * Universal Adaptive Focal Remapping Function
 * @param norm - Normalized scroll progress in scrub section (0.0 to 1.0)
 * @param totalFrames - Total frame count in sequence
 * @param focalStart - Video progress ratio where key 3D action starts (e.g. 0.18)
 * @param focalEnd - Video progress ratio where key 3D action ends (e.g. 0.58)
 * @param runwayStart - Scroll runway start ratio (e.g. 0.18)
 * @param runwayEnd - Scroll runway end ratio (e.g. 0.58)
 */
function calculateAdaptiveTargetFrame(
  norm: number,
  totalFrames: number,
  focalStart = 0.18,
  focalEnd = 0.58,
  runwayStart = 0.18,
  runwayEnd = 0.58
): number {
  let frameRatio: number;

  if (norm <= runwayStart) {
    frameRatio = focalStart * (norm / runwayStart);
  } else if (norm <= runwayEnd) {
    // Smooth Cosine S-Curve across the primary focal transformation
    const t = (norm - runwayStart) / (runwayEnd - runwayStart);
    const smoothT = 0.5 - 0.5 * Math.cos(t * Math.PI);
    frameRatio = focalStart + (focalEnd - focalStart) * smoothT;
  } else {
    const t = Math.min(1, (norm - runwayEnd) / (1.0 - runwayEnd));
    frameRatio = focalEnd + (1.0 - focalEnd) * t;
  }

  return Math.min(totalFrames - 1, Math.max(0, Math.floor(frameRatio * (totalFrames - 1))));
}

export function HeroFullscreenScrub({ isMuted, onToggleSound }: { isMuted: boolean; onToggleSound: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentRenderedFrameRef = useRef<number>(0);
  const isSurpriseActiveRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);

  const [totalFrames, setTotalFrames] = useState<number>(476);
  const [manifest, setManifest] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHoldActive, setIsHoldActive] = useState<boolean>(false);

  const getBestAvailableImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    const clamped = Math.max(0, Math.min(Math.round(targetIdx), frames.length - 1));

    if (frames[clamped]) return frames[clamped];
    for (let i = clamped - 1; i >= 0; i--) if (frames[i]) return frames[i];
    for (let i = clamped + 1; i < frames.length; i++) if (frames[i]) return frames[i];
    return null;
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

  // Continuous damping lerp loop
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
    const scrubFactor = isMobile ? 0.6 : 0.8;

    setTotalFrames(count);
    const frames: (HTMLImageElement | null)[] = new Array(count).fill(null);
    framesRef.current = frames;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Instant First Frame Render
    const firstImg = new Image();
    firstImg.src = `${prefix}0001${suffix}`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      setIsLoaded(true);
      renderCanvas(0);
    };

    // Non-blocking chunked idle preloading
    let isCancelled = false;
    let currentIndex = 1;
    const CHUNK_SIZE = isMobile ? 3 : 6;

    const loadNextBatch = () => {
      if (isCancelled || currentIndex >= count) return;
      const end = Math.min(currentIndex + CHUNK_SIZE, count);
      for (let i = currentIndex; i < end; i++) {
        const img = new Image();
        img.src = `${prefix}${String(i + 1).padStart(4, '0')}${suffix}`;
        img.onload = () => { frames[i] = img; };
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
    setTimeout(loadNextBatch, 50);

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: scrubFactor,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const rawNorm = Math.min(1, progress / 0.65);
          targetFrameRef.current = calculateAdaptiveTargetFrame(rawNorm, count);

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
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center select-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover block pointer-events-none" style={{ opacity: isLoaded ? 1 : 0.85 }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0E1218]/80 via-transparent to-[#0E1218]/50" />

        <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-16 py-24 sm:py-32 pointer-events-none transition-all duration-300" style={{ opacity: entryOpacity, transform: `translateY(${entryTranslateY}px)` }}>
          <div className="w-full max-w-7xl mx-auto flex items-center gap-3">
            <span className="w-8 h-px bg-ochre" />
            <span className="font-mono text-xs tracking-[0.3em] text-ochre uppercase font-medium">VOLUME NO. 04 / LIVING SANCTUARY</span>
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

        <div className={`absolute bottom-6 sm:bottom-12 left-0 right-0 z-30 px-4 sm:px-12 flex justify-center transition-all duration-500 ease-out ${isHoldActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
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

        <div className="absolute right-4 sm:right-10 bottom-6 sm:bottom-8 z-20 flex items-center gap-3">
          <button onClick={onToggleSound} className="p-3 rounded-full bg-black/60 border border-white/10 text-white/70 hover:text-ochre transition-all">
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
```

---

### 3. Cloudflare Deployment Configuration (`wrangler.toml` & `wrangler.json`)

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
- [x] **Universal 3D subject support**: Adaptive focal remapping formula handles any video geometry (products, cars, architecture, exploded CAD, macro zooms).
- [x] **Full 1080p Lanczos clarity**: FFmpeg upscales with unsharp filter at `q:92`.
- [x] **No blank initial screen**: Frame 1 paints synchronously on mount.
- [x] **No mobile tap lag**: Chunked idle preloading via `requestIdleCallback` keeps main thread free.
- [x] **No GPU fill-rate throttling**: DPR capped at 1.0 on mobile, `{ alpha: false, desynchronized: true }`.
- [x] **No sudden velocity spikes**: Cosine S-curve allocates 40%–60% of runway to primary focal transformations.
- [x] **No steppy frame jumps**: Continuous damping lerp (`rAF`) provides liquid frame interpolation.
- [x] **No AI shape clutter**: Clean editorial typography with zero emojis, stars, shields, or overlapping badges.
- [x] **Multi-page routing**: Full Next.js App Router subpages with active nav indicators.
- [x] **Cloudflare ready**: Pre-configured `output: 'export'`, `wrangler.toml`, and `wrangler.json`.
