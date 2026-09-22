'use client';

import React, { useState } from 'react';
import { Sun, Layers, ChevronDown } from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  origin: string;
  tactility: string;
  reflectance: string;
  color: string;
  image: string;
}

const materials: MaterialOption[] = [
  {
    id: 'travertine',
    name: 'Navona Travertine',
    origin: 'Tivoli, Italy',
    tactility: 'Open-pore unfilled hone',
    reflectance: '42% Diffused Zenith',
    color: '#DFD5C6',
    image: '/images/limestone-detail.jpg',
  },
  {
    id: 'oak',
    name: 'Fumed River Oak',
    origin: 'Black Forest, Germany',
    tactility: 'Deep wire-brushed grain',
    reflectance: '18% Warm Absorption',
    color: '#4A3B32',
    image: '/images/cinder-house.jpg',
  },
  {
    id: 'calacatta',
    name: 'Calacatta Viola',
    origin: 'Apuan Alps, Italy',
    tactility: 'Silk satin matte polish',
    reflectance: '64% Crystalline Luster',
    color: '#E8DED8',
    image: '/images/marble-fireplace.jpg',
  },
  {
    id: 'limewash',
    name: 'Mineral Roman Plaster',
    origin: 'Provence, France',
    tactility: 'Breathable lime trowel',
    reflectance: '78% High Ambient Glow',
    color: '#F4EFE6',
    image: '/images/staircase.jpg',
  },
];

const lightingPhases = [
  { id: 'dawn', name: '07:30 DAWN MIST', kelvin: '3200K', bg: 'from-amber-100/30 to-rose-50/20' },
  { id: 'noon', name: '12:00 ZENITH EQUINOX', kelvin: '5500K', bg: 'from-sky-50/40 to-cream-100' },
  { id: 'dusk', name: '18:45 GOLDEN HOUR', kelvin: '2700K', bg: 'from-orange-100/40 to-ochre/10' },
  { id: 'night', name: '21:30 NOCTURNE BLUE', kelvin: '2200K', bg: 'from-slate-900/10 to-charcoal/5' },
];

export function MaterialMatrix() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(materials[0]);
  const [selectedLighting, setSelectedLighting] = useState(lightingPhases[2]);

  return (
    <section id="matrix" className="relative w-full bg-cream-50 py-20 sm:py-32 px-6 sm:px-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-black/10">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] text-ochre uppercase font-medium">
              TACTILE SPECIFICATION MATRIX
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-light text-charcoal tracking-tight">
              Daylight & Material Resonance
            </h2>
          </div>
          <p className="max-w-md text-sm font-sans text-charcoal/70 font-light leading-relaxed">
            Every surface reacts dynamically to celestial trajectory and thermal inertia. Select parameters to simulate our living atelier palettes.
          </p>
        </div>

        {/* Matrix Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            
            {/* 1. Material Selector (Dropdown on Mobile, Grid on Desktop) */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-charcoal uppercase">
                <Layers className="w-3.5 h-3.5 text-ochre" />
                <span>Primary Mineral / Timber Substrate</span>
              </label>

              {/* Mobile Dropdown */}
              <div className="block sm:hidden relative">
                <select
                  value={selectedMaterial.id}
                  onChange={(e) => {
                    const found = materials.find((m) => m.id === e.target.value);
                    if (found) setSelectedMaterial(found);
                  }}
                  className="w-full appearance-none p-4 pr-10 rounded-xl bg-white border border-black/15 font-serif text-lg text-charcoal shadow-sm focus:outline-none focus:border-ochre"
                >
                  {materials.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name} — {mat.origin}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden sm:grid grid-cols-2 gap-3">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between ${
                      selectedMaterial.id === mat.id
                        ? 'border-ochre bg-white shadow-md'
                        : 'border-black/10 bg-cream-100/60 hover:bg-white hover:border-black/20'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-lg text-charcoal font-medium">{mat.name}</div>
                      <div className="font-mono text-[11px] text-charcoal/50 tracking-wider uppercase">{mat.origin}</div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: mat.color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Celestial Daylight Simulation */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-charcoal uppercase">
                <Sun className="w-3.5 h-3.5 text-ochre" />
                <span>Solar Trajectory & Color Temp</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {lightingPhases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedLighting(phase)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      selectedLighting.id === phase.id
                        ? 'border-ochre bg-charcoal text-white shadow-sm'
                        : 'border-black/10 bg-cream-100/80 text-charcoal hover:bg-sand'
                    }`}
                  >
                    <div className="font-mono text-[10px] tracking-wider uppercase">{phase.name}</div>
                    <div className="font-mono text-xs text-ochre font-bold pt-1">{phase.kelvin}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Spec Telemetry */}
            <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-mono tracking-widest text-charcoal/50 uppercase pb-3 border-b border-black/5">
                <span>ACTIVE SPECIFICATION</span>
                <span className="text-ochre">VERIFIED SPEC</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-charcoal/50 block">TACTILITY</span>
                  <span className="text-charcoal font-medium">{selectedMaterial.tactility}</span>
                </div>
                <div>
                  <span className="text-charcoal/50 block">LUMEN REFLECTANCE</span>
                  <span className="text-charcoal font-medium">{selectedMaterial.reflectance}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Preview Viewport */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border border-black/10 flex items-center justify-center min-h-[380px] sm:min-h-[420px] bg-sand/30">
            <img
              src={selectedMaterial.image}
              alt={selectedMaterial.name}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />
            {/* Dynamic Solar Shader */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${selectedLighting.bg} mix-blend-overlay transition-all duration-700 pointer-events-none`}
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Inset floating diagnostic chip */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-ochre tracking-widest uppercase block">
                  {selectedLighting.name}
                </span>
                <h4 className="font-serif text-lg sm:text-2xl text-charcoal italic">
                  {selectedMaterial.name}
                </h4>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-charcoal text-white font-mono text-xs uppercase tracking-widest">
                <span>Simulated</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
