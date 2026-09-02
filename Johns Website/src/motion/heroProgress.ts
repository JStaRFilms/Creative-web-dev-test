export type HeroNarrativeState = "REST" | "DISTURB" | "REVEAL" | "RECONSTRUCT" | "REORGANIZE";

export type HeroProgressSnapshot = {
  progress: number;
  state: HeroNarrativeState;
  disturbance: number;
  reveal: number;
  reconstruction: number;
  reorganize: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const range = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

export function resolveHeroProgress(progress: number): HeroProgressSnapshot {
  const normalized = clamp01(progress);
  const reconstruction = range(normalized, 0.7, 0.85);
  const disturbanceRise = range(normalized, 0.2, 0.55);
  const revealRise = range(normalized, 0.38, 0.63);

  let state: HeroNarrativeState = "REST";
  if (normalized >= 0.85) state = "REORGANIZE";
  else if (normalized >= 0.7) state = "RECONSTRUCT";
  else if (normalized >= 0.55) state = "REVEAL";
  else if (normalized >= 0.2) state = "DISTURB";

  return {
    progress: normalized,
    state,
    disturbance: disturbanceRise * (1 - reconstruction),
    reveal: revealRise * (1 - reconstruction),
    reconstruction,
    reorganize: range(normalized, 0.85, 1),
  };
}
