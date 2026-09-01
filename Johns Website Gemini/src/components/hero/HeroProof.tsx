import React from "react";
import { CropMark } from "../proof/CropMark";
import { RegistrationMark } from "../proof/RegistrationMark";
import { DensityWedge } from "../proof/DensityWedge";
import { CmykSwatches } from "../proof/CmykSwatches";
import { RevisionStamp } from "../proof/RevisionStamp";
import { ProofMargin } from "../proof/ProofMargin";
import { HandArrow, HandCircle, HandUnderline } from "../proof/HandAnnotation";
import { GuideLines } from "../proof/GuideLines";

export const HeroProof: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[94vh] md:min-h-screen w-full max-w-[1520px] mx-auto px-4 sm:px-8 md:px-16 pt-5 md:pt-6 pb-4 md:pb-6 flex flex-col justify-between overflow-hidden select-none"
      aria-label="Hero Introduction"
    >
      {/* 4 Corner Crop Marks */}
      <CropMark position="top-left" size={30} />
      <CropMark position="top-right" size={30} />
      <CropMark position="bottom-left" size={30} />
      <CropMark position="bottom-right" size={30} />

      {/* Subtle Architectural Guide Lines */}
      <GuideLines />

      {/* Left Margin Rotated Metadata */}
      <ProofMargin text="MARGIN — 1860 IEC 1100MM    P03 — sRGB IEC61966    + 708 — × 210 MM" />

      {/* Right Margin Step Density Wedge & Registration Target */}
      <div
        className="hidden lg:flex flex-col items-center gap-6 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <DensityWedge />
        <RegistrationMark size={22} />
      </div>

      {/* Top Bar: Identity + Center Target + Nav */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 px-2 sm:px-0">
        {/* Top Left Identity */}
        <div className="font-mono text-[11px] md:text-[12px] font-medium tracking-[0.2em] text-[#171714]">
          JOHN OLULEKE-OKE / 2026
        </div>

        {/* Top Center Registration Crosshair */}
        <div className="hidden sm:flex items-center justify-center">
          <RegistrationMark size={24} />
        </div>

        {/* Top Right Navigation */}
        <nav aria-label="Hero Navigation">
          <ul className="flex items-center gap-4 sm:gap-5 md:gap-7 font-mono text-[11px] md:text-[12px] font-medium tracking-[0.2em] text-[#171714]">
            <li><a href="#work" className="hover:text-[#D95B3F] transition-colors">WORK</a></li>
            <li><a href="#lab" className="hover:text-[#D95B3F] transition-colors">LAB</a></li>
            <li><a href="#about" className="hover:text-[#D95B3F] transition-colors">ABOUT</a></li>
            <li><a href="#contact" className="hover:text-[#D95B3F] transition-colors">CONTACT</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Hero Typographic Canvas */}
      <div className="relative z-10 my-auto py-6 md:py-6 flex flex-col items-center justify-center">
        {/* Giant JOHN Headline with Architectural Construction Underlay */}
        <div className="relative inline-block w-full text-center max-w-[1360px]">
          {/* Handwritten Kerning Callout (Top-Left of J) */}
          <div
            className="hidden md:flex items-center gap-1.5 absolute -top-4 md:-top-6 left-[8%] lg:left-[12%] text-[#5E594F] font-hand text-[15px] md:text-[18px] select-none"
            aria-hidden="true"
          >
            <span className="leading-tight text-[#5E594F] text-right">
              kerning<br />optical<br />+10
            </span>
            <HandArrow direction="right" width={32} height={12} color="#5E594F" className="mt-2" />
          </div>

          {/* Handwritten Ink Density Callout (Right of N) */}
          <div
            className="hidden md:flex items-center gap-1.5 absolute top-[40%] right-[6%] lg:right-[10%] text-[#5E594F] font-hand text-[15px] md:text-[18px] select-none"
            aria-hidden="true"
          >
            <HandArrow direction="left" width={28} height={12} color="#5E594F" />
            <span className="leading-tight text-[#5E594F] text-left">
              ink<br />density<br />+5%
            </span>
          </div>

          {/* Fine Red Proof Drafting / Construction Wireframe Underlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-45 translate-x-[2px] translate-y-[1px]"
            aria-hidden="true"
          >
            <span
              className="font-display text-[26vw] md:text-[24vw] 2xl:text-[340px] leading-[0.85] tracking-[-0.015em] text-transparent"
              style={{
                WebkitTextStroke: "0.8px #D95B3F",
              }}
            >
              JOHN
            </span>
          </div>

          {/* Horizontal Construction Guidelines through JOHN */}
          <div
            className="absolute inset-x-0 top-[22%] h-[1px] border-b border-dashed border-[#D95B3F]/25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-[20%] h-[1px] border-b border-dashed border-[#D95B3F]/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Main Ink Display Headline (DOM Semantic H1) */}
          <h1
            className="relative font-display text-[26vw] md:text-[24vw] 2xl:text-[340px] leading-[0.85] tracking-[-0.015em] text-[#171714] font-normal select-none"
            style={{
              textShadow: "0.5px 0.5px 0px rgba(23, 23, 20, 0.3)",
            }}
          >
            JOHN
          </h1>
        </div>

        {/* Supporting Editorial Statement & Mode Bar */}
        <div className="mt-6 md:mt-8 w-full max-w-[1100px] px-3 flex flex-col items-center text-center">
          {/* Subhead Row with Handwritten Circle 24/36 and Baseline Note */}
          <div className="relative inline-flex items-center justify-center flex-wrap gap-2 md:gap-4 my-2">
            {/* Hand-drawn Circled 24/36 Callout */}
            <div
              className="hidden sm:inline-flex items-center gap-1.5 font-hand text-[16px] md:text-[18px] text-[#5E594F] select-none"
              aria-hidden="true"
            >
              <HandCircle color="#5E594F" className="font-mono text-[11px] md:text-[12px] text-[#5E594F]">
                24/36
              </HandCircle>
              <HandArrow direction="right" width={26} height={10} color="#5E594F" />
            </div>

            {/* Semantic Statement */}
            <p className="font-display text-[19px] sm:text-[24px] md:text-[30px] lg:text-[34px] text-[#171714] font-normal leading-tight tracking-tight">
              I make things{" "}
              <span className="relative inline-block">
                across
                <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-[#171714]/60" />
              </span>{" "}
              software, film, AI, design and sound.
            </p>

            {/* Right Baseline Target Callout */}
            <div
              className="hidden lg:inline-flex items-center gap-1.5 font-hand text-[15px] text-[#5E594F] select-none ml-2"
              aria-hidden="true"
            >
              <RegistrationMark size={18} />
              <span className="leading-tight text-[13px] text-left">
                align<br />to baseline
              </span>
            </div>
          </div>

          {/* Mode Metadata Indicator with Double Proof-Red Underline */}
          <div className="mt-5 md:mt-7 flex items-center justify-center font-mono text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.22em] text-[#171714] uppercase">
            <span>CURRENT MODE / </span>
            <span className="relative ml-2 font-semibold">
              EVERYTHING
              <HandUnderline double color="#D95B3F" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: CMYK Calibration + Prompt + Revision Stamp */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 md:pt-5 border-t border-dashed border-[#171714]/15">
        {/* Left: CMYK Swatches */}
        <div className="flex-1 flex justify-start">
          <CmykSwatches version="VER. 0.1" date="05 / 20 / 26" />
        </div>

        {/* Center: Scroll Prompt */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-[#171714] uppercase flex items-center gap-2">
            <span>SCROLL TO ENTER</span>
            <span className="animate-bounce">↓</span>
          </div>
          {/* Center Bottom Registration Crosshair */}
          <div className="mt-1.5">
            <RegistrationMark size={20} />
          </div>
        </div>

        {/* Right: Revision Stamp */}
        <div className="flex-1 flex justify-end">
          <RevisionStamp label="PROOF 01" revision="rev A" />
        </div>
      </div>
    </section>
  );
};
