import React from "react";
import { HeroProof } from "@/components/hero/HeroProof";
import { SelectedWorkProof } from "@/components/work/SelectedWorkProof";
import { MeloOpeningProof } from "@/components/melo/MeloOpeningProof";
import { PaperTexture } from "@/components/proof/PaperTexture";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F1EBDD] text-[#171714] overflow-x-hidden paper-grain proof-grid">
      {/* Subtle Paper Noise Grain Overlay */}
      <PaperTexture />

      {/* Milestone 01 Sections */}
      <main className="relative z-10 flex flex-col gap-10 md:gap-18 pb-16">
        {/* 01: Hero Arrival (Canonical Raw Proof matching 01_HERO_CANONICAL_RAW_PROOF.png) */}
        <HeroProof />

        {/* 02: Selected Work (Typographic Proof Index 01–05 matching 02_HERO_SCROLL_STATES.png) */}
        <SelectedWorkProof />

        {/* 03: Project 01 — Melo Opening (Builder Mode Propagation matching 03_MELO_BUILDER_PROPAGATION.png) */}
        <MeloOpeningProof />
      </main>

      {/* Global Document Footer */}
      <footer className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-8 md:px-16 py-8 border-t border-dashed border-[#171714]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5E594F] gap-4 select-none">
        <div>
          <span>JOHN OLULEKE-OKE • PORTFOLIO SOURCE OF TRUTH v0.2</span>
        </div>
        <div className="flex items-center gap-6">
          <span>MILESTONE 01 / THE PROOF</span>
          <span className="text-[#D95B3F] font-semibold">ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}
