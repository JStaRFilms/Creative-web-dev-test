"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ForestCanvas from "./ForestCanvas";

// r185 spam filter: Clock + PCFSoftShadowMap are deprecated but R3F/Drei still emit them
if (typeof window !== "undefined") {
  const _warn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = String(args[0] ?? "");
    if (msg.includes("PCFSoftShadowMap") || msg.includes("THREE.Clock")) return;
    _warn(...(args as []));
  };
}

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: "entry",
    kicker: "01 — DAWN / 05:42",
    title: "Time moves\nat the speed\nof trees.",
    body: "A cabin resort deep in the Hoh Rainforest. No itinerary. No signal.",
    range: [0, 0.14],
  },
  {
    id: "canopy",
    kicker: "02 — CANOPY / 240 FT",
    title: "Look up\nlong enough\nand you\nforget to hurry.",
    body: "Sitka spruce and western hemlock. 500-year-old columns of mist and light.",
    range: [0.14, 0.30],
  },
  {
    id: "clearing",
    kicker: "03 — THE CLEARING",
    title: "Three cabins.\nNo more.",
    body: "Blackened cedar. Paper lanterns. Cedar soaking tubs fed by the river.",
    range: [0.30, 0.46],
    side: "right" as const,
  },
  {
    id: "water",
    kicker: "04 — THE RIVER",
    title: "The Hoh\ndoesn't flow.\nIt breathes.",
    body: "Glacial water at 7°C. You enter slowly. You leave different.",
    range: [0.46, 0.60],
  },
  {
    id: "light",
    kicker: "05 — AFTERNOON",
    title: "Light comes\nin shafts.\nNot floods.",
    body: "Reading chairs. Wool blankets. A single record playing.",
    range: [0.60, 0.74],
    side: "right" as const,
  },
  {
    id: "fire",
    kicker: "06 — DUSK / 19:18",
    title: "At night,\nthe forest\ncomes inside.",
    body: "No overheads. Just fire, lantern, and the sound of 10,000 needles dripping.",
    range: [0.74, 0.88],
  },
  {
    id: "stay",
    kicker: "07 — SILVA",
    title: "Stay\nthree nights.\nLeave on\nforest time.",
    body: "From $640 / night. Includes supper, soaks, and silence. Limited to 6 guests.",
    range: [0.88, 1.0],
    cta: true,
  },
];

export default function ForestExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    const raf = (time: number) => {
      lenis.raf(time);
    };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=700%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setProgress(self.progress);
        },
      });

      // chapter reveals - scrubbed opacity/transform
      CHAPTERS.forEach((ch) => {
        const el = document.querySelector(`[data-chapter="${ch.id}"]`);
        if (!el) return;
        const [a, b] = ch.range;
        // create a tween controlled by the master ScrollTrigger's progress via containerAnimation? Simplify: manual onUpdate.
      });

      // subtle parallax on fixed canvas wrapper
      gsap.set(containerRef.current, { willChange: "transform" });

      // auto-invalidate
      ScrollTrigger.refresh();
      setReady(true);

      return () => {
        trigger.kill();
      };
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const activeChapter = CHAPTERS.find((c) => progress >= c.range[0] && progress < c.range[1] + 0.0001) ?? CHAPTERS[0];

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0B0F0D]">
      {/* 3D behind */}
      <ForestCanvas progress={progressRef} />

      {/* vignette & grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.55)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* top nav */}
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-[28px] w-[28px] rounded-full border border-white/20 grid place-items-center">
            <div className="h-[10px] w-[10px] rounded-full bg-[#C86432]" />
          </div>
          <span className="font-mono text-[11px] tracking-[0.22em] text-white/90">SILVA — HOH VALLEY</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-[0.16em] text-white/60">
          <span>46° N — 123° W</span>
          <span className="h-3 w-px bg-white/15" />
          <span>EST. 2026</span>
          <button
            onClick={() => setSoundOn((v) => !v)}
            className="ml-2 rounded-full border border-white/15 px-3 py-1 text-white/80 hover:bg-white hover:text-black transition"
          >
            {soundOn ? "SOUND ON ●" : "SOUND OFF"}
          </button>
        </div>
      </nav>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div className="h-full bg-[#C86432] transition-none" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="absolute bottom-6 left-6 md:left-10 z-20 font-mono text-[10px] tracking-[0.18em] text-white/45 hidden md:block">
        {String(Math.round(progress * 100)).padStart(2, "0")}% — THROUGH THE FOREST
      </div>
      <div className="absolute bottom-6 right-6 md:right-10 z-20 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/45">
        <span className="hidden md:inline">SCROLL TO WALK</span>
        <span className="h-6 w-[1px] bg-white/15 hidden md:block" />
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15">↕</span>
      </div>

      {/* Centered chapter system - only one visible at a time but crossfades on scroll */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {CHAPTERS.map((ch) => {
          const [a, b] = ch.range;
          const mid = (a + b) / 2;
          const span = b - a;
          // distance from progress to mid normalized
          const dist = Math.abs(progress - mid);
          // smooth alpha: 1 at mid, 0 at edges
          const alpha = Math.max(0, 1 - dist / (span * 0.62));
          const eased = Math.pow(alpha, 0.9);
          const isActive = eased > 0.02;
          const isRight = ch.side === "right";
          return (
            <div
              key={ch.id}
              data-chapter={ch.id}
              className={`absolute inset-0 flex items-center ${isRight ? "justify-end" : "justify-start"} px-6 md:px-16 lg:px-24`}
              style={{
                opacity: eased,
                transform: `translateY(${ (progress - mid) * -45 }px) scale(${0.97 + eased * 0.03})`,
                filter: `blur(${ (1 - eased) * 8 }px)`,
                visibility: isActive ? "visible" : "hidden",
              }}
            >
              <div className={`max-w-[560px] ${isRight ? "text-right ml-auto" : "text-left"}`}>
                <div className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] text-[#C86432] mb-4 flex items-center gap-3">
                  {!isRight && <span className="h-px w-8 bg-[#C86432]/60" />}
                  {ch.kicker}
                  {isRight && <span className="h-px w-8 bg-[#C86432]/60" />}
                </div>
                <h2 className="font-serif text-[42px] md:text-[64px] lg:text-[78px] leading-[0.88] tracking-[-0.03em] text-[#EDE8DE] whitespace-pre-line font-[300]">
                  {ch.title}
                </h2>
                <p className="mt-5 max-w-[36ch] font-sans text-[14px] md:text-[16px] leading-[1.6] text-white/70 font-[300] whitespace-pre-line">
                  {ch.body}
                </p>
                {ch.cta && (
                  <div className="pointer-events-auto mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center">
                    <a
                      href="#reserve"
                      className="inline-flex items-center gap-3 rounded-full bg-[#EDE8DE] px-7 py-3.5 font-mono text-[12px] tracking-[0.16em] text-black hover:bg-white transition"
                    >
                      CHECK AVAILABILITY <span className="text-[#C86432]">→</span>
                    </a>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-white/50">3 NIGHT MINIMUM — SPRING 2026</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader / hint */}
      <div
        className={`absolute inset-0 z-30 grid place-items-center bg-[#0B0F0D] transition-opacity duration-700 ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-3">SILVA</div>
          <div className="font-serif text-[28px] tracking-[-0.02em] text-[#EDE8DE]">Entering the forest…</div>
          <div className="mt-4 h-[1px] w-24 mx-auto bg-white/10 overflow-hidden">
            <div className="h-full w-1/2 bg-[#C86432] animate-[shimmer_1.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style>{`@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }`}</style>
    </div>
  );
}
