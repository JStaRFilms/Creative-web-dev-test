import React from "react";

interface GuideLinesProps {
  className?: string;
  showBaselines?: boolean;
}

export const GuideLines: React.FC<GuideLinesProps> = ({
  className = "",
  showBaselines = true,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Outer margin guide boundaries */}
      <div className="absolute top-6 bottom-6 left-8 md:left-14 border-l border-dashed border-[#171714]/15" />
      <div className="absolute top-6 bottom-6 right-8 md:right-14 border-r border-dashed border-[#171714]/15" />
      <div className="absolute top-14 left-8 right-8 border-t border-dashed border-[#171714]/15" />
      <div className="absolute bottom-14 left-8 right-8 border-b border-dashed border-[#171714]/15" />

      {/* Center axis guide lines */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dotted border-[#171714]/10" />

      {showBaselines && (
        <>
          {/* Subtle horizontal alignment guides */}
          <div className="absolute top-[32%] left-6 right-6 border-b border-dashed border-[#171714]/10" />
          <div className="absolute top-[62%] left-6 right-6 border-b border-dashed border-[#171714]/10" />
        </>
      )}
    </div>
  );
};
