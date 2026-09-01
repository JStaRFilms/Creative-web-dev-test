"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollContextType {
  scrollProgress: number; // 0.0 to 1.0
  activeBeat: number;     // 1 to 6
  lenis: Lenis | null;
  scrollToBeat: (beat: number) => void;
  scrollToTop: () => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
  activeBeat: 1,
  lenis: null,
  scrollToBeat: () => {},
  scrollToTop: () => {},
});

export const useScrollPlayhead = () => useContext(ScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBeat, setActiveBeat] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", (e: { progress: number }) => {
      const prog = Math.max(0, Math.min(1, e.progress || 0));
      setScrollProgress(prog);

      // Determine active beat based on normalized progress
      // Beat 1: 0.00 - 0.16 (Fracture)
      // Beat 2: 0.16 - 0.34 (The Machine Underneath)
      // Beat 3: 0.34 - 0.52 (Convergence)
      // Beat 4: 0.52 - 0.68 (The Crucible)
      // Beat 5: 0.68 - 0.86 (The Reveal: Melo OS)
      // Beat 6: 0.86 - 1.00 (The Horizon)
      if (prog < 0.16) {
        setActiveBeat(1);
      } else if (prog < 0.34) {
        setActiveBeat(2);
      } else if (prog < 0.52) {
        setActiveBeat(3);
      } else if (prog < 0.68) {
        setActiveBeat(4);
      } else if (prog < 0.86) {
        setActiveBeat(5);
      } else {
        setActiveBeat(6);
      }

      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  const scrollToBeat = (beat: number) => {
    if (!lenisInstance) return;
    const targetMap: Record<number, string> = {
      1: "#beat-1-fracture",
      2: "#beat-2-machine",
      3: "#beat-3-convergence",
      4: "#beat-4-crucible",
      5: "#beat-5-reveal",
      6: "#beat-6-horizon",
    };
    const selector = targetMap[beat];
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        lenisInstance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.5 });
      }
    }
  };

  const scrollToTop = () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        activeBeat,
        lenis: lenisInstance,
        scrollToBeat,
        scrollToTop,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
