"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import TextOverlay from "./TextOverlay";

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  {
    id: "intro",
    start: 0,
    end: 0.12,
    text: "EVERWILD",
    subtitle: "Deep in the Black Forest",
    position: "center" as const,
  },
  {
    id: "approach",
    start: 0.1,
    end: 0.25,
    text: "Where ancient pines\nwhisper secrets",
    subtitle: "",
    position: "left" as const,
  },
  {
    id: "canopy",
    start: 0.22,
    end: 0.38,
    text: "Breathe",
    subtitle: "The air here has a name",
    position: "right" as const,
  },
  {
    id: "deep",
    start: 0.35,
    end: 0.5,
    text: "200 hectares\nof untouched silence",
    subtitle: "",
    position: "center" as const,
  },
  {
    id: "clearing",
    start: 0.48,
    end: 0.62,
    text: "A clearing\nawaits",
    subtitle: "Found, not built",
    position: "left" as const,
  },
  {
    id: "resort",
    start: 0.6,
    end: 0.75,
    text: "7 cabins.\n1 philosophy.",
    subtitle: "Less. Better. Wilder.",
    position: "right" as const,
  },
  {
    id: "night",
    start: 0.73,
    end: 0.88,
    text: "Stay until\nthe stars arrive",
    subtitle: "",
    position: "center" as const,
  },
  {
    id: "outro",
    start: 0.86,
    end: 1.0,
    text: "EVERWILD",
    subtitle: "Black Forest, Germany",
    position: "center" as const,
  },
];

export default function ScrollExperience() {
  const lenisRef = useRef<Lenis | null>(null);

  const updateForest = useCallback((progress: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = (window as any).__forestScrollProgress as
      | React.RefObject<number>
      | undefined;
    if (ref && "current" in ref) {
      (ref as { current: number }).current = progress;
    }
  }, []);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Sync with GSAP
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // 3. Create main scroll track
    const scrollTrack = document.querySelector(".scroll-track");
    if (!scrollTrack) return;

    ScrollTrigger.create({
      trigger: scrollTrack,
      start: "top top",
      end: () => `+=${window.innerHeight * 8}`,
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateForest(self.progress);
      },
    });

    // 4. Animate each text overlay
    SHOTS.forEach((shot) => {
      const el = document.getElementById(`shot-${shot.id}`);
      if (!el) return;

      // Entrance
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollTrack,
            start: `top+=${shot.start * 100}% top`,
            end: `top+=${(shot.start + 0.05) * 100}% top`,
            scrub: 1,
          },
        }
      );

      // Exit
      gsap.to(el, {
        opacity: 0,
        y: -40,
        scale: 1.02,
        duration: 1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: scrollTrack,
          start: `top+=${(shot.end - 0.05) * 100}% top`,
          end: `top+=${shot.end * 100}% top`,
          scrub: 1,
        },
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, [updateForest]);

  return (
    <div className="scroll-track relative" style={{ height: "800vh" }}>
      {/* Pinned viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,15,10,0.6) 100%)",
          }}
        />

        {/* Film grain texture */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Text overlays */}
        {SHOTS.map((shot) => (
          <TextOverlay
            key={shot.id}
            id={shot.id}
            text={shot.text}
            subtitle={shot.subtitle}
            position={shot.position}
          />
        ))}

        {/* Bottom gradient for grounding */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,15,10,0.8) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
