import type { CSSProperties, ReactNode } from "react";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function CropMark({ position }: { position: Position }) {
  return <span className={`crop-mark crop-mark--${position}`} aria-hidden="true" />;
}

export function RegistrationMark({ className = "" }: { className?: string }) {
  return (
    <svg className={`registration-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="8" />
      <circle cx="16" cy="16" r="3" />
      <path d="M16 0v32M0 16h32" />
    </svg>
  );
}

export function GuideLine({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  return <span className={`guide-line ${vertical ? "guide-line--vertical" : ""} ${className}`} aria-hidden="true" />;
}

export function RevisionStamp({ children, revision }: { children: ReactNode; revision: string }) {
  return (
    <div className="revision-lockup">
      <span className="revision-stamp">{children}</span>
      <span className="revision-note">{revision}</span>
    </div>
  );
}

export function SystemLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`system-label ${className}`}>{children}</span>;
}

export function Annotation({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <span className={`annotation ${className}`} style={style}>{children}</span>;
}

export function HandArrow({ className = "", direction = "right" }: { className?: string; direction?: "right" | "down" }) {
  return (
    <svg className={`hand-arrow hand-arrow--${direction} ${className}`} viewBox="0 0 100 34" aria-hidden="true">
      <path d="M3 17c25-2 48 1 83-1M75 7c5 4 9 8 12 9-4 3-8 8-12 12" />
    </svg>
  );
}

export function PaperNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <aside className={`paper-note ${className}`}>{children}</aside>;
}

export function ArtifactFrame({ children, label, className = "" }: { children: ReactNode; label: string; className?: string }) {
  return (
    <figure className={`artifact-frame ${className}`}>
      <figcaption>{label}</figcaption>
      {children}
    </figure>
  );
}

export function ProofCorners() {
  return (
    <>
      <CropMark position="top-left" />
      <CropMark position="top-right" />
      <CropMark position="bottom-left" />
      <CropMark position="bottom-right" />
    </>
  );
}
