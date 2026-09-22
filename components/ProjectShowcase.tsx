'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  image: string;
  isCircular?: boolean;
  aspect?: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 'cinder-house',
    number: 'PROJECT 001',
    title: 'The Cinder House',
    category: 'RESIDENTIAL',
    location: 'PRIVATE RESIDENCE / KYOTO',
    image: '/images/cinder-house.jpg',
    aspect: 'aspect-[16/10]',
    description: 'A monolithic timber and charred cedar sanctuary centered around quiet courtyards and filtered northern daylight.',
  },
  {
    id: 'fragment-9',
    number: 'PROJECT 002',
    title: 'Fragment No. 9',
    category: 'DETAIL STUDY',
    location: 'CALACATTA VIOLA / MONOLITHIC HEARTH',
    image: '/images/marble-fireplace.jpg',
    isCircular: true,
    aspect: 'aspect-square',
    description: 'Curved marble hearth carved from a single block of Italian Calacatta Viola with indirect cove illumination.',
  },
  {
    id: 'villa-ethereal',
    number: 'PROJECT 003',
    title: 'Villa Ethereal',
    category: 'RESIDENTIAL',
    location: 'COASTAL RESIDENCE / AMALFI',
    image: '/images/villa-ethereal.jpg',
    aspect: 'aspect-[4/3]',
    description: 'Tiered lime-washed volumes responding to Mediterranean sea winds and dramatic limestone cliff topology.',
  },
  {
    id: 'limestone-sanctuary',
    number: 'PROJECT 004',
    title: 'Limestone Sanctuary',
    category: 'CULTURAL',
    location: 'GALLERY PAVILION / PARIS',
    image: '/images/limestone-detail.jpg',
    aspect: 'aspect-[16/10]',
    description: 'Honed French limestone surfaces capturing diffused zenith daylight through rhythmic structural fins.',
  },
];

const categories = ['ALL', 'RESIDENTIAL', 'CULTURAL', 'DETAIL STUDY'];

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative w-full bg-cream-100 py-24 sm:py-36 px-6 sm:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-black/10">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] text-ochre uppercase font-medium">
              SELECTED WORKS
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-light text-charcoal tracking-tight">
              Quiet Architecture & Spaces
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white shadow-md'
                    : 'bg-sand/60 text-charcoal/70 hover:bg-sand hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid Matching Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Featured Project 001 */}
          <div className="lg:col-span-7 space-y-12">
            {filteredProjects.slice(0, 1).map((p) => (
              <div key={p.id} className="group space-y-6">
                <div className="flex items-center justify-between text-xs font-mono tracking-[0.25em] text-charcoal/50 uppercase pb-3 border-b border-black/10">
                  <span>{p.number}</span>
                  <div className="w-12 h-px bg-black/10" />
                  <span>{p.category}</span>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-sand/30 shadow-lg">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl sm:text-4xl font-serif italic text-charcoal group-hover:text-ochre transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-charcoal/40 group-hover:text-ochre group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="font-mono text-xs tracking-widest text-charcoal/60 uppercase">
                    {p.location}
                  </p>
                  <p className="text-sm font-sans text-charcoal/70 max-w-xl pt-2 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}

            {filteredProjects.slice(2, 3).map((p) => (
              <div key={p.id} className="group space-y-6 pt-10">
                <div className="flex items-center justify-between text-xs font-mono tracking-[0.25em] text-charcoal/50 uppercase pb-3 border-b border-black/10">
                  <span>{p.number}</span>
                  <div className="w-12 h-px bg-black/10" />
                  <span>{p.category}</span>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-sand/30 shadow-lg">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-3xl sm:text-4xl font-serif italic text-charcoal group-hover:text-ochre transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-charcoal/60 uppercase">
                    {p.location}
                  </p>
                  <p className="text-sm font-sans text-charcoal/70 max-w-xl font-light">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Circular Detail Cutouts */}
          <div className="lg:col-span-5 space-y-16 lg:pt-16">
            
            {filteredProjects.slice(1, 2).map((p) => (
              <div key={p.id} className="group space-y-6 flex flex-col items-start">
                <div className="w-full flex items-center justify-between text-xs font-mono tracking-[0.25em] text-charcoal/50 uppercase pb-3 border-b border-black/10">
                  <span>{p.number}</span>
                  <div className="w-12 h-px bg-black/10" />
                  <span>{p.category}</span>
                </div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white bg-sand/30 my-4 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-left w-full pt-2">
                  <h3 className="text-3xl sm:text-4xl font-serif italic text-charcoal group-hover:text-ochre transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-charcoal/60 uppercase">
                    {p.location}
                  </p>
                  <p className="text-sm font-sans text-charcoal/70 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}

            {filteredProjects.slice(3, 4).map((p) => (
              <div key={p.id} className="group space-y-6 pt-6">
                <div className="flex items-center justify-between text-xs font-mono tracking-[0.25em] text-charcoal/50 uppercase pb-3 border-b border-black/10">
                  <span>{p.number}</span>
                  <div className="w-12 h-px bg-black/10" />
                  <span>{p.category}</span>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-sand/30 shadow-md">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-charcoal group-hover:text-ochre transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs tracking-widest text-charcoal/60 uppercase">
                    {p.location}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
