"use client";

import React from "react";
import { RelationalMesh3D } from "@/components/canvas/RelationalMesh3D";
import { sound } from "@/components/audio/SynthesizerEngine";
import { ArrowRight, Compass, Layers, ShieldCheck, Sparkles } from "lucide-react";

interface Scene6HorizonProps {
  onOpenDemoModal: () => void;
  onOpenExploreModal: () => void;
}

const NETWORK_RELATIONS = [
  { pair: "STUDENT ↔ ACADEMIC BROADSHEET", desc: "Continuous assessment & WAEC terminal scoring" },
  { pair: "STUDENT ↔ PAYSTACK LEDGER", desc: "Idempotent payment reconciliation & clearance" },
  { pair: "STUDENT ↔ PARENT GUARDIAN", desc: "Instant SMS/Email progress & receipt notifications" },
  { pair: "STUDENT ↔ FACULTY & HOD", desc: "Curriculum scheme verification & attendance metrics" },
  { pair: "STUDENT ↔ INSTITUTION", desc: "Single source of truth from admission to graduation" },
];

export const Scene6Horizon: React.FC<Scene6HorizonProps> = ({
  onOpenDemoModal,
  onOpenExploreModal,
}) => {
  return (
    <section
      id="beat-6-horizon"
      className="relative min-h-[150vh] w-full flex flex-col items-center justify-center py-24 px-4 md:px-8 text-[#111214] font-mono-tech select-none overflow-hidden"
    >
      {/* 3D Relational Mesh Canvas in background */}
      <RelationalMesh3D scrollProgress={0.95} activeBeat={6} />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        {/* Chapter Marker */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          <Compass size={14} />
          <span>Chapter 06 — The Horizon</span>
        </div>

        {/* Closing Core Realization */}
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-[#6B7075] font-bold">
            The Relational Architecture
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-editorial text-[#111214] leading-tight">
            When everything knows where it belongs, the school can finally move forward.
          </h2>
          <p className="text-sm sm:text-base text-[#6B7075] font-editorial max-w-xl mx-auto leading-relaxed">
            The true value is not merely storing records. The value is understanding and automating the live relationships between them.
          </p>
        </div>

        {/* Active Relational Matrix Nodes */}
        <div className="w-full max-w-2xl grid grid-cols-1 gap-2.5 text-left text-xs">
          {NETWORK_RELATIONS.map((rel, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHoverBlip(520 + idx * 40)}
              className="p-4 rounded-xl bg-[#FAF8F5]/90 backdrop-blur-md border border-[#D8D3C8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-all duration-300 hover:scale-[1.02] hover:border-[#FF5A1F]"
            >
              <span className="font-bold text-[#111214]">{rel.pair}</span>
              <span className="text-[11px] text-[#6B7075]">{rel.desc}</span>
            </div>
          ))}
        </div>

        {/* Final Driving Question */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#EFEBE1]/90 backdrop-blur-md border-2 border-[#111214] max-w-3xl w-full shadow-xl space-y-6">
          <h3 className="text-2xl sm:text-4xl font-bold font-editorial text-[#111214] leading-snug">
            WHAT COULD YOUR SCHOOL DO IF IT STOPPED MANAGING INFORMATION — AND STARTED USING IT?
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                sound.playChime(640);
                onOpenDemoModal();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#111214] text-[#FAF8F5] font-semibold text-xs hover:bg-[#FF5A1F] transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <span>Schedule Institutional Walkthrough</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => {
                sound.playHoverBlip(750);
                onOpenExploreModal();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#FAF8F5] text-[#111214] border border-[#D8D3C8] font-semibold text-xs hover:bg-[#EFEBE1] transition-all duration-200"
            >
              <span>View System Blueprint</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
