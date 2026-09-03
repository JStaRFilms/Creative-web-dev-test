"use client";

import { useEffect, useState } from "react";
import { InkCanvas, type InkDistortionParams } from "@/components/ink-lab/InkCanvas";
import type { HeroProgressSnapshot } from "@/motion/heroProgress";

const REST_PARAMS: InkDistortionParams = {
  disturbance: 0,
  registration: 0,
  drag: 0,
  dragAngle: 24,
  roughness: 0.08,
  reveal: 0,
  pointerActive: true,
  renderMode: "transparent",
};

function paramsFromProgress(snapshot: HeroProgressSnapshot): InkDistortionParams {
  return {
    disturbance: snapshot.disturbance,
    registration: snapshot.disturbance * 0.78,
    drag: snapshot.disturbance * 0.68,
    dragAngle: 18 + snapshot.disturbance * 10,
    roughness: 0.08 + snapshot.disturbance * 0.5,
    reveal: snapshot.reveal,
    pointerActive: true,
    renderMode: "transparent",
  };
}

export function HeroInkRenderer() {
  const [params, setParams] = useState(REST_PARAMS);
  const [isStackedLayout, setIsStackedLayout] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    const updateCapabilities = () => {
      setIsStackedLayout(mobileQuery.matches);
      setParams((current) => ({
        ...current,
        pointerActive: finePointerQuery.matches && !reducedMotionQuery.matches,
      }));
    };

    const handleProgress = (event: Event) => {
      const snapshot = (event as CustomEvent<HeroProgressSnapshot>).detail;
      const next = paramsFromProgress(snapshot);
      next.pointerActive = finePointerQuery.matches && !reducedMotionQuery.matches;
      setParams(next);
    };

    updateCapabilities();
    mobileQuery.addEventListener("change", updateCapabilities);
    reducedMotionQuery.addEventListener("change", updateCapabilities);
    finePointerQuery.addEventListener("change", updateCapabilities);
    window.addEventListener("john:hero-progress", handleProgress);

    return () => {
      mobileQuery.removeEventListener("change", updateCapabilities);
      reducedMotionQuery.removeEventListener("change", updateCapabilities);
      finePointerQuery.removeEventListener("change", updateCapabilities);
      window.removeEventListener("john:hero-progress", handleProgress);
    };
  }, []);

  return (
    <InkCanvas
      params={params}
      isStackedLayout={isStackedLayout}
      className="hero-ink-canvas"
      ariaHidden
    />
  );
}
