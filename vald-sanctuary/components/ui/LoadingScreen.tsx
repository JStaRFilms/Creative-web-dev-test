'use client';

import React from 'react';
import { Trees } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  onEnter: () => void;
  isReady: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  onEnter,
  isReady,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-16 bg-[#080C0A] text-[#E5ECE4] transition-opacity duration-1000 select-none ${
        isReady ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Meta */}
      <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5ECE4]/40">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
          <span>VALD SANCTUARY</span>
        </div>
        <span>INITIALIZING HYPER-VISUAL BUFFER</span>
      </div>

      {/* Center Cinematic Telemetry */}
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex p-3 rounded-full border border-white/10 bg-white/[0.02]">
          <Trees className="w-6 h-6 text-[#52796F] animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extralight tracking-[-0.03em] leading-tight text-[#E5ECE4]">
          Ancient Boreal Wilderness
        </h2>
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#E5ECE4]/50">
          Caching 600 Photorealistic Frames & Audio Vein
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto space-y-2">
          <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-[#D97736] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-[#E5ECE4]/40">
            <span>SYNCHRONIZING</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex justify-between items-end text-[9px] font-mono tracking-[0.25em] text-[#E5ECE4]/30">
        <span>ZERO ACOUSTIC INTRUSION</span>
        <span>LAT 50.1163° N / LON 122.9574° W</span>
      </div>
    </div>
  );
};
