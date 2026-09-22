'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isHidden?: boolean;
}

const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Journal', href: '/journal' },
  { name: 'Contact', href: '/contact' },
];

export function Header({ onOpenMenu, isMuted, onToggleSound, isHidden = false }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#11161D]/80 hover:bg-[#11161D]/95 backdrop-blur-xl border border-white/15 text-white shadow-2xl transition-opacity duration-700 ease-in-out ${
        isHidden
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-serif tracking-tight flex items-baseline gap-1.5 group">
          <span className="font-normal text-white">Atelier</span>
          <span className="italic font-normal text-ochre group-hover:text-ochre-light transition-colors">Verve</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.25em] uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-ochre font-semibold' : 'text-white/80 hover:text-ochre'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Sound + Menu) */}
        <div className="flex items-center gap-5">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-ochre transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-ochre animate-pulse" />}
            <span className="hidden lg:inline text-[11px]">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>

          <button
            onClick={onOpenMenu}
            className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-white hover:text-ochre transition-colors group"
            aria-label="Open Navigation Menu"
          >
            <span className="font-medium text-[11px] sm:text-xs">MENU</span>
            <Menu className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
