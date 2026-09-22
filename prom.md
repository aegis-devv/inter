# 🚀 MASTER 3D SCROLL-JACKING CANVAS BLUEPRINT
### Autonomous Single-Prompt Framework for Next.js, GSAP & Web Audio Applications

> **Purpose**: A universal, production-grade technical specification and single-prompt engine. Use this blueprint to transform any video (`.mp4`) into an ultra-smooth, 60fps frame-interpolated canvas-scrubbed web experience with zero stutter, full responsive mobile support, ambient Web Audio synthesis, and dynamic content sections.

---

## 📋 QUICK-START: THE AI MASTER PROMPT (COPY-PASTE)

*Copy the prompt below into any AI agent / coding assistant along with your video file:*

```markdown
You are an elite creative technologist building a production-grade, 3D frame-scrubbed interactive web application using Next.js (App Router), TypeScript, Tailwind CSS, GSAP ScrollTrigger, and the Web Audio API.

### 1. SPECIFICATIONS & INPUT VARIABLES
- **Input Video**: `[INPUT_VIDEO_FILENAME.mp4]` in the project root.
- **Brand / Project Name**: `[INSERT_BRAND_NAME]`
- **Color Palette**: `[INSERT_PRIMARY_COLOR, ACCENT_COLOR, BACKGROUND_COLOR, TEXT_COLOR]` (or adapt from video)
- **Typography**: `[INSERT_DISPLAY_FONT, BODY_FONT, MONO_FONT]`
- **Target Currency / Locale**: `[INSERT_CURRENCY_SYMBOL e.g. ₹ / $ / €]`
- **Custom Content Sections**:
  1. Hero Section (3D Video Lens Scrub + Floating Action Deck)
  2. [SECTION_1_NAME: e.g. Curated Collection / Feature Showcase]
  3. [SECTION_2_NAME: e.g. Interactive Configurator / Diagnostic Matrix]
  4. [SECTION_3_NAME: e.g. Atelier Manifesto / Technical Specs]
  5. [SECTION_4_NAME: e.g. Reviews / Interactive Drawer / Footer]

---

### 2. EXECUTION WORKFLOW & HARD TECHNICAL RULES

#### PHASE 1: FRAME EXTRACTION (Run Outside App First)
1. Generate dual-tier synchronized WebP frame sequences using FFmpeg:
   - **Desktop Tier (`public/sequence/desktop/`)**: Motion-compensated interpolation at 60fps, 1280x720, WebP `q:80` (`frame_%04d.webp`).
   - **Mobile Tier (`public/sequence/mobile/`)**: 1:3 subsampled frames scaled to 640x360, WebP `q:75` (`frame_%04d.webp`), ensuring the last frame matches desktop's final frame exactly.
   - **Manifest (`public/sequence/manifest.json`)**: JSON recording frame counts, dimensions, and path prefixes.
2. Script must clean previous frames and process mobile tier in parallel worker pools for speed.

#### PHASE 2: CANVAS BLITTER & INSTANT MOUNT (Zero Black Screen)
1. **Never use `<video>` seek**. Blit raw frames directly to an HTML5 `<canvas>` via `ctx.drawImage` using manual `cover` aspect-ratio math.
2. **Synchronous Mount**: Calculate viewport dimensions and DPR immediately on mount. Cap DPR at `Math.min(window.devicePixelRatio || 1, 2)`.
3. **Instant First Paint**: Load `frame_0001.webp` first; paint to canvas inside `img.onload` immediately.
4. **No Blocking Loader**: Stream remaining frames progressively in background ascending order. If the user scrolls faster than network buffering, clamp to the nearest loaded frame without stutter.

#### PHASE 3: GSAP SCROLLTRIGGER & PINNED HOLD RUNWAY
1. **Scroll Runway**: Container `height: 450vh`. Inner viewport `position: sticky; top: 0; height: 100vh; overflow: hidden`.
2. **Lerp Scrubbing**: `scrub: 0.7` on desktop; `1.0` on mobile.
3. **Runway Partition Formula**:
   - `0.00 → 0.65`: Scrubs through frame indices `0 → (total - 1)`.
   - `0.65`: Triggers the surprise beat (canvas star/diamond particle burst + Web Audio chime).
   - `0.65 → 1.00`: **PINNED HOLD RUNWAY** — the final frame remains crisp and locked in place while the floating hero action deck is fully interactive before smoothly unpinning into the page.

#### PHASE 4: UI/UX COMPOSITION (Non-AI, Bespoke Aesthetics)
1. **No Obstructive Center Blur**: Do NOT place heavy frosted blur cards directly over the focal subject. Place headline and CTAs in a sleek **bottom floating deck** (`bottom-6 sm:bottom-10`) so the video subject remains 100% sharp.
2. **Header / Navigation**: Sticky header with brand wordmark, section indices (`01`, `02`, `03`), sound toggle, cart/bag indicator, and a full-screen mobile slide-out drawer.
3. **Interactive Sections**:
   - Connected product / feature grid with live filtering, badges, and instant cart updates.
   - Bespoke multi-parameter diagnostic matrix / interactive configurator that dynamically calculates tailored results.
   - Slide-out drawer for cart / details with live subtotal and progress bars.
4. **Zero Generic AI Boilerplate**: No generic 3-column card placeholders, no emoji icons. Use clean SVG vector icons (Lucide) and sharp Swiss/monospaced metadata tags.

#### PHASE 5: WEB AUDIO SYNTHESIZER
1. Implement a Web Audio API controller:
   - Low-frequency ambient drone whose Biquad lowpass filter cutoff dynamically tracks scroll velocity.
   - Multi-oscillator harmonic chime with exponential decay triggered at the 65% reveal point.
2. Comply with browser autoplay: initialize/resume `AudioContext` only on first user gesture.
```

