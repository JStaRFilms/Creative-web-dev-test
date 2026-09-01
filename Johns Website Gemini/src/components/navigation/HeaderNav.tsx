import React from "react";
import { RegistrationMark } from "../proof/RegistrationMark";

interface HeaderNavProps {
  activeSection?: "work" | "lab" | "about" | "contact";
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeSection }) => {
  return (
    <header className="relative w-full max-w-[1440px] mx-auto px-4 md:px-12 pt-4 md:pt-6 pb-2 flex items-center justify-between z-20">
      {/* Top Left: Name & Year */}
      <div className="font-mono text-[11px] md:text-[12px] font-medium tracking-[0.2em] text-[#171714] select-none">
        JOHN OLULEKE-OKE / 2026
      </div>

      {/* Top Center: Registration Mark */}
      <div className="hidden md:flex items-center justify-center">
        <RegistrationMark size={24} />
      </div>

      {/* Top Right: Semantic Navigation Links */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-5 md:gap-8 font-mono text-[11px] md:text-[12px] font-medium tracking-[0.2em] text-[#171714]">
          <li>
            <a
              href="#work"
              className={`hover:text-[#D95B3F] transition-colors relative py-1 ${
                activeSection === "work" ? "text-[#171714]" : ""
              }`}
            >
              WORK
              {activeSection === "work" && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#171714]" />
              )}
            </a>
          </li>
          <li>
            <a
              href="#lab"
              className={`hover:text-[#D95B3F] transition-colors relative py-1 ${
                activeSection === "lab" ? "text-[#171714]" : ""
              }`}
            >
              LAB
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`hover:text-[#D95B3F] transition-colors relative py-1 ${
                activeSection === "about" ? "text-[#171714]" : ""
              }`}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`hover:text-[#D95B3F] transition-colors relative py-1 ${
                activeSection === "contact" ? "text-[#171714]" : ""
              }`}
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
