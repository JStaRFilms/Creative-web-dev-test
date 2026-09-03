"use client";

import type { InkDistortionParams } from "./InkCanvas";

interface InkLabControlsProps {
  params: InkDistortionParams;
  onChange: (next: InkDistortionParams) => void;
  showDomOverlay: boolean;
  onToggleDomOverlay: (show: boolean) => void;
  isStackedLayout: boolean;
  onToggleStackedLayout: (stacked: boolean) => void;
}

export const PRESETS: Record<string, { label: string; params: Partial<InkDistortionParams> }> = {
  clean: {
    label: "01. CLEAN (REST / 0.0)",
    params: {
      disturbance: 0.0,
      registration: 0.0,
      drag: 0.0,
      dragAngle: 25,
      roughness: 0.0,
      reveal: 0.0,
      pointerActive: true,
    },
  },
  mild: {
    label: "02. MILD (~0.30)",
    params: {
      disturbance: 0.30,
      registration: 0.32,
      drag: 0.25,
      dragAngle: 18,
      roughness: 0.22,
      reveal: 0.20,
      pointerActive: true,
    },
  },
  medium: {
    label: "03. MEDIUM (~0.60)",
    params: {
      disturbance: 0.60,
      registration: 0.58,
      drag: 0.48,
      dragAngle: 24,
      roughness: 0.42,
      reveal: 0.48,
      pointerActive: true,
    },
  },
  maximum: {
    label: "04. MAXIMUM ACCEPTABLE (~0.85)",
    params: {
      disturbance: 0.85,
      registration: 0.78,
      drag: 0.68,
      dragAngle: 28,
      roughness: 0.58,
      reveal: 0.72,
      pointerActive: true,
    },
  },
};

export function InkLabControls({
  params,
  onChange,
  showDomOverlay,
  onToggleDomOverlay,
  isStackedLayout,
  onToggleStackedLayout,
}: InkLabControlsProps) {
  const updateParam = <K extends keyof InkDistortionParams>(key: K, value: InkDistortionParams[K]) => {
    onChange({ ...params, [key]: value });
  };

  const applyPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (preset) {
      onChange({ ...params, ...preset.params });
    }
  };

  return (
    <div className="ink-controls-panel" aria-label="Ink disturbance control workbench">
      <div className="ink-controls-header">
        <span className="ink-controls-title">INK LAB / CALIBRATION BENCH</span>
        <span className="ink-controls-revision">UNFILED / LAB 01</span>
      </div>

      <div className="ink-presets-section">
        <span className="ink-section-label">CALIBRATION PRESETS</span>
        <div className="ink-preset-buttons">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              className={`ink-preset-btn ${
                Math.abs(params.disturbance - (preset.params.disturbance ?? 0)) < 0.05 ? "ink-preset-btn--active" : ""
              }`}
              onClick={() => applyPreset(key)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ink-sliders-section">
        <span className="ink-section-label">PHYSICAL DISTURBANCE CONTROLS</span>

        {/* 1. Disturbance Strength */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-disturbance">DISTURBANCE STRENGTH</label>
            <span className="ink-param-value">{params.disturbance.toFixed(2)}</span>
          </div>
          <input
            id="param-disturbance"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.disturbance}
            onChange={(e) => updateParam("disturbance", parseFloat(e.target.value))}
          />
        </div>

        {/* 2. Registration Separation */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-registration">REGISTRATION SEPARATION</label>
            <span className="ink-param-value">{params.registration.toFixed(2)}</span>
          </div>
          <input
            id="param-registration"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.registration}
            onChange={(e) => updateParam("registration", parseFloat(e.target.value))}
          />
        </div>

        {/* 3. Directional Drag */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-drag">DIRECTIONAL INK DRAG</label>
            <span className="ink-param-value">{params.drag.toFixed(2)}</span>
          </div>
          <input
            id="param-drag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.drag}
            onChange={(e) => updateParam("drag", parseFloat(e.target.value))}
          />
        </div>

        {/* 4. Drag Angle */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-dragAngle">DRAG VECTOR ANGLE</label>
            <span className="ink-param-value">{Math.round(params.dragAngle)}°</span>
          </div>
          <input
            id="param-dragAngle"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={params.dragAngle}
            onChange={(e) => updateParam("dragAngle", parseFloat(e.target.value))}
          />
        </div>

        {/* 5. Surface/Ink Roughness */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-roughness">SURFACE / INK ROUGHNESS</label>
            <span className="ink-param-value">{params.roughness.toFixed(2)}</span>
          </div>
          <input
            id="param-roughness"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.roughness}
            onChange={(e) => updateParam("roughness", parseFloat(e.target.value))}
          />
        </div>

        {/* 6. Reveal Amount */}
        <div className="ink-slider-row">
          <div className="ink-slider-head">
            <label htmlFor="param-reveal">MODE REVEAL AMOUNT</label>
            <span className="ink-param-value">{params.reveal.toFixed(2)}</span>
          </div>
          <input
            id="param-reveal"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.reveal}
            onChange={(e) => updateParam("reveal", parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="ink-toggles-section">
        <span className="ink-section-label">INTERACTION & DISPLAY TOGGLES</span>
        <div className="ink-toggle-grid">
          <label className="ink-toggle-label">
            <input
              type="checkbox"
              checked={params.pointerActive}
              onChange={(e) => updateParam("pointerActive", e.target.checked)}
            />
            <span>POINTER PHYSICS FIELD</span>
          </label>

          <label className="ink-toggle-label">
            <input
              type="checkbox"
              checked={showDomOverlay}
              onChange={(e) => onToggleDomOverlay(e.target.checked)}
            />
            <span>DOM SEMANTIC OVERLAY</span>
          </label>

          <label className="ink-toggle-label">
            <input
              type="checkbox"
              checked={isStackedLayout}
              onChange={(e) => onToggleStackedLayout(e.target.checked)}
            />
            <span>MOBILE STACKED (JO / HN)</span>
          </label>

          <label className="ink-toggle-label">
            <input
              type="checkbox"
              checked={params.renderMode === "paper"}
              onChange={(e) => updateParam("renderMode", e.target.checked ? "paper" : "transparent")}
            />
            <span>OPAQUE PROOF BACKGROUND</span>
          </label>
        </div>
      </div>
    </div>
  );
}