---

## 🛠️ TECHNICAL REFERENCE ARCHITECTURE

### 1. Dual-Tier Frame Extraction Engine (`scripts/extract_frames.js`)

```javascript
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
const inputVideo = path.join(__dirname, '..', 'input.mp4');
const desktopDir = path.join(__dirname, '..', 'public', 'sequence', 'desktop');
const mobileDir = path.join(__dirname, '..', 'public', 'sequence', 'mobile');
const manifestPath = path.join(__dirname, '..', 'public', 'sequence', 'manifest.json');

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
  console.log('--- Cleaning previous sequences ---');
  for (const dir of [desktopDir, mobileDir]) {
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.webp')) fs.unlinkSync(path.join(dir, f));
    }
  }

  console.log('--- Step 1: Desktop 60fps Motion-Interpolated Tier (1280x720) ---');
  await runCommand(ffmpegPath, [
    '-y',
    '-i', inputVideo,
    '-filter:v', "minterpolate='mi_mode=blend:fps=60',scale=1280:720",
    '-vcodec', 'libwebp',
    '-q:v', '80',
    path.join(desktopDir, 'frame_%04d.webp')
  ]);

  const desktopFrames = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${desktopFrames.length} Desktop frames.`);

  console.log('--- Step 2: Mobile Subsampled Tier (640x360) ---');
  const selectedDesktopIndices = [];
  for (let i = 0; i < desktopFrames.length; i += 3) {
    selectedDesktopIndices.push(i);
  }
  // Guarantee 1:1 final frame parity
  if (selectedDesktopIndices[selectedDesktopIndices.length - 1] !== desktopFrames.length - 1) {
    selectedDesktopIndices.push(desktopFrames.length - 1);
  }

  // Parallel pool for fast downscaling
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
        '-vf', 'scale=640:360',
        '-vcodec', 'libwebp',
        '-q:v', '75',
        dstFile
      ], true);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const mobileFrames = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp')).sort();
  console.log(`✓ Generated ${mobileFrames.length} Mobile frames.`);

  // Write Manifest
  const manifest = {
    desktop: {
      count: desktopFrames.length,
      width: 1280,
      height: 720,
      prefix: '/sequence/desktop/frame_',
      suffix: '.webp'
    },
    mobile: {
      count: mobileFrames.length,
      width: 640,
      height: 360,
      prefix: '/sequence/mobile/frame_',
      suffix: '.webp'
    }
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('✓ Manifest written to public/sequence/manifest.json');
}

