import React from "react";

interface ProofMarginProps {
  text?: string;
  className?: string;
}

export const ProofMargin: React.FC<ProofMarginProps> = ({
  text = "MARGIN — 1860 IEC 1100MM    P03 — sRGB IEC61966    + 708 — × 210 MM",
  className = "",
}) => {
  return (
    <div
      className={`hidden lg:block absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="font-mono text-[9px] tracking-[0.25em] text-[#5E594F]/80 uppercase writing-vertical whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};
