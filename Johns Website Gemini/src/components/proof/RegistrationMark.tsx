import React from "react";

interface RegistrationMarkProps {
  className?: string;
  size?: number;
  variant?: "standard" | "red" | "accent";
}

export const RegistrationMark: React.FC<RegistrationMarkProps> = ({
  className = "",
  size = 28,
  variant = "standard",
}) => {
  const strokeColor =
    variant === "red"
      ? "#D95B3F"
      : variant === "accent"
      ? "#171714"
      : "currentColor";

  return (
    <div
      className={`inline-flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
        style={{ color: strokeColor }}
      >
        {/* Outer Ring */}
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="0.75" />
        {/* Inner Circle / Dot */}
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="0.75" />
        {/* Extended Crosshairs */}
        <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="0.75" />
        <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="0.75" />
        {/* Diagonal ticks */}
        <line x1="9.5" y1="9.5" x2="11" y2="11" stroke="currentColor" strokeWidth="0.75" />
        <line x1="22.5" y1="9.5" x2="21" y2="11" stroke="currentColor" strokeWidth="0.75" />
        <line x1="9.5" y1="22.5" x2="11" y2="21" stroke="currentColor" strokeWidth="0.75" />
        <line x1="22.5" y1="22.5" x2="21" y2="21" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    </div>
  );
};
