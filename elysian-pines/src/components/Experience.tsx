"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOTS } from "@/story/data";
import { scrollStore } from "@/store/scroll";
import { ForestScene } from "./forest/ForestScene";
import { Story } from "./Story";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const storyNodes = useRef<Record<string, HTMLElement | null>>({});
  const progressBar = useRef<HTMLDivElement | null>(null);
  const scrollHint = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Collect story nodes after mount.
    const nodes = storyNodes.current;
    SHOTS.forEach((s) => {
      nodes[s.id] = document.querySelector(`[data-shot="${s.id}"]`);
    });

    const stage = document.querySelector("#scroll-stage");
    if (!stage) return;

    // Measure the frozen child transforms for a clean baseline.
    const startOpacity = 0;
    const init = () => {
      SHOTS.forEach((s) => {
        const el = nodes[s.id];
        if (!el) return;
        gsap.set(el, { opacity: startOpacity, yPercent: 0, filter: "blur(0px)" });
        el.querySelectorAll<HTMLElement>("[data-role]").forEach((child) => {
          gsap.set(child, { opacity: 0, yPercent: 24 });
        });
      });
      if (scrollHint.current) gsap.set(scrollHint.current, { opacity: 1 });
    };
    init();

    const master = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        scrollStore.progress = progress;
        scrollStore.raw = self.scroll();

        if (progressBar.current) {
          gsap.set(progressBar.current, { width: `${progress * 100}%` });
        }
        if (scrollHint.current) {
          gsap.set(scrollHint.current, { opacity: progress < 0.02 ? 1 : 0 });
        }

        // Choreograph each shot.
        for (const shot of SHOTS) {
          const el = nodes[shot.id];
          if (!el) continue;

          // Arrive window: [enter, hold]; depart window: [hold, exit]
          const arrive = _smoothstep(shot.enter, shot.hold, progress);
          const depart = 1 - _smoothstep(shot.hold, shot.exit, progress);
          const visible = Math.min(arrive, depart);
          const eased = _easeOut(visible);

          gsap.set(el, {
            opacity: eased,
            yPercent: (1 - visible) * 12,
            filter: `blur(${Math.round((1 - visible) * 10)}px)`,
          });

          // Stagger inner elements by visibility with slight offset per role.
          const children = Array.from(el.querySelectorAll<HTMLElement>("[data-role]"));
          children.forEach((child, i) => {
            const ci = _clamp01(visible * 1.4 - i * 0.18);
            gsap.set(child, {
              opacity: ci,
              yPercent: (1 - ci) * 22,
              filter: `blur(${Math.round((1 - ci) * 8)}px)`,
            });
          });
        }
      },
    });

    init();

    return () => {
      master.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <ForestScene />
      <Story />
      <div className="hud" aria-hidden="true">
        <div className="hud-topbar">
          <span className="hud-wordmark">Elysian Pines</span>
          <span>High Timber Road · Est. 1931</span>
        </div>
        <div className="hud-progress">
          <div ref={progressBar} className="hud-progress-bar" />
        </div>
        <div ref={scrollHint} className="hud-scrollhint">
          Scroll to walk the grove
        </div>
      </div>
      <div className="grain" />
      <div id="scroll-stage" className="scroll-stage" />
    </>
  );
}

function _clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function _smoothstep(a: number, b: number, x: number) {
  if (a === b) return x >= a ? 1 : 0;
  const t = _clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function _easeOut(n: number) {
  const t = _clamp01(n);
  return 1 - Math.pow(1 - t, 3);
}
