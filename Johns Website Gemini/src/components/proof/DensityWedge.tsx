import React from "react";

interface DensityWedgeProps {
  className?: string;
}

export const DensityWedge: React.FC<DensityWedgeProps> = ({ className = "" }) => {
  const steps = [
    "#171714", // 100% black
    "#403D37", // 80%
    "#6E695E", // 60%
    "#9D9688", // 40%
    "#CDC6B6", // 20%
    "#EAE4D5", // 5%
  ];

  return (
    <div
      className={`flex flex-col gap-[2px] w-[14px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {steps.map((color, i) => (
        <div
          key={i}
          className="w-[14px] h-[10px] border border-[#171714]/20"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
