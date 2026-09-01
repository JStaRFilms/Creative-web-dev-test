"use client";

/**
 * A tiny shared mutable store bridging the DOM/GSAP scroll timeline and the
 * R3F WebGL render loop. Both sides import this same singleton and read/write
 * the same numeric fields without triggering React re-renders.
 */
export const scrollStore = {
  /** Normalized master progress 0..1 — drives the whole cinematic. */
  progress: 0,
  /** Raw window scroll offset, for subtle parallax. */
  raw: 0,
};
