import React from "react";

interface HandArrowProps {
  direction?: "right" | "left" | "down" | "up" | "curved-down" | "curved-right";
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const HandArrow: React.FC<HandArrowProps> = ({
  direction = "right",
  color = "#5E594F",
  className = "",
  width = 38,
  height = 14,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {direction === "right" && (
        <>
          <path
            d="M2 8.5C12 7.8 30 8.2 44 8.5"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M38 3.5C40.5 5.5 43 7.5 45 8.5C43 9.8 40 12 37.5 13.5"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "curved-down" && (
        <>
          <path
            d="M4 2C12 2 32 6 36 20"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M30 15C33 18 35.5 20 36 21C37 18 39.5 15.5 42 13"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === "left" && (
        <>
          <path
            d="M46 8.5C36 7.8 18 8.2 4 8.5"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M10 3.5C7.5 5.5 5 7.5 3 8.5C5 9.8 8 12 10.5 13.5"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

interface HandCircleProps {
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export const HandCircle: React.FC<HandCircleProps> = ({
  color = "#D95B3F",
  className = "",
  children,
}) => {
  return (
    <span className={`relative inline-flex items-center justify-center p-1.5 ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 12,20 C 10,8 30,3 46,6 C 58,9 58,30 45,35 C 28,40 5,34 6,18 C 7,8 20,4 34,4"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative z-10 px-1">{children}</span>
    </span>
  );
};

interface HandUnderlineProps {
  color?: string;
  className?: string;
  double?: boolean;
}

export const HandUnderline: React.FC<HandUnderlineProps> = ({
  color = "#D95B3F",
  className = "",
  double = false,
}) => {
  return (
    <svg
      className={`absolute left-0 -bottom-1.5 w-full h-3 pointer-events-none select-none overflow-visible ${className}`}
      viewBox="0 0 100 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 4C25 6 75 2 98 4"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {double && (
        <path
          d="M4 8C28 10 72 6 96 8"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};
