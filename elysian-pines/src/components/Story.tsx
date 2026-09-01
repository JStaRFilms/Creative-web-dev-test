"use client";

import { useRef } from "react";
import { SHOTS, type Shot } from "@/story/data";

const ALIGN_CLASS: Record<Shot["align"], string> = {
  center: "items-center text-center",
  left: "items-start text-left px-[10vw] justify-center",
  right: "items-end text-right px-[10vw] justify-center",
};

/**
 * Renders every story shot as a fixed, stacked full-screen layer. The parent
 * orchestrator animates each node's opacity / transform / filter as scroll
 * progress crosses its [enter, hold, exit] window, so text drifts in and out
 * like landmarks passed on the walk.
 */
export function Story() {
  const nodes = useRef<Record<string, HTMLElement | null>>({});

  return (
    <div className="story-layer">
      {SHOTS.map((shot) => (
        <div
          key={shot.id}
          ref={(el) => {
            if (el) nodes.current[shot.id] = el;
          }}
          data-shot={shot.id}
          className={`story-scene ${ALIGN_CLASS[shot.align]}`}
          style={{ transform: "translateZ(0)" }}
        >
          {shot.eyebrow && (
            <p className="eyebrow" data-role="eyebrow">
              {shot.eyebrow}
            </p>
          )}
          <h2 className="title" data-role="title">
            {shot.title}
            {shot.accent && <> <em className="accent">{shot.accent}</em></>}
          </h2>
          {shot.subtitle && (
            <p className="subtitle" data-role="subtitle">
              {shot.subtitle}
            </p>
          )}
          {shot.meta && (
            <p className="meta" data-role="meta">
              {shot.meta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export { SHOTS };
export type { Shot };
