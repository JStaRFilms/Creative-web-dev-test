"use client";

import React, { useState } from "react";
import { SmoothScrollProvider, useScrollPlayhead } from "@/components/motion/SmoothScrollProvider";
import { UnifiedParticleEngine } from "@/components/canvas/UnifiedParticleEngine";
import { Navigation } from "@/components/ui/Navigation";
import { TelemetryHUD } from "@/components/ui/TelemetryHUD";
import { ModalContainer } from "@/components/ui/ModalContainer";
import { Scene1Fracture } from "@/components/scenes/Scene1Fracture";
import { Scene2Underneath } from "@/components/scenes/Scene2Underneath";
import { Scene3Gathering } from "@/components/scenes/Scene3Gathering";
import { Scene4Crucible } from "@/components/scenes/Scene4Crucible";
import { Scene5Reveal } from "@/components/scenes/Scene5Reveal";
import { Scene6Horizon } from "@/components/scenes/Scene6Horizon";

function MeloMainExperience() {
  const { scrollProgress, activeBeat, scrollToBeat } = useScrollPlayhead();
  const [isGlitching, setIsGlitching] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);

  const handleTriggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#F6F3EC] text-[#111214] overflow-x-hidden selection:bg-[#FF5A1F] selection:text-white">
      {/* Background Particle Physics Simulation Engine */}
      <UnifiedParticleEngine
        scrollProgress={scrollProgress}
        activeBeat={activeBeat}
        isGlitching={isGlitching}
        onGlitchTrigger={handleTriggerGlitch}
      />

      {/* Global Navigation HUD */}
      <Navigation
        scrollProgress={scrollProgress}
        activeBeat={activeBeat}
        onNavigateBeat={scrollToBeat}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Real-time Telemetry HUD */}
      <TelemetryHUD
        scrollProgress={scrollProgress}
        activeBeat={activeBeat}
        isGlitching={isGlitching}
      />

      {/* Modals */}
      <ModalContainer
        demoOpen={demoModalOpen}
        exploreOpen={exploreModalOpen}
        onCloseDemo={() => setDemoModalOpen(false)}
        onCloseExplore={() => setExploreModalOpen(false)}
      />

      {/* Main Continuous Narrative Rail */}
      <main className="relative z-10 w-full flex flex-col">
        {/* BEAT 1: THE FRACTURE */}
        <Scene1Fracture />

        {/* BEAT 2: THE MACHINE UNDERNEATH */}
        <Scene2Underneath />

        {/* BEAT 3: THE CONVERGENCE */}
        <Scene3Gathering />

        {/* BEAT 4: THE CRUCIBLE */}
        <Scene4Crucible
          onTriggerGlitch={handleTriggerGlitch}
          isGlitching={isGlitching}
        />

        {/* BEAT 5: THE REVEAL (MELO) */}
        <Scene5Reveal />

        {/* BEAT 6: THE HORIZON */}
        <Scene6Horizon
          onOpenDemoModal={() => setDemoModalOpen(true)}
          onOpenExploreModal={() => setExploreModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[#111214] text-[#767A80] py-14 px-6 border-t border-[#D8D3C8]/20 text-xs font-mono-tech">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]"></span>
              MELO
            </div>
            <p className="text-[11px] text-[#6B7075]">
              The Connected School Platform. One School. One System.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <button onClick={() => scrollToBeat(1)} className="hover:text-[#FAF8F5] transition-colors">FRACTURE</button>
            <button onClick={() => scrollToBeat(2)} className="hover:text-[#FAF8F5] transition-colors">PIPELINES</button>
            <button onClick={() => scrollToBeat(3)} className="hover:text-[#FAF8F5] transition-colors">CONVERGENCE</button>
            <button onClick={() => scrollToBeat(4)} className="hover:text-[#FAF8F5] transition-colors">CRUCIBLE</button>
            <button onClick={() => scrollToBeat(5)} className="hover:text-[#FAF8F5] transition-colors">MELO OS</button>
            <button onClick={() => scrollToBeat(6)} className="hover:text-[#FAF8F5] transition-colors">HORIZON</button>
          </div>

          <div className="text-[10px] text-[#6B7075]">
            © {new Date().getFullYear()} Melo Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <MeloMainExperience />
    </SmoothScrollProvider>
  );
}
