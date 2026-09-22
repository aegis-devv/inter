'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Volume2, VolumeX } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

const navItems = [
  { name: 'Home', index: '01', href: '/' },
  { name: 'Work', index: '02', href: '/work' },
  { name: 'Philosophy', index: '03', href: '/philosophy' },
  { name: 'Journal', index: '04', href: '/journal' },
  { name: 'Contact', index: '05', href: '/contact' },
];

export function NavigationDrawer({ isOpen, onClose, isMuted, onToggleSound }: NavigationDrawerProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#11161D] text-white px-6 sm:px-16 py-8 transition-opacity duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/" onClick={onClose} className="text-xl sm:text-2xl font-serif tracking-tight flex items-baseline gap-1.5">
          <span className="font-normal text-white">Atelier</span>
          <span className="italic font-normal text-ochre">Verve</span>
        </Link>

        <div className="flex items-center gap-6">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-ochre transition-colors"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4 text-ochre animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-transform hover:rotate-90 duration-200"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Navigation List */}
      <div className="w-full max-w-5xl mx-auto my-auto py-8 flex flex-col">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.name} className="w-full">
              <Link
                href={item.href}
                onClick={onClose}
                className={`group flex items-baseline justify-between py-5 sm:py-7 border-b border-white/10 transition-all duration-300 ${
                  isActive ? 'text-ochre' : 'text-white/90 hover:text-white hover:translate-x-2'
                }`}
              >
                <span className={`text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight transition-colors ${
                  isActive ? 'text-ochre' : 'text-white/90 group-hover:text-ochre'
                }`}>
                  {item.name}
                </span>
                <span className={`font-mono text-xs sm:text-sm font-light tracking-widest ${
                  isActive ? 'text-ochre' : 'text-white/40 group-hover:text-ochre'
                }`}>
                  {item.index}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Drawer Footer */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono tracking-widest text-white/40 pt-6 border-t border-white/5 gap-4">
        <span>KYOTO / PARIS / MILAN</span>
        <span>© 2026 ATELIER VERVE ARCHITECTURAL STUDIO</span>
      </div>
    </div>
  );
}
