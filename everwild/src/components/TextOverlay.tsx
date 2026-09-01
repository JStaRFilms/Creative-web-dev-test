"use client";

interface TextOverlayProps {
  id: string;
  text: string;
  subtitle: string;
  position: "center" | "left" | "right";
}

export default function TextOverlay({
  id,
  text,
  subtitle,
  position,
}: TextOverlayProps) {
  const positionStyles = {
    center: "items-center text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    left: "items-start text-left left-[8%] top-1/2 -translate-y-1/2",
    right: "items-end text-right right-[8%] top-1/2 -translate-y-1/2",
  };

  const lines = text.split("\n");

  return (
    <div
      id={`shot-${id}`}
      className={`overlay-text flex flex-col gap-3 opacity-0 ${positionStyles[position]}`}
      aria-label={text.replace("\n", " ")}
    >
      <h2
        className="font-serif font-light tracking-[0.15em] leading-[1.1]"
        style={{
          fontSize: "clamp(2rem, 5vw, 5rem)",
          color: "var(--cream)",
          textShadow: "0 0 40px rgba(10,15,10,0.9), 0 0 80px rgba(10,15,10,0.6)",
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block" aria-hidden="true">
            {line}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          className="font-sans font-light tracking-[0.3em] uppercase"
          style={{
            fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
            color: "var(--fog)",
            textShadow: "0 0 30px rgba(10,15,10,0.8)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
