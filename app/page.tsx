'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { NavigationDrawer } from '../components/NavigationDrawer';
import { HeroFullscreenScrub } from '../components/HeroFullscreenScrub';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { MaterialMatrix } from '../components/MaterialMatrix';
import { PhilosophyManifesto } from '../components/PhilosophyManifesto';
import { Footer } from '../components/Footer';
import { soundManager } from '../lib/audio';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((muted) => {
      setIsMuted(muted);
    });

    const handleFirstGesture = () => {
      soundManager.init();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      unsub();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleToggleSound = () => {
    soundManager.toggleMute();
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] selection:bg-ochre selection:text-white">
      {/* Floating Island Header (Fades during transition, reappears on hold & rest) */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        isHidden={isHeaderHidden}
      />

      {/* Full-Screen Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Full-Bleed 3D 60fps Canvas Scrubbing Hero */}
      <HeroFullscreenScrub
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onTransitionStateChange={(isTransitioning) => setIsHeaderHidden(isTransitioning)}
      />

      {/* Curated Showcase */}
      <ProjectShowcase />

      {/* Interactive Material Matrix */}
      <MaterialMatrix />

      {/* Atelier Philosophy & Manifesto */}
      <PhilosophyManifesto />

      {/* Footer */}
      <Footer />
    </main>
  );
}
