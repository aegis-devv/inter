'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#11161D] text-white pt-24 pb-16 px-6 sm:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top Inquiry Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-end">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-xs tracking-[0.25em] text-ochre uppercase font-medium">
              COMMISSION A SPACE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-white/90">
              Let us compose your next <span className="italic text-ochre">horizon</span>.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <a
              href="mailto:inquire@atelierverve.design"
              className="px-8 py-5 rounded-full bg-ochre hover:bg-ochre-dark text-charcoal font-mono text-xs uppercase tracking-widest font-bold text-center transition-all flex items-center justify-center gap-2"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="px-8 py-5 rounded-full border border-white/20 hover:border-ochre hover:text-ochre text-white font-mono text-xs uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2"
            >
              <span>Back to Zenith</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs font-mono tracking-widest">
          <div className="space-y-3">
            <span className="text-white/40 uppercase block">01 / KYOTO ATELIER</span>
            <p className="text-white/80 font-sans text-sm">Higashiyama-ku, 605-0862<br />Kyoto, Japan</p>
          </div>
          <div className="space-y-3">
            <span className="text-white/40 uppercase block">02 / PARIS BUREAU</span>
            <p className="text-white/80 font-sans text-sm">Rue de Turenne, 3e Arr.<br />75003 Paris, France</p>
          </div>
          <div className="space-y-3">
            <span className="text-white/40 uppercase block">03 / MILAN STUDIO</span>
            <p className="text-white/80 font-sans text-sm">Via Solferino, Brera<br />20121 Milano, Italy</p>
          </div>
          <div className="space-y-3">
            <span className="text-white/40 uppercase block">04 / INQUIRIES</span>
            <p className="text-white/80 font-sans text-sm">inquire@atelierverve.design<br />+81 (0)75 533 8920</p>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono tracking-widest text-white/40 gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-white">Atelier</span>
            <span className="font-serif italic text-ochre">Verve</span>
            <span className="text-[10px] pl-2">© 2026 ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
