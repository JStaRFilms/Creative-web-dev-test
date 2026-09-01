"use client";

import React, { useState } from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { AlertTriangle, Flame, RefreshCw, ShieldAlert, ShieldCheck, Zap } from "lucide-react";

interface Scene4CrucibleProps {
  onTriggerGlitch: () => void;
  isGlitching: boolean;
}

export const Scene4Crucible: React.FC<Scene4CrucibleProps> = ({
  onTriggerGlitch,
  isGlitching,
}) => {
  const [stressEventCount, setStressEventCount] = useState(0);

  const handleSimulateSurge = () => {
    sound.playCrucibleDistortion();
    setStressEventCount((prev) => prev + 1);
    onTriggerGlitch();

    setTimeout(() => {
      sound.playResolutionChord();
    }, 2400);
  };

  return (
    <section
      id="beat-4-crucible"
      className={`relative min-h-[140vh] w-full flex flex-col items-center justify-center py-24 px-4 md:px-8 text-[#111214] font-mono-tech select-none transition-colors duration-500 ${
        isGlitching ? "bg-[#FF5A1F]/5" : ""
      }`}
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] uppercase tracking-widest mb-6">
        <Flame size={14} />
        <span>Chapter 04 — The Crucible</span>
      </div>

      {/* Main Dramatic Thesis */}
      <div className="max-w-4xl text-center space-y-4 mb-16">
        <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold font-editorial tracking-tight text-[#111214] ${
          isGlitching ? "glitch-active text-[#FF5A1F]" : ""
        }`}>
          Schools don’t operate in perfect conditions.
        </h2>
        <p className="text-xl sm:text-3xl font-editorial italic text-[#6B7075]">
          Neither should the software running them.
        </p>
      </div>

      {/* Interactive Stress Test Simulation Apparatus */}
      <div className="w-full max-w-4xl p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#D8D3C8] shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D8D3C8]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111214]">
            <ShieldAlert size={16} className={isGlitching ? "text-[#FF5A1F] animate-spin" : "text-[#142E28]"} />
            <span>High-Concurrency Stress Simulator</span>
          </div>

          <div className="text-[11px] text-[#6B7075]">
            Surge Iteration: <strong className="text-[#111214]">#{stressEventCount}</strong>
          </div>
        </div>

        {/* Live Operational Conflict Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className={`p-4 rounded-xl border transition-all ${
            isGlitching ? "bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#FF5A1F] glitch-active" : "bg-[#EFEBE1] border-[#D8D3C8] text-[#111214]"
          }`}>
            <div className="font-bold uppercase text-[10px] tracking-wider mb-1">Financial State</div>
            <div className="text-sm font-bold">1,240 Tuition Webhooks</div>
            <div className="text-[10px] text-[#6B7075] mt-1">
              {isGlitching ? "Concurrent Ledger Locks" : "Zero-Loss Idempotent Queue"}
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isGlitching ? "bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#FF5A1F] glitch-active" : "bg-[#EFEBE1] border-[#D8D3C8] text-[#111214]"
          }`}>
            <div className="font-bold uppercase text-[10px] tracking-wider mb-1">Academic Broadsheet</div>
            <div className="text-sm font-bold">48 Subject Marksheets</div>
            <div className="text-[10px] text-[#6B7075] mt-1">
              {isGlitching ? "Conflicting Grade Audits" : "Atomic Compilation Verified"}
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isGlitching ? "bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#FF5A1F] glitch-active" : "bg-[#EFEBE1] border-[#D8D3C8] text-[#111214]"
          }`}>
            <div className="font-bold uppercase text-[10px] tracking-wider mb-1">Parent Portal</div>
            <div className="text-sm font-bold">3,800 Live Sessions</div>
            <div className="text-[10px] text-[#6B7075] mt-1">
              {isGlitching ? "Traffic Spike (Results Day)" : "Sub-second Cache Synchrony"}
            </div>
          </div>
        </div>

        {/* Dynamic Crucible Trigger Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6B7075]">
            {isGlitching ? (
              <span className="flex items-center gap-1.5 text-[#FF5A1F] font-bold">
                <AlertTriangle size={14} />
                <span>Simulating high-concurrency surge & network instability...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[#142E28] font-bold">
                <ShieldCheck size={14} />
                <span>System Resilient. Ready to stress test under pressure.</span>
              </span>
            )}
          </div>

          <button
            onClick={handleSimulateSurge}
            disabled={isGlitching}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ${
              isGlitching
                ? "bg-[#FF5A1F] text-white cursor-wait"
                : "bg-[#111214] text-[#FAF8F5] hover:bg-[#FF5A1F]"
            }`}
          >
            <Zap size={14} className={isGlitching ? "animate-pulse" : ""} />
            <span>{isGlitching ? "Reconciling State..." : "Trigger Operational Surge"}</span>
          </button>
        </div>
      </div>

      {/* Transitional Relational Bridge */}
      <div className="max-w-2xl text-center mt-16 space-y-2">
        <div className="text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          The Climax
        </div>
        <p className="text-base sm:text-xl font-editorial font-bold text-[#111214]">
          After fragmentation, hidden pipelines, convergence, and the crucible:
        </p>
        <p className="text-xs text-[#6B7075]">
          Scroll to witness the entire fragmented world collapse into one coherent interface.
        </p>
      </div>
    </section>
  );
};
