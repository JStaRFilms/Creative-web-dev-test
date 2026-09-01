'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollControllerProps {
  onProgressChange: (progress: number, activeIndex: number) => void;
  children: React.ReactNode;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({
  onProgressChange,
  children,
}) => {
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const startScrollRef = useRef(0);
  const easeFrameRef = useRef(12); // starts settled at 12 frames
  const TOTAL_EASE_FRAMES = 12;

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollY !== targetScrollRef.current) {
        startScrollRef.current = currentScrollRef.current;
        targetScrollRef.current = scrollY;
        easeFrameRef.current = 0; // trigger 12-frame ease-out
      }
    };

    // Exactly 12-frame ease-out deceleration loop
    const update = () => {
      if (easeFrameRef.current < TOTAL_EASE_FRAMES) {
        easeFrameRef.current += 1;
        const t = easeFrameRef.current / TOTAL_EASE_FRAMES;
        // Cubic ease-out: starts responsive, decelerates with zero final velocity
        const easeOut = 1 - Math.pow(1 - t, 3);
        currentScrollRef.current = startScrollRef.current + (targetScrollRef.current - startScrollRef.current) * easeOut;
      } else {
        currentScrollRef.current = targetScrollRef.current;
      }

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = Math.max(0, Math.min(currentScrollRef.current / maxScroll, 1));

      // 10% rest buffer at the bottom
      const normalized = Math.min(rawProgress / 0.95, 1.0);
      const shotIndex = Math.min(Math.floor(normalized * 5), 4);

      onProgressChange(normalized, shotIndex);
      animId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial positioning
    const initialY = window.scrollY || 0;
    currentScrollRef.current = initialY;
    targetScrollRef.current = initialY;
    startScrollRef.current = initialY;
    easeFrameRef.current = TOTAL_EASE_FRAMES;
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onProgressChange]);

  return (
    <div className="relative w-full">
      {/* Pinned Fullscreen Stage */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#080C0A] z-0 pointer-events-none">
        {children}
      </div>
      {/* Virtual Scroll Height */}
      <div className="relative w-full h-[600vh] pointer-events-none" style={{ minHeight: '600vh' }} />
    </div>
  );
};
