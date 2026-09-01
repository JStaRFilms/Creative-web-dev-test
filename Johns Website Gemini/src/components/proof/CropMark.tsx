import React from "react";

interface CropMarkProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center" | "left-center" | "right-center";
  className?: string;
  size?: number;
}

export const CropMark: React.FC<CropMarkProps> = ({
  position,
  className = "",
  size = 32,
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-2 left-2 md:top-6 md:left-6";
      case "top-right":
        return "top-2 right-2 md:top-6 md:right-6";
      case "bottom-left":
        return "bottom-2 left-2 md:bottom-6 md:left-6";
      case "bottom-right":
        return "bottom-2 right-2 md:bottom-6 md:right-6";
      case "top-center":
        return "top-2 md:top-6 left-1/2 -translate-x-1/2";
      case "bottom-center":
        return "bottom-2 md:bottom-6 left-1/2 -translate-x-1/2";
      case "left-center":
        return "top-1/2 left-2 md:left-6 -translate-y-1/2";
      case "right-center":
        return "top-1/2 right-2 md:right-6 -translate-y-1/2";
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none ${getPositionClasses()} ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60 text-[#171714]"
      >
        {/* Crosshair Crop Mark */}
        <line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" strokeWidth="0.75" />
        <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    </div>
  );
};
