'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { NavigationDrawer } from '../../components/NavigationDrawer';
import { PhilosophyManifesto } from '../../components/PhilosophyManifesto';
import { Footer } from '../../components/Footer';
import { soundManager } from '../../lib/audio';
import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    id: '01',
    date: 'SEPTEMBER 2026',
    category: 'ESSAY',
    title: 'The Weight of Quiet: Honing Monolithic Stone in Kyoto',
    readTime: '6 MIN READ',
    image: '/images/limestone-detail.jpg',
    excerpt: 'On the enduring tactile dialogue between Navona Travertine and Japanese charred cedar, and how natural patina captures the passage of time.',
  },
  {
    id: '02',
    date: 'AUGUST 2026',
    category: 'SPATIAL STUDY',
    title: 'Carving the Colonnade: Daylight as Structural Material',
    readTime: '8 MIN READ',
    image: '/images/staircase.jpg',
    excerpt: 'How rhythmic vertical fins modulate harsh afternoon solar glare into diffused ambient illumination.',
  },
  {
    id: '03',
    date: 'JULY 2026',
    category: 'MONOGRAPH',
    title: 'Fragments of Viola: The Sculpture of the Living Hearth',
    readTime: '5 MIN READ',
    image: '/images/marble-fireplace.jpg',
    excerpt: 'A behind-the-scenes look at quarrying and shaping monolithic Calacatta Viola marble in the Apuan Alps.',
  },
];

export default function JournalPage() {
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
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-ochre" />
          <span className="font-mono text-xs tracking-[0.3em] text-ochre uppercase font-medium">
            ATELIER JOURNAL
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight text-charcoal">
          Essays, Studies & Monograph Notes
        </h1>
        <p className="max-w-xl text-base font-sans text-charcoal/70 font-light leading-relaxed">
          Critical reflections on materiality, light, silence, and spatial stillness.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((art) => (
            <article key={art.id} className="group space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono tracking-widest text-charcoal/50 uppercase pb-2 border-b border-black/10">
                  <span>{art.category}</span>
                  <span>{art.date}</span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand/30 shadow-md">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal group-hover:text-ochre transition-colors leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-sm font-sans text-charcoal/70 font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-mono tracking-widest text-ochre uppercase font-medium">
                <span>{art.readTime}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
