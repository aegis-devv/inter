'use client';

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
    return () => {
      this.listeners.delete(cb);
    };
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
      this.setupDrone();
    } catch (e) {
      console.warn('AudioContext initialization prevented:', e);
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime, 0.2);
    }
    this.listeners.forEach((cb) => cb(this.isMuted));
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
    osc1.frequency.setValueAtTime(73.42, now); // D2 note

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.0, now); // A2 note

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
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    const chords = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6

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
      gain.gain.exponentialRampToValueAtTime(0.08 / (i + 1), noteStart + 0.02);
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
