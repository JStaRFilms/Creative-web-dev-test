"use client";

import React from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { Layers, MoveDown, Sparkles } from "lucide-react";

const PILLARS = [
  { name: "STUDENTS", role: "Biographical, Attendance & Unified ID Records", color: "text-[#FF5A1F] border-[#FF5A1F]/30" },
  { name: "ACADEMICS", role: "Continuous Assessment, WAEC Schemes & Broadsheets", color: "text-[#111214] border-[#111214]/30" },
  { name: "FINANCE", role: "Paystack Fee Reconciler, Debt Clearance & Receipts", color: "text-[#142E28] border-[#142E28]/30" },
  { name: "COMMUNICATION", role: "Multi-Channel SMS, Email & Guardian Feeds", color: "text-[#C86432] border-[#C86432]/30" },
  { name: "ADMINISTRATION", role: "Staff Workload, Timetabling & Institutional Audits", color: "text-[#767A80] border-[#767A80]/30" },
];

export const Scene3Gathering: React.FC = () => {
  return (
    <section
      id="beat-3-convergence"
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-center py-24 px-4 md:px-8 text-[#111214] font-mono-tech select-none"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] uppercase tracking-widest mb-6">
        <Layers size={14} />
        <span>Chapter 03 — The Convergence</span>
      </div>

      {/* Monumental Headline */}
      <div className="max-w-4xl text-center space-y-4 mb-16">
        <div className="text-xs uppercase tracking-widest text-[#6B7075] font-bold">
          From Isolated Fragments to Gravitational Unity
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial tracking-tight text-[#111214]">
          Five Pillars.
        </h2>
        <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial italic text-[#FF5A1F]">
          One Center.
        </h3>
      </div>

      {/* Converging Pillar Cascade */}
      <div className="w-full max-w-4xl space-y-3 my-8">
        {PILLARS.map((pillar, idx) => (
          <div
            key={pillar.name}
            onMouseEnter={() => sound.playHoverBlip(440 + idx * 80)}
            className={`p-5 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-sm border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg ${pillar.color}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6B7075] font-bold">0{idx + 1}</span>
              <span className="text-xl sm:text-2xl font-bold font-editorial tracking-wide">
                {pillar.name}
              </span>
            </div>
            <span className="text-xs text-[#6B7075] sm:text-right">
              {pillar.role}
            </span>
          </div>
        ))}
      </div>

      {/* Gravitational Climax Typography */}
      <div className="mt-16 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#142E28] font-bold uppercase tracking-wider bg-[#142E28]/10 px-3 py-1 rounded-full mb-3">
          <Sparkles size={12} />
          <span>Synchronous Convergence</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-bold font-editorial text-[#111214]">
          WHAT WOULD HAPPEN IF A SCHOOL FINALLY BEHAVED LIKE ONE SYSTEM?
        </h3>
      </div>
    </section>
  );
};
