"use client";

import React, { useState } from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { Volume2, VolumeX, Layers, ChevronRight } from "lucide-react";

interface NavigationProps {
  scrollProgress: number;
  activeBeat: number;
  onNavigateBeat: (beat: number) => void;
  onOpenDemo: () => void;
}

const BEATS = [
  { id: 1, label: "01 Fracture" },
  { id: 2, label: "02 The Machine" },
  { id: 3, label: "03 Convergence" },
  { id: 4, label: "04 Crucible" },
  { id: 5, label: "05 The Reveal" },
  { id: 6, label: "06 Horizon" },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeBeat,
  onNavigateBeat,
  onOpenDemo,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playChime(640);
    }
  };

  const handleBeatClick = (beatId: number) => {
    sound.playHoverBlip(540);
    onNavigateBeat(beatId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3.5 bg-[#F6F3EC]/85 backdrop-blur-md border-b border-[#D8D3C8]/70 text-[#111214] font-mono-tech text-xs tracking-wider transition-all duration-300">
      {/* Brand & Emblem */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleBeatClick(1)}
          className="flex items-center gap-2 font-bold tracking-tight text-sm text-[#111214] hover:opacity-80 transition-opacity"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
          <span>MELO</span>
        </button>
        <span className="hidden sm:inline-block text-[#6B7075]/60">/</span>
        <span className="hidden sm:inline-block text-[11px] text-[#6B7075] uppercase">
          Institutional Operating Architecture
        </span>
      </div>

      {/* Narrative Beat Relays */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#EFEBE1]/80 px-2 py-1 rounded-full border border-[#D8D3C8]">
        {BEATS.map((beat) => {
          const isActive = activeBeat === beat.id;
          return (
            <button
              key={beat.id}
              onClick={() => handleBeatClick(beat.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all duration-200 ${
                isActive
                  ? "bg-[#111214] text-[#F6F3EC] font-semibold shadow-sm"
                  : "text-[#6B7075] hover:text-[#111214] hover:bg-[#E8E2D5]"
              }`}
            >
              {beat.label}
            </button>
          );
        })}
      </nav>

      {/* Actions & Sound Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleSound}
          className="p-1.5 rounded-md hover:bg-[#E8E2D5] text-[#6B7075] hover:text-[#111214] transition-colors"
          title={isMuted ? "Unmute Procedural Audio" : "Mute Procedural Audio"}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <button
          onClick={() => {
            sound.playHoverBlip(800);
            onOpenDemo();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#111214] text-[#F6F3EC] text-xs font-semibold hover:bg-[#FF5A1F] transition-all duration-200 shadow-sm"
        >
          <span>Book Walkthrough</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </header>
  );
};
