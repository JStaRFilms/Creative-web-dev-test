"use client";

import React from "react";

interface TelemetryHUDProps {
  scrollProgress: number;
  activeBeat: number;
  isGlitching: boolean;
}

const BEAT_METRICS: Record<
  number,
  { label: string; coherence: string; state: string; color: string }
> = {
  1: {
    label: "01. FRACTURE",
    coherence: "14.2%",
    state: "DISCONNECTED SILOES",
    color: "#FF5A1F",
  },
  2: {
    label: "02. PIPELINES",
    coherence: "38.6%",
    state: "UNCOUPLED CONDUITS",
    color: "#142E28",
  },
  3: {
    label: "03. CONVERGENCE",
    coherence: "71.0%",
    state: "GRAVITATIONAL FLUX",
    color: "#FF5A1F",
  },
  4: {
    label: "04. CRUCIBLE",
    coherence: "44.1%",
    state: "STRESS TEST SURGE",
    color: "#FF5A1F",
  },
  5: {
    label: "05. MELO OS",
    coherence: "99.8%",
    state: "SYNCHRONOUS COHERENCE",
    color: "#142E28",
  },
  6: {
    label: "06. HORIZON",
    coherence: "100.0%",
    state: "RELATIONAL NETWORK",
    color: "#111214",
  },
};

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  scrollProgress,
  activeBeat,
  isGlitching,
}) => {
  const metric = BEAT_METRICS[activeBeat] || BEAT_METRICS[1];
  const displayProgress = Math.round(scrollProgress * 100);

  return (
    <aside aria-label="System Telemetry" className="fixed bottom-4 left-4 md:left-8 z-40 hidden sm:flex items-center gap-4 bg-[#EFEBE1]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#D8D3C8] font-mono-tech text-[10px] text-[#6B7075] shadow-sm pointer-events-none">
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full inline-block animate-pulse"
          style={{
            backgroundColor: isGlitching ? "#FF5A1F" : metric.color,
          }}
        />
        <span className="font-bold text-[#111214]">{metric.label}</span>
      </div>

      <div className="h-3 w-px bg-[#D8D3C8]" />

      <div>
        <span className="text-[#6B7075]/70">STATE: </span>
        <span
          className={`font-semibold ${
            isGlitching ? "text-[#FF5A1F] animate-pulse" : "text-[#111214]"
          }`}
        >
          {isGlitching ? "SYSTEM DISTORTION" : metric.state}
        </span>
      </div>

      <div className="h-3 w-px bg-[#D8D3C8]" />

      <div>
        <span className="text-[#6B7075]/70">COHERENCE: </span>
        <span className="font-semibold text-[#111214]">
          {isGlitching ? "18.4%" : metric.coherence}
        </span>
      </div>

      <div className="h-3 w-px bg-[#D8D3C8]" />

      <div>
        <span className="text-[#6B7075]/70">PLAYHEAD: </span>
        <span className="font-semibold text-[#111214]">{displayProgress}%</span>
      </div>
    </aside>
  );
};
