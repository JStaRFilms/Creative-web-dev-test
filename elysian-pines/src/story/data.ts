export type ShotAlignment = "center" | "left" | "right";

export interface Shot {
  id: string;
  /** 0..1 scroll progress window where this shot animates in/out */
  enter: number;
  hold: number;
  exit: number;
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  meta?: string;
  align: ShotAlignment;
}

export const SHOTS: Shot[] = [
  {
    id: "arrival",
    enter: -0.08,
    hold: 0.1,
    exit: 0.2,
    eyebrow: "Somewhere in the high timber",
    title: "Follow the lanterns",
    subtitle:
      "Wind a road through cedar and mist until the canopy parts. This is our beginning.",
    align: "center",
  },
  {
    id: "clearing",
    enter: 0.15,
    hold: 0.25,
    exit: 0.36,
    eyebrow: "A retreat in the old forest",
    title: "Elysian",
    accent: "Pines",
    subtitle:
      "A timbered resort folded into a living grove — built to disappear into the green, not above it.",
    align: "center",
  },
  {
    id: "lodge",
    enter: 0.32,
    hold: 0.42,
    exit: 0.52,
    eyebrow: "The lodge",
    title: "Warmth in the timber",
    subtitle:
      "Hewn oak, open fire, low ceilings that hold the smell of cedar smoke. Rooms that face the trees and nothing else.",
    align: "left",
  },
  {
    id: "springs",
    enter: 0.48,
    hold: 0.58,
    exit: 0.68,
    eyebrow: "The springs",
    title: "Steam above still water",
    subtitle:
      "Geothermal pools carved into the forest floor. Slow mornings, cold air, water that never forgets its heat.",
    align: "right",
  },
  {
    id: "canopy",
    enter: 0.63,
    hold: 0.73,
    exit: 0.83,
    eyebrow: "The canopy walk",
    title: "Walk among the pines",
    subtitle:
      "A suspended bridge threads the treetops — a hundred feet of air beneath your boots and a sea of green above.",
    align: "center",
  },
  {
    id: "night",
    enter: 0.78,
    hold: 0.86,
    exit: 0.93,
    eyebrow: "The night",
    title: "Stars over embers",
    subtitle:
      "After dark the forest gives up its quiet desk. Fireflies, crickets, and a sky with no ceiling.",
    meta: "Clear-sky viewing · October to April",
    align: "left",
  },
  {
    id: "morning",
    enter: 0.9,
    hold: 0.97,
    exit: 1.0,
    eyebrow: "The invitation",
    title: "Find your way back",
    accent: "to the green",
    subtitle:
      "Elysian Pines. Open for the season, deep in the cedar mist.",
    meta: "Elysian Pines · High Timber Road · Est. 1931",
    align: "center",
  },
];
