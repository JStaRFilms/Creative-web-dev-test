import React from "react";
import { CropMark } from "../proof/CropMark";
import { RegistrationMark } from "../proof/RegistrationMark";
import { DensityWedge } from "../proof/DensityWedge";
import { CmykSwatches } from "../proof/CmykSwatches";
import { RevisionStamp } from "../proof/RevisionStamp";
import { ProofMargin } from "../proof/ProofMargin";
import { HandArrow, HandUnderline } from "../proof/HandAnnotation";
import { MeloDashboardArtifact } from "./MeloDashboardArtifact";
import { MeloMobileScoreArtifact } from "./MeloMobileScoreArtifact";
import { MeloReportCardArtifact } from "./MeloReportCardArtifact";
import { MeloInvoiceArtifact } from "./MeloInvoiceArtifact";

export const MeloOpeningProof: React.FC = () => {
  const featureList = [
    {
      title: "STUDENT MANAGEMENT",
      desc: "enrolment, profiles, guardians, classes",
    },
    {
      title: "ACADEMICS",
      desc: "score entry, report cards, grading, subjects",
    },
    {
      title: "FEES & PAYMENTS",
      desc: "invoicing, tracking, receipts",
    },
    {
      title: "COMMUNICATION",
      desc: "announcements, msgs, notifications",
    },
    {
      title: "AI TUTOR (UP NEXT)",
      desc: "personalised help for every student",
    },
  ];

  return (
    <section
      id="melo"
      className="relative min-h-screen w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-14 py-10 md:py-14 my-8 overflow-hidden select-none"
      aria-label="Project 01: Melo Platform"
    >
      {/* 4 Corner Crop Marks */}
      <CropMark position="top-left" />
      <CropMark position="top-right" />
      <CropMark position="bottom-left" />
      <CropMark position="bottom-right" />

      {/* Left Margin Rotated Metadata */}
      <ProofMargin text="PROJECT / 01    MODE / BUILDER    DATE / 09 01 26    STATUS / IN PROGRESS    SYSTEM / MELO SCHOOL    SCOPE / PLATFORM+ AI TUTOR" />

      {/* Right Margin Step Density Wedge & Registration Target */}
      <div
        className="hidden lg:flex flex-col items-center gap-6 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <DensityWedge />
        <RegistrationMark size={22} />
      </div>

      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between pb-4 md:pb-6 border-b border-dashed border-[#171714]/15">
        <div className="font-mono text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#D95B3F] font-semibold">
          PROJECT / 01 — BUILDER MODE
        </div>
        <RegistrationMark size={22} />
      </div>

      {/* Main Multi-Column Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 my-8 items-start">
        {/* Left Column: Project Identity, Philosophy & Features */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            {/* Tag */}
            <div className="relative inline-block font-mono text-[12px] md:text-[13px] font-semibold tracking-widest text-[#D95B3F] mb-1">
              <span>PROJECT / 01</span>
              <HandUnderline color="#D95B3F" className="w-full" />
            </div>

            {/* Display Title */}
            <h2 className="font-display text-[64px] sm:text-[80px] md:text-[96px] leading-[0.85] tracking-tight text-[#171714] font-normal my-2">
              MELO
            </h2>

            {/* Sub-label */}
            <div className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.3em] font-medium text-[#171714] mb-4">
              SCHOOL PLATFORM
            </div>

            {/* Statement */}
            <p className="font-display text-[18px] sm:text-[20px] md:text-[22px] leading-snug text-[#171714] font-normal tracking-tight mb-6">
              An all-in-one school platform that{" "}
              <span className="relative inline-block font-medium">
                simplifies
                <HandUnderline double color="#D95B3F" />
              </span>{" "}
              school operations and enhances learning.
            </p>

            {/* Feature Breakdown */}
            <ul className="space-y-3.5 border-t border-[#171714]/15 pt-5">
              {featureList.map((item, idx) => (
                <li key={idx} className="flex flex-col space-y-0.5">
                  <div className="flex items-center gap-2 font-mono text-[11px] md:text-[12px] font-semibold text-[#171714] tracking-wide">
                    <span className="text-[#D95B3F] font-bold">+</span>
                    <span>{item.title}</span>
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] text-[#5E594F] pl-4 italic">
                    → {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pinned Flowchart Note (Score Entry Flow) */}
          <div className="p-3 bg-[#FAF7F0] border border-[#171714]/20 rounded-md max-w-[220px] shadow-xs rotate-[-1deg]">
            <p className="font-hand text-[15px] font-semibold text-[#171714] mb-1.5 flex items-center gap-1">
              <span>score entry flow</span>
              <HandArrow direction="right" width={18} height={8} color="#171714" />
            </p>
            <div className="flex flex-col items-center space-y-1 font-mono text-[9px] text-[#171714]">
              <div className="px-2 py-0.5 border border-[#171714]/30 rounded bg-white w-full text-center">
                select class
              </div>
              <span className="text-[#5E594F] text-[8px] leading-none">↓</span>
              <div className="px-2 py-0.5 border border-[#171714]/30 rounded bg-white w-full text-center">
                enter scores
              </div>
              <span className="text-[#5E594F] text-[8px] leading-none">↓</span>
              <div className="px-2 py-0.5 border border-[#171714]/30 rounded bg-white w-full text-center font-bold">
                save
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Authentic Mounted UI Artifacts */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Dashboard Artifact */}
          <div className="relative">
            {/* Handwritten callout above dashboard */}
            <div
              className="hidden sm:flex items-center gap-1.5 absolute -top-5 right-8 font-hand text-[15px] text-[#5E594F] select-none"
              aria-hidden="true"
            >
              <span>builder mode</span>
              <HandArrow direction="curved-down" width={22} height={14} color="#5E594F" />
            </div>

            {/* Dashboard Mockup */}
            <MeloDashboardArtifact />
          </div>

          {/* Secondary Row of Mounted Artifacts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {/* Mobile Score Entry */}
            <MeloMobileScoreArtifact />

            {/* Student Report Card */}
            <MeloReportCardArtifact />

            {/* Fee Invoice */}
            <MeloInvoiceArtifact />
          </div>
        </div>

        {/* Far Right Column: Process Notes, Taped Card & Next Up Checklist */}
        <div className="lg:col-span-2 flex flex-col space-y-6 pt-2">
          {/* Handwritten Notes */}
          <div className="space-y-1.5 font-hand text-[15px] text-[#171714] leading-tight">
            <p className="text-[17px] font-semibold text-[#D95B3F] underline decoration-wavy">notes</p>
            <ul className="space-y-1.5 list-disc pl-4 text-[#5E594F]">
              <li>clean dashboard first</li>
              <li>mobile score entry optimized</li>
              <li>AI tutor assistant integration</li>
              <li>receipts via email + sms</li>
            </ul>
          </div>

          {/* Taped Index Card (Pricing / Unit Economics) */}
          <div className="relative p-3 bg-[#F6F2E8] border border-[#171714]/20 shadow-md rotate-[1.5deg] font-sans text-center">
            {/* Tape Graphic */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FAF7F0]/80 border-t border-b border-[#171714]/15 shadow-xs opacity-70" />

            {/* Isometric Cube SVG */}
            <div className="flex justify-center my-1">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z" stroke="#171714" strokeWidth="1" />
                <path d="M16 3V16M16 16L28 9.5M16 16L4 9.5M16 16V29" stroke="#171714" strokeWidth="1" />
              </svg>
            </div>

            <p className="font-mono text-[9px] text-[#5E594F] uppercase tracking-wider mb-0.5">
              per student, per term
            </p>
            <div className="relative inline-block font-mono font-bold text-[18px] text-[#171714]">
              ₦1,000
              <HandUnderline color="#D95B3F" className="w-full" />
            </div>
          </div>

          {/* Handwritten Next Up Checklist */}
          <div className="space-y-1.5 font-hand text-[15px] text-[#171714] leading-tight pt-2">
            <p className="text-[17px] font-semibold text-[#D95B3F] underline decoration-wavy">next up</p>
            <ul className="space-y-1 text-[#5E594F]">
              <li className="flex items-center gap-1.5">
                <span className="font-mono text-[12px]">☐</span>
                <span>parent portal</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="font-mono text-[12px]">☐</span>
                <span>AI tutor (beta)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="font-mono text-[12px]">☐</span>
                <span>mobile app</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="font-mono text-[12px]">☐</span>
                <span>analytics dashboard</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="font-mono text-[12px]">☐</span>
                <span>lesson plans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row: CMYK Calibration + Registration + Revision Stamp */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-dashed border-[#171714]/15">
        <CmykSwatches version="VER. 0.1.1" date="09 / 01 / 26" />
        <RegistrationMark size={20} />
        <RevisionStamp label="SYSTEM 01" revision="rev B" />
      </div>
    </section>
  );
};
