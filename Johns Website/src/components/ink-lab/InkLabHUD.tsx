"use client";

import type { InkTelemetry } from "./InkCanvas";

interface InkLabHUDProps {
  telemetry: InkTelemetry | null;
}

export function InkLabHUD({ telemetry }: InkLabHUDProps) {
  if (!telemetry) return null;

  return (
    <aside className="ink-hud" aria-label="Ink disturbance real-time telemetry">
      <div className="ink-hud-header">
        <span className="ink-hud-title">DIAGNOSTIC / TELEMETRY</span>
        <span className="ink-hud-status">ACTIVE</span>
      </div>
      <div className="ink-hud-grid">
        <div className="ink-hud-metric">
          <span className="ink-hud-label">FPS</span>
          <span className="ink-hud-value">{telemetry.fps} <small>fps</small></span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">FRAME TIME</span>
          <span className="ink-hud-value">{telemetry.frameTimeMs} <small>ms</small></span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">DPR</span>
          <span className="ink-hud-value">{telemetry.dpr.toFixed(1)} <small>x</small></span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">RENDER BUFFER</span>
          <span className="ink-hud-value">{telemetry.renderWidth} × {telemetry.renderHeight}</span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">LOGICAL BOUNDS</span>
          <span className="ink-hud-value">{telemetry.logicalWidth} × {telemetry.logicalHeight}</span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">POINTER UV</span>
          <span className="ink-hud-value">{telemetry.pointerUvX}, {telemetry.pointerUvY}</span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">VELOCITY (VX, VY)</span>
          <span className="ink-hud-value">{telemetry.pointerVx}, {telemetry.pointerVy}</span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">POINTER SPEED</span>
          <span className="ink-hud-value">{telemetry.pointerSpeed}</span>
        </div>
        <div className="ink-hud-metric">
          <span className="ink-hud-label">ACTIVE DISTURBANCE</span>
          <span className="ink-hud-value">{telemetry.activeDisturbance}</span>
        </div>
      </div>
    </aside>
  );
}
