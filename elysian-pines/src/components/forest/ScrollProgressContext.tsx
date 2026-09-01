"use client";

import { createContext, useContext } from "react";

/** Mutable scroll progress (0..1) written by GSAP, read by R3F each frame. */
export interface ScrollProgress {
  /** Normalized master progress 0..1 */
  progress: number;
  /** 100% of the body — used for parallax continuity */
  raw: number;
}

export const ScrollProgressContext = createContext<ScrollProgress>({
  progress: 0,
  raw: 0,
});

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}
