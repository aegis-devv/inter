'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#12161F] px-6 text-center">
      <h1 className="text-8xl font-serif mb-4">404</h1>
      <p className="text-lg font-sans text-charcoal/70 mb-8 font-light">
        The requested space could not be found.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full bg-[#C5A880] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#A4865E] transition-all"
      >
        Return to Atelier
      </Link>
    </div>
  );
}
