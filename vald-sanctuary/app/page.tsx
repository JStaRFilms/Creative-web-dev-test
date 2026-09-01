'use client';

import React, { useState, useCallback } from 'react';
import { ScrollController } from '@/components/scrollytelling/ScrollController';
import { CinematicCanvas } from '@/components/canvas/CinematicCanvas';
import { ThreeOverlayCanvas } from '@/components/canvas/ThreeOverlayCanvas';
import { SpatialStoryLayer } from '@/components/scrollytelling/SpatialStoryLayer';
import { MinimalNav } from '@/components/ui/MinimalNav';
import { AmbientAudio } from '@/components/audio/AmbientAudio';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  const handleProgressChange = useCallback((progress: number, shotIndex: number) => {
    setScrollProgress(progress);
    setActiveShotIndex(shotIndex);
  }, []);

  return (
    <main className="relative w-full bg-[#080C0A] text-[#E5ECE4]">
      {/* Soundscape Controller */}
      <AmbientAudio />

      {/* Minimal Navigation & Architectural Residency Trigger */}
      <MinimalNav
        progress={scrollProgress}
        activeShotIndex={activeShotIndex}
      />

      {/* Virtual Playhead Scroll Architecture */}
      <ScrollController onProgressChange={handleProgressChange}>
        {/* Layer 1: Pinned Canvas 2D Sequence Scrubber (Streaming background load, instant start) */}
        <CinematicCanvas
          progress={scrollProgress}
          activeShotIndex={activeShotIndex}
        />

        {/* Layer 2: Authentic PBR 3D Expedition Lantern with HDRI Reflection Map */}
        <ThreeOverlayCanvas progress={scrollProgress} />

        {/* Layer 3: Monumental, Razor-Sharp High-Contrast Editorial Typography */}
        <SpatialStoryLayer
          progress={scrollProgress}
          activeShotIndex={activeShotIndex}
        />
      </ScrollController>
    </main>
  );
}
