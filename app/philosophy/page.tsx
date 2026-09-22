'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { NavigationDrawer } from '../../components/NavigationDrawer';
import { MaterialMatrix } from '../../components/MaterialMatrix';
import { PhilosophyManifesto } from '../../components/PhilosophyManifesto';
import { Footer } from '../../components/Footer';
import { soundManager } from '../../lib/audio';

export default function PhilosophyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const unsub = soundManager.subscribe((muted) => {
      setIsMuted(muted);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#12161F] selection:bg-ochre selection:text-white pt-24">
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        isMuted={isMuted}
        onToggleSound={() => soundManager.toggleMute()}
      />

      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isMuted={isMuted}
        onToggleSound={() => soundManager.toggleMute()}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-ochre" />
          <span className="font-mono text-xs tracking-[0.3em] text-ochre uppercase font-medium">
            ATELIER ETHOS
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight text-charcoal">
          Design Philosophy & Material Resonance
        </h1>
        <p className="max-w-xl text-base font-sans text-charcoal/70 font-light leading-relaxed">
          We believe architecture should not shout; it should hold silence. Explore our material diagnostics and solar trajectory matrix.
        </p>
      </div>

      <PhilosophyManifesto />
      <MaterialMatrix />
      <Footer />
    </main>
  );
}
