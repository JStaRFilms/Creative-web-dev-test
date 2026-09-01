'use client';

import React, { useState } from 'react';
import { SANCTUARY_DIMENSIONS } from '@/lib/shots-data';
import { X, ArrowRight, Check } from 'lucide-react';

interface MinimalNavProps {
  progress: number;
  activeShotIndex: number;
}

export const MinimalNav: React.FC<MinimalNavProps> = ({ progress, activeShotIndex }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reserved, setReserved] = useState(false);

  const scrollToShot = (index: number) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = (index / SANCTUARY_DIMENSIONS.length) * maxScroll;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Left: Ultra-discreet brand watermark */}
      <nav className="fixed top-8 left-8 z-40 pointer-events-auto">
        <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-mono text-[#E5ECE4]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
          <span className="font-light tracking-[0.35em]">VALD</span>
          <span className="text-[#E5ECE4]/30">/</span>
          <span className="text-[10px] tracking-[0.25em] text-[#E5ECE4]/40">SANCTUARY</span>
        </div>
      </nav>

      {/* Right Side: Ultra-minimal Dimension Timeline Tracker */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-5 pointer-events-auto">
        {SANCTUARY_DIMENSIONS.map((shot, idx) => {
          const isActive = idx === activeShotIndex;
          return (
            <button
              key={shot.id}
              onClick={() => scrollToShot(idx)}
              className="group relative flex items-center justify-center cursor-pointer p-1 focus:outline-none"
              title={shot.dimensionTitle}
            >
              <div
                className={`transition-all duration-500 ${
                  isActive
                    ? 'w-1 h-8 bg-[#D97736]'
                    : 'w-1 h-2 bg-white/20 group-hover:bg-white/50'
                }`}
              />
              <span className="absolute right-6 px-3 py-1 bg-[#080C0A]/90 text-[10px] font-mono tracking-[0.2em] text-[#E5ECE4] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border-l border-[#D97736] backdrop-blur-md">
                {shot.number} // {shot.dimensionTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Center: Ultra-refined Architectural Residency Trigger */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative px-8 py-3 group cursor-pointer overflow-hidden border border-white/15 bg-black/40 backdrop-blur-md text-[#E5ECE4] transition-all duration-500 hover:border-[#D97736]/70"
        >
          {/* Subtle amber gradient fill on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#D97736]/20 via-[#D97736]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

          <div className="relative flex items-center gap-4 text-[11px] font-mono tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97736] group-hover:scale-150 transition-transform" />
            <span className="font-light">Request Sanctuary Residency</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D97736] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Bespoke Architectural Admission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-xl bg-[#080C0A] border border-white/15 p-10 md:p-12 shadow-2xl">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setReserved(false);
              }}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-[10px] font-mono text-[#D97736] tracking-[0.3em] uppercase">
                DISPATCH // PRIVATE ADMISSION DOSSIER
              </div>

              <h2 className="text-3xl font-extralight text-[#E5ECE4] tracking-tight leading-snug">
                Where the Noise of the World Falls Away
              </h2>

              <p className="text-xs text-[#E5ECE4]/60 leading-relaxed font-light">
                Vald limits occupancy to twelve individuals across five suspended structures per lunar cycle. There are no roads, no overhead cables, and no ambient light spill. Admission requires confidential coordinate registration.
              </p>

              {reserved ? (
                <div className="py-10 text-center space-y-3 border-l-2 border-[#52796F] bg-white/[0.02] p-6">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#52796F]/20 text-[#52796F] mb-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-mono tracking-[0.2em] text-[#E5ECE4] uppercase">
                    COORDINATES LOGGED
                  </p>
                  <p className="text-xs text-[#E5ECE4]/50 font-light">
                    The sanctuary warden will transmit arrival vectors prior to dusk.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReserved(true);
                  }}
                  className="space-y-5 pt-2"
                >
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-[#E5ECE4]/50 mb-2">
                      Guest Identification
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lindqvist"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-sm text-[#E5ECE4] placeholder:text-white/20 focus:outline-none focus:border-[#D97736] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-[#E5ECE4]/50 mb-2">
                      Encrypted Destination (Email)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@sanctuary.int"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-sm text-[#E5ECE4] placeholder:text-white/20 focus:outline-none focus:border-[#D97736] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-[0.3em] text-[#E5ECE4]/50 mb-2">
                      Primary Dimension Preference
                    </label>
                    <select className="w-full px-4 py-3 bg-[#080C0A] border border-white/10 text-xs font-mono tracking-wider text-[#E5ECE4] focus:outline-none focus:border-[#D97736]">
                      <option>DIMENSION 01 // AERIAL CANOPY RETREAT</option>
                      <option>DIMENSION 02 // CANTILEVERED CARBON CABIN</option>
                      <option>DIMENSION 03 // GEOTHERMAL BASALT BATH</option>
                      <option>DIMENSION 04 // MYCELIUM UNDERSTORY OBSERVATORY</option>
                      <option>DIMENSION 05 // NOCTURNAL RIDGE OBSERVATORY</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D97736] hover:bg-[#c96929] text-[#080C0A] font-mono text-[10px] font-medium uppercase tracking-[0.3em] transition-all cursor-pointer mt-4"
                  >
                    TRANSMIT EXPEDITION DOSSIER
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
