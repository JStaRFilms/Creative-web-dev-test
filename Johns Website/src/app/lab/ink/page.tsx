"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import {
  Annotation,
  DimensionLine,
  GuideLine,
  HandArrow,
  ProofCorners,
  RegistrationMark,
  RevisionStamp,
  SystemLabel,
} from "@/components/proof/ProofMarks";
import { InkCanvas, type InkDistortionParams, type InkTelemetry } from "@/components/ink-lab/InkCanvas";
import { InkLabControls } from "@/components/ink-lab/InkLabControls";
import { InkLabHUD } from "@/components/ink-lab/InkLabHUD";

declare global {
  interface Window {
    __INK_LAB__?: {
      setParams: (next: Partial<InkDistortionParams>) => void;
      getParams: () => InkDistortionParams;
      getTelemetry: () => InkTelemetry | null;
    };
  }
}

const DEFAULT_PARAMS: InkDistortionParams = {
  disturbance: 0.0,
  registration: 0.0,
  drag: 0.0,
  dragAngle: 25,
  roughness: 0.08,
  reveal: 0.0,
  pointerActive: true,
  renderMode: "paper",
};

export default function InkLabPage() {
  const [params, setParams] = useState<InkDistortionParams>(DEFAULT_PARAMS);
  const [telemetry, setTelemetry] = useState<InkTelemetry | null>(null);
  const [showDomOverlay, setShowDomOverlay] = useState(false);
  const [isStackedLayout, setIsStackedLayout] = useState(false);

  useEffect(() => {
    window.__INK_LAB__ = {
      setParams: (next) => setParams((prev) => ({ ...prev, ...next })),
      getParams: () => params,
      getTelemetry: () => telemetry,
    };
    return () => {
      delete window.__INK_LAB__;
    };
  }, [params, telemetry]);

  return (
    <main className="ink-lab-main">
      <section className="proof-page ink-lab-page" aria-labelledby="lab-title">
        <ProofCorners />
        <Header />

        <div className="lab-workbench-layout">
          {/* Left Column: Canvas Preview & Spatial Context */}
          <div className="lab-stage-container">
            <div className="lab-stage-header">
              <div className="lab-breadcrumbs">
                <Link href="/" className="lab-back-link">← RETURN TO PRODUCTION</Link>
                <span className="lab-crumb-sep">/</span>
                <span className="lab-crumb-current">LAB 01 — INK DISTURBANCE</span>
              </div>
              <SystemLabel className="lab-spec-label">
                RENDER TARGET / BOUNDED QUAD — INSTRUMENT SERIF
              </SystemLabel>
            </div>

            <GuideLine className="lab-guide-top" />
            <GuideLine className="lab-guide-bottom" />
            <DimensionLine label="PREVIEW AREA / 100% BOUNDED" className="lab-dim-line" />

            <div className={`lab-canvas-wrapper ${isStackedLayout ? "lab-canvas-wrapper--stacked" : ""}`}>
              {showDomOverlay && (
                <div className="lab-dom-overlay" aria-hidden="true">
                  <h1 className="lab-dom-heading">
                    {isStackedLayout ? (
                      <>
                        <span>JO</span>
                        <span>HN</span>
                      </>
                    ) : (
                      <span>JOHN</span>
                    )}
                  </h1>
                </div>
              )}

              <InkCanvas
                params={params}
                onTelemetry={setTelemetry}
                isStackedLayout={isStackedLayout}
                className="lab-canvas-element"
              />

              <Annotation className="lab-annotation-left">
                authentic<br />print misregistration<br />& roller drag
              </Annotation>
              <HandArrow className="lab-arrow-left" />

              <Annotation className="lab-annotation-right">
                low-frequency<br />mechanical warp
              </Annotation>
              <HandArrow className="lab-arrow-right" />
            </div>

            <div className="lab-stage-footer">
              <SystemLabel className="lab-interaction-hint">
                {params.pointerActive
                  ? "POINTER FIELD ACTIVE — DRAG CURSOR OVER LETTERS TO TEST LOCAL SHEAR & VELOCITY"
                  : "POINTER FIELD DISABLED — DISPLAYING BASELINE PARAMETRIC VALUES"}
              </SystemLabel>
              <InkLabHUD telemetry={telemetry} />
            </div>
          </div>

          {/* Right Column: Interactive Parameter Bench */}
          <aside className="lab-controls-container">
            <InkLabControls
              params={params}
              onChange={setParams}
              showDomOverlay={showDomOverlay}
              onToggleDomOverlay={setShowDomOverlay}
              isStackedLayout={isStackedLayout}
              onToggleStackedLayout={setIsStackedLayout}
            />
          </aside>
        </div>

        <RevisionStamp revision="UNFILED">LAB 01</RevisionStamp>
        <RegistrationMark className="lab-reg-bottom" />
        <SystemLabel className="lab-folio">SHEET LAB / 01&nbsp;&nbsp; EXPERIMENTAL / PHYSICAL INK</SystemLabel>
      </section>
    </main>
  );
}
