'use client';

import React from 'react';
import { SANCTUARY_DIMENSIONS } from '@/lib/shots-data';

interface SpatialStoryLayerProps {
  progress: number;
  activeShotIndex: number;
}

export const SpatialStoryLayer: React.FC<SpatialStoryLayerProps> = ({
  progress,
  activeShotIndex,
}) => {
  const totalShots = SANCTUARY_DIMENSIONS.length;
  const shotSpan = 1 / totalShots;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      {SANCTUARY_DIMENSIONS.map((shot, idx) => {
        const shotStart = idx * shotSpan;
        const shotEnd = (idx + 1) * shotSpan;

        const isCurrent = progress >= shotStart - 0.05 && progress <= shotEnd + 0.05;
        const localP = (progress - shotStart) / shotSpan;

        let opacity = 0;
        let translateY = 0;

        if (idx === 0) {
          if (localP <= 0.6) {
            opacity = 1;
            translateY = 0;
          } else {
            const t = (localP - 0.6) / 0.4;
            opacity = Math.max(0, 1 - t);
            translateY = -t * 20;
          }
        } else {
          if (localP >= 0 && localP <= 0.25) {
            const t = localP / 0.25;
            opacity = t;
            translateY = (1 - t) * 20;
          } else if (localP > 0.25 && localP <= 0.75) {
            opacity = 1;
            translateY = 0;
          } else if (localP > 0.75 && localP <= 1.0) {
            const t = (localP - 0.75) / 0.25;
            opacity = Math.max(0, 1 - t);
            translateY = -t * 20;
          }
        }

        if (!isCurrent && idx !== 0) return null;
        if (idx === 0 && progress > shotEnd) return null;

        return (
          <div
            key={shot.id}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-16 lg:p-24 pointer-events-none transition-opacity duration-500"
            style={{
              transform: `translate3d(0, ${translateY}px, 0)`,
              opacity,
              willChange: 'opacity, transform',
            }}
          >
            {/* Top Bar: Minimal Telemetry */}
            <div className="flex justify-between items-center text-xs font-mono tracking-[0.3em] uppercase text-[#E5ECE4]/60 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-[#D97736] font-medium">DIMENSION // {shot.number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#52796F]" />
                <span>{shot.specTelemetry.coordinate}</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span>{shot.specTelemetry.elevation}</span>
              </div>
            </div>

            {/* Central Typography: Bold, Crisp, Large & Extremely Legible */}
            <div className="max-w-4xl my-auto">
              <div className="space-y-6">
                {/* Accent Subtitle / Paradox */}
                <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.25em] text-[#D97736] font-medium uppercase drop-shadow">
                  {shot.drivingParadox}
                </p>

                {/* Monumental Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] text-[#E5ECE4] leading-[0.95] drop-shadow-2xl">
                  {shot.dimensionTitle}
                </h1>

                {/* Clear, Highly Legible Body */}
                <p className="text-base sm:text-lg md:text-2xl font-light text-[#E5ECE4]/90 leading-relaxed max-w-2xl drop-shadow-md">
                  {shot.philosophicalThesis}
                </p>

                {/* Poetic Accent Quote */}
                <div className="pt-2 border-l-2 border-[#D97736] pl-4">
                  <p className="text-sm sm:text-base italic font-light text-[#E5ECE4]/80">
                    "{shot.poeticFragment}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry */}
            <div className="flex justify-between items-end pb-4 text-xs font-mono tracking-[0.25em] text-[#E5ECE4]/50">
              <div className="hidden md:block">
                <span>ENVIRONMENT: {shot.environmentalMetaphor}</span>
              </div>
              <div className="flex items-center gap-2.5 ml-auto text-[#E5ECE4]/70">
                <span className="w-2 h-2 rounded-full bg-[#52796F] animate-pulse" />
                <span>{shot.specTelemetry.resonance}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
