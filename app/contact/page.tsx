'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { NavigationDrawer } from '../../components/NavigationDrawer';
import { Footer } from '../../components/Footer';
import { soundManager } from '../../lib/audio';
import { ArrowUpRight, Send } from 'lucide-react';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((muted) => {
      setIsMuted(muted);
    });
    return () => unsub();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            STUDIO COMMISSIONS
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight text-charcoal">
          Initiate a Dialogue
        </h1>
        <p className="max-w-xl text-base font-sans text-charcoal/70 font-light leading-relaxed">
          We accept a limited number of architectural and interior commissions annually to ensure focused craftsmanship.
        </p>
      </div>

      {/* Contact Form & Studio Locations */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-black/10 shadow-lg space-y-8">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <span className="font-mono text-xs text-ochre uppercase tracking-widest block">
                  COMMISSION RECEIVED
                </span>
                <h2 className="font-serif text-3xl text-charcoal">
                  Thank you for reaching out.
                </h2>
                <p className="text-sm font-sans text-charcoal/70 max-w-md mx-auto font-light leading-relaxed">
                  Our principal architectural director will review your project brief and respond within two studio working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-charcoal/60 uppercase tracking-widest block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kenzo Shimizu"
                      className="w-full p-4 rounded-xl bg-cream-50 border border-black/10 font-sans text-sm text-charcoal focus:outline-none focus:border-ochre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-charcoal/60 uppercase tracking-widest block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kenzo@domain.com"
                      className="w-full p-4 rounded-xl bg-cream-50 border border-black/10 font-sans text-sm text-charcoal focus:outline-none focus:border-ochre"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-charcoal/60 uppercase tracking-widest block">
                      Project Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kyoto / Paris / New York"
                      className="w-full p-4 rounded-xl bg-cream-50 border border-black/10 font-sans text-sm text-charcoal focus:outline-none focus:border-ochre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-charcoal/60 uppercase tracking-widest block">
                      Typology
                    </label>
                    <select className="w-full p-4 rounded-xl bg-cream-50 border border-black/10 font-sans text-sm text-charcoal focus:outline-none focus:border-ochre">
                      <option>Private Residence</option>
                      <option>Cultural Pavilion</option>
                      <option>Hospitality Sanctuary</option>
                      <option>Material Detail Commission</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-charcoal/60 uppercase tracking-widest block">
                    Spatial Vision & Timeline
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Briefly describe your site, light orientation, and architectural aspirations..."
                    className="w-full p-4 rounded-xl bg-cream-50 border border-black/10 font-sans text-sm text-charcoal focus:outline-none focus:border-ochre resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-charcoal hover:bg-ochre text-white font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Studio Coordinates */}
          <div className="lg:col-span-5 space-y-10">
            <div className="p-8 rounded-3xl bg-[#11161D] text-white space-y-8 shadow-xl">
              <div className="space-y-2">
                <span className="font-mono text-xs text-ochre uppercase tracking-widest">
                  GLOBAL BUREAUS
                </span>
                <h3 className="font-serif text-3xl font-light">Direct Correspondence</h3>
              </div>

              <div className="space-y-6 text-xs font-mono tracking-widest">
                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="text-white/40 block">KYOTO ATELIER</span>
                  <p className="text-white font-sans text-sm">Higashiyama-ku, 605-0862 Kyoto, Japan</p>
                  <p className="text-ochre font-mono text-xs">+81 (0)75 533 8920</p>
                </div>

                <div className="space-y-1 pb-4 border-b border-white/10">
                  <span className="text-white/40 block">PARIS BUREAU</span>
                  <p className="text-white font-sans text-sm">Rue de Turenne, 3e Arr., 75003 Paris, France</p>
                  <p className="text-ochre font-mono text-xs">+33 1 42 68 55 00</p>
                </div>

                <div className="space-y-1">
                  <span className="text-white/40 block">ELECTRONIC DESK</span>
                  <p className="text-white font-sans text-sm">inquire@atelierverve.design</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
