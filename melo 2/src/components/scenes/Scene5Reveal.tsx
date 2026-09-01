"use client";

import React from "react";
import { MeloOSInterface } from "@/components/product/MeloOSInterface";
import { Sparkles, ShieldCheck } from "lucide-react";

export const Scene5Reveal: React.FC = () => {
  return (
    <section
      id="beat-5-reveal"
      className="relative min-h-[160vh] w-full flex flex-col items-center justify-start pt-28 pb-20 px-4 md:px-8 text-[#111214] font-mono-tech select-none"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#142E28] uppercase tracking-widest mb-6">
        <Sparkles size={14} className="text-[#FF5A1F]" />
        <span>Chapter 05 — The Reveal</span>
      </div>

      {/* Monumental Climax Headline */}
      <div className="max-w-4xl text-center space-y-4 mb-12">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial tracking-tight text-[#111214]">
          ONE SCHOOL. ONE SYSTEM.
        </h2>
        <p className="text-sm sm:text-lg text-[#6B7075] max-w-2xl mx-auto font-editorial leading-relaxed">
          Melo brings the academic, financial, administrative, and communication life of a school into one connected platform.
        </p>
      </div>

      {/* The Core Live Interactive Melo OS Interface Sandbox */}
      <div className="w-full flex justify-center mb-16">
        <MeloOSInterface />
      </div>

      {/* Relational Affirmation */}
      <div className="max-w-2xl text-center space-y-3 p-6 rounded-xl bg-[#EFEBE1]/80 border border-[#D8D3C8]">
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#142E28] font-bold uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Synchronous Operational Mastery</span>
        </div>
        <p className="text-xs sm:text-sm text-[#111214] leading-relaxed">
          When an assessment is marked, the broadsheet compiles, the grade calculates, the parent is notified, and examination clearance is confirmed — all within the same immutable ledger.
        </p>
      </div>
    </section>
  );
};
