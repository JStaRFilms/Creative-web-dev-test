import React from "react";

interface CmykSwatchesProps {
  version?: string;
  date?: string;
  className?: string;
}

export const CmykSwatches: React.FC<CmykSwatchesProps> = ({
  version = "VER. 0.1",
  date = "05 / 20 / 26",
  className = "",
}) => {
  const swatches = [
    { label: "K", color: "#171714" },
    { label: "C", color: "#0099DA" },
    { label: "M", color: "#D1176F" },
    { label: "Y", color: "#F0B800" },
  ];

  return (
    <div
      className={`flex items-end gap-4 select-none font-mono text-[10px] tracking-widest text-[#171714] ${className}`}
      aria-hidden="true"
    >
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] justify-between text-[9px] text-[#5E594F] px-[1px]">
          {swatches.map((s) => (
            <span key={s.label} className="w-[14px] text-center font-semibold">
              {s.label}
            </span>
          ))}
        </div>
        <div className="flex gap-[6px]">
          {swatches.map((s) => (
            <div
              key={s.label}
              className="w-[14px] h-[14px] border border-[#171714]/20"
              style={{ backgroundColor: s.color }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col text-[9px] leading-[13px] text-[#5E594F] uppercase tracking-wider pb-[1px]">
        <span>{version}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};
