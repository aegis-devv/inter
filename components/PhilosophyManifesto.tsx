'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PhilosophyManifesto() {
  return (
    <section id="journal" className="relative w-full bg-cream-100 py-24 sm:py-36 px-6 sm:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto space-y-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <span className="font-mono text-xs tracking-[0.25em] text-ochre uppercase font-medium">
              ATELIER MANIFESTO
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-light text-charcoal tracking-tight leading-[1.05]">
              Architecture is the art of <span className="italic text-ochre font-normal">holding quiet</span>.
            </h2>
            <p className="text-base font-sans text-charcoal/70 leading-relaxed font-light">
              We design with the belief that physical environments condition the inner life. When light is carved with restraint and materials are chosen for their patina rather than perfection, a space becomes enduring.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-charcoal text-white hover:bg-ochre transition-all text-xs font-mono tracking-widest uppercase group"
              >
                <span>Read Monograph</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-sand/30 aspect-[3/4]">
                <img
                  src="/images/staircase.jpg"
                  alt="Sculptural Form"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-white rounded-xl border border-black/5">
                <span className="font-mono text-[11px] text-charcoal/40 tracking-widest uppercase block">01 / GEOMETRY</span>
                <p className="font-serif text-lg text-charcoal italic pt-1">The Curve of Ascent</p>
              </div>
            </div>

            <div className="space-y-6 pt-12">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-sand/30 aspect-[3/4]">
                <img
                  src="/images/marble-fireplace.jpg"
                  alt="Materiality"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-white rounded-xl border border-black/5">
                <span className="font-mono text-[11px] text-charcoal/40 tracking-widest uppercase block">02 / MINERAL</span>
                <p className="font-serif text-lg text-charcoal italic pt-1">Calacatta Viola Grain</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
