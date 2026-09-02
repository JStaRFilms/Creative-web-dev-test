"use client";

import { useEffect } from "react";
import { resolveHeroProgress, type HeroProgressSnapshot } from "@/motion/heroProgress";

declare global {
  interface Window {
    __JOHN_HERO__?: HeroProgressSnapshot & { start: number; end: number };
  }
}

function setMetric(name: string, value: string) {
  const node = document.querySelector<HTMLElement>(`[data-debug-${name}]`);
  if (node) node.textContent = value;
}

export function HeroScrollController() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    async function initialize() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const selectedWork = document.querySelector<HTMLElement>("#work");
      if (!hero || !selectedWork) return;

      let previousState = "";
      const applyProgress = (progress: number, start = 0, end = 0) => {
        const snapshot = resolveHeroProgress(progress);
        hero.style.setProperty("--hero-progress", snapshot.progress.toFixed(4));
        hero.style.setProperty("--disturbance", snapshot.disturbance.toFixed(4));
        hero.style.setProperty("--reveal", snapshot.reveal.toFixed(4));
        hero.style.setProperty("--reconstruction", snapshot.reconstruction.toFixed(4));
        hero.style.setProperty("--reorganize", snapshot.reorganize.toFixed(4));
        selectedWork.style.setProperty("--reorganize", snapshot.reorganize.toFixed(4));

        if (snapshot.state !== previousState) {
          hero.dataset.narrativeState = snapshot.state;
          previousState = snapshot.state;
        }

        window.__JOHN_HERO__ = { ...snapshot, start, end };
        setMetric("progress", snapshot.progress.toFixed(3));
        setMetric("state", snapshot.state);
        setMetric("disturbance", snapshot.disturbance.toFixed(3));
        setMetric("reveal", snapshot.reveal.toFixed(3));
        setMetric("reconstruction", snapshot.reconstruction.toFixed(3));
      };

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const trigger = ScrollTrigger.create({
        id: "john-hero-narrative",
        trigger: hero,
        start: "top top",
        end: () => `+=${window.innerHeight * (window.innerWidth <= 760 ? 1.5 : 1.8)}`,
        pin: true,
        pinSpacing: true,
        scrub: reducedMotion ? true : 0.18,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress, self.start, self.end),
        onRefresh: (self) => applyProgress(self.progress, self.start, self.end),
      });

      const handoffTrigger = ScrollTrigger.create({
        id: "john-selected-work-handoff",
        trigger: selectedWork,
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.scroll() < self.start) return;
          const offset = -(1 - self.progress) * window.innerHeight;
          selectedWork.style.transform = `translate3d(0, ${offset}px, 0)`;
        },
        onLeaveBack: () => selectedWork.style.removeProperty("transform"),
      });

      applyProgress(trigger.progress, trigger.start, trigger.end);
      cleanup = () => {
        trigger.kill(true);
        handoffTrigger.kill();
        selectedWork.style.removeProperty("transform");
        selectedWork.style.removeProperty("--reorganize");
      };
    }

    void initialize();
    return () => {
      cancelled = true;
      cleanup();
      delete window.__JOHN_HERO__;
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <aside className="hero-debug" aria-label="Hero scroll diagnostics">
      <label className="proof-debug-toggle">
        <input id="proof-debug" type="checkbox" />
        <span>GRID / DEBUG</span>
      </label>
      <div className="hero-debug-readout">
        <span>PROGRESS <b data-debug-progress>0.000</b></span>
        <span>STATE <b data-debug-state>REST</b></span>
        <span>DISTURB <b data-debug-disturbance>0.000</b></span>
        <span>REVEAL <b data-debug-reveal>0.000</b></span>
        <span>REBUILD <b data-debug-reconstruction>0.000</b></span>
      </div>
    </aside>
  );
}