main().catch(console.error);
```

---

### 2. Canvas Blitter & Hold Runway Engine (`components/ScrollReveal.tsx`)

```tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { soundManager } from '../lib/audio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollReveal({ brandConfig }: { brandConfig?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameIdxRef = useRef<number>(0);
  const isSurpriseActiveRef = useRef<boolean>(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  const [surpriseTriggered, setSurpriseTriggered] = useState(false);
  const [tierInfo, setTierInfo] = useState({ tier: 'desktop', totalFrames: 356 });

  // 1. Clamped nearest-frame selector
  const getBestAvailableImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    const clamped = Math.max(0, Math.min(targetIdx, frames.length - 1));

    if (frames[clamped]) return frames[clamped];
    for (let i = clamped - 1; i >= 0; i--) if (frames[i]) return frames[i];
    for (let i = clamped + 1; i < frames.length; i++) if (frames[i]) return frames[i];
    return null;
  }, []);

  // 2. Cover-fit blit math (Preserves aspect ratio across any viewport)
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    renderCanvas(currentFrameIdxRef.current);
  }, [renderCanvas]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768 || ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4);
    const tier = isMobile ? 'mobile' : 'desktop';
    const total = isMobile ? 120 : 356;
    const prefix = isMobile ? '/sequence/mobile/frame_' : '/sequence/desktop/frame_';
    const scrubFactor = isMobile ? 1.0 : 0.7;

    setTierInfo({ tier, totalFrames: total });
    const frames: (HTMLImageElement | null)[] = new Array(total).fill(null);
    framesRef.current = frames;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Immediate Frame 1 mount blit
    const firstImg = new Image();
    firstImg.src = `${prefix}0001.webp`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      renderCanvas(0);
    };

    // Progressive background streaming
    for (let i = 1; i < total; i++) {
      const img = new Image();
      img.src = `${prefix}${String(i + 1).padStart(4, '0')}.webp`;
      img.onload = () => {
        frames[i] = img;
        if (Math.abs(currentFrameIdxRef.current - i) <= 1) {
          renderCanvas(currentFrameIdxRef.current);
        }
      };
    }

    // GSAP ScrollTrigger with 65% scrub / 35% hold runway
    const gsapCtx = gsap.context(() => {
      const frameTracker = { frame: 0 };

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
          // Partition: 0 to 65% scrubs frames; 65% to 100% holds final frame
          const scrubProgress = Math.min(1, progress / 0.65);
          const targetFrame = Math.floor(scrubProgress * (total - 1));
          currentFrameIdxRef.current = targetFrame;
          renderCanvas(targetFrame);

          if (progress >= 0.65 && !isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = true;
            setSurpriseTriggered(true);
            soundManager.playSurpriseChime();
          } else if (progress < 0.58 && isSurpriseActiveRef.current) {
            isSurpriseActiveRef.current = false;
            setSurpriseTriggered(false);
          }
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [renderCanvas, resizeCanvas]);

  return (
    <section ref={containerRef} className="relative w-full h-[450vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full object-cover block" />

        {/* Floating Bottom Hero Deck (Unobscured subject) */}
        <div className={`absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 px-4 sm:px-6 flex justify-center transition-all duration-600 ${
          surpriseTriggered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          <div className="w-full max-w-4xl bg-white/95 dark:bg-black/90 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">✦ PROVEN QUALITY</span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase">Crafted Without Compromise.</h1>
            </div>
            <div className="flex items-center gap-3">
              <a href="#explore" className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase transition-all">
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### 3. Web Audio Velocity Drone & Harmonic Chime (`lib/audio.ts`)

```typescript
class AudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  public subscribe(cb: (muted: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isMuted);
    return () => this.listeners.delete(cb);
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
      this.setupDrone();
    } catch (_) {}
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    this.isMuted = !this.isMuted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime, 0.2);
    }
    this.listeners.forEach(cb => cb(this.isMuted));
    return this.isMuted;
  }

  private setupDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, now);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(140, now);

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(73.42, now); // D2

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.0, now); // A2

    osc1.connect(this.droneFilter);
    osc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
  }

  public updateVelocity(velocity: number) {
    if (!this.ctx || !this.droneFilter || this.isMuted) return;
    const targetFreq = Math.min(140 + Math.abs(velocity) * 15, 650);
    this.droneFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
  }

  public playSurpriseChime() {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    const chords = [587.33, 880.00, 1174.66, 1760.00];

    chords.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.frequency.setValueAtTime(freq, now + i * 0.035);
      filter.frequency.setValueAtTime(3500, now + i * 0.035);
      filter.frequency.exponentialRampToValueAtTime(300, now + i * 0.035 + 1.8);

      const noteStart = now + i * 0.035;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.1 / (i + 1), noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 2.4);
    });
  }
}

export const soundManager = new AudioController();
```

---

## 🛑 CHECKLIST: ZERO-ERROR VERIFICATION

Before shipping any build, verify:
- [x] **No `<video>` seeking lag**: All scrubbing rendered on `<canvas>`.
- [x] **No blank initial screen**: Frame 1 paints immediately on mount.
- [x] **No blocking loader**: Preload is progressive and streaming.
- [x] **No premature unpinning**: Pinned Hold Runway active between 65% and 100% scroll.
- [x] **No blocked audio errors**: Audio context lazily initialized on user gesture.
- [x] **No retina fill-rate lag**: `Math.min(devicePixelRatio, 2)` DPR cap applied.
- [x] **No obscured subject**: Floating bottom hero deck keeps focal point sharp and clear.
