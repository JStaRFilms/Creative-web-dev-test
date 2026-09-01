import React from "react";
import { CropMark } from "../proof/CropMark";
import { RegistrationMark } from "../proof/RegistrationMark";
import { DensityWedge } from "../proof/DensityWedge";
import { CmykSwatches } from "../proof/CmykSwatches";
import { RevisionStamp } from "../proof/RevisionStamp";
import { HandCircle, HandArrow } from "../proof/HandAnnotation";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  mode: string;
  role: string;
  href: string;
}

const projects: ProjectItem[] = [
  {
    id: "melo",
    number: "01",
    title: "MELO",
    mode: "BUILDER",
    role: "builder / systems",
    href: "#melo",
  },
  {
    id: "university-ad",
    number: "02",
    title: "THE ₦0 UNIVERSITY AD",
    mode: "DIRECTOR",
    role: "director / film",
    href: "#university-ad",
  },
  {
    id: "takomi",
    number: "03",
    title: "TAKOMI",
    mode: "ENGINEER",
    role: "engineer / ai workflows",
    href: "#takomi",
  },
  {
    id: "model-observatory",
    number: "04",
    title: "MODEL OBSERVATORY",
    mode: "EXPERIMENTER",
    role: "experimenter / comparison",
    href: "#observatory",
  },
  {
    id: "cfop",
    number: "05",
    title: "CFOP ROADMAP",
    mode: "TEACHER",
    role: "teacher / learning",
    href: "#cfop",
  },
];

export const SelectedWorkProof: React.FC = () => {
  return (
    <section
      id="work"
      className="relative min-h-[90vh] w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-14 py-12 md:py-16 my-8 border-t border-b border-dashed border-[#171714]/20 overflow-hidden select-none"
      aria-label="Selected Work Index"
    >
      {/* 4 Corner Crop Marks */}
      <CropMark position="top-left" />
      <CropMark position="top-right" />
      <CropMark position="bottom-left" />
      <CropMark position="bottom-right" />

      {/* Top Section Header Bar */}
      <div className="w-full flex items-center justify-between pb-6 border-b border-dashed border-[#171714]/15">
        <div className="font-mono text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#5E594F]">
          03 — TRANSITION TO SELECTED WORK
        </div>
        <RegistrationMark size={22} />
      </div>

      {/* Main Grid: Left Reconstructed JOHN + Right Index Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-8 md:my-12 items-center">
        {/* Left Column: Reconstructing JOHN Identity & System Update */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full py-4 relative">
          <div className="font-mono text-[11px] tracking-[0.2em] text-[#5E594F] uppercase mb-4">
            JOHN OLULEKE-OKE / 2026
          </div>

          <div className="relative my-6 lg:my-10">
            {/* Outline ghost */}
            <div
              className="absolute inset-0 pointer-events-none select-none opacity-30 translate-x-1"
              aria-hidden="true"
            >
              <span
                className="font-display text-[20vw] lg:text-[140px] leading-none text-transparent"
                style={{ WebkitTextStroke: "1px #D95B3F" }}
              >
                JOHN
              </span>
            </div>

            {/* Resolved Serif JOHN */}
            <h2 className="relative font-display text-[20vw] lg:text-[140px] leading-none text-[#171714] font-normal">
              JOHN
            </h2>

            {/* Red Construction Arrow pointing across to Work Index */}
            <div
              className="hidden lg:flex items-center absolute top-1/2 -right-8 translate-x-full -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-16 xl:w-24 h-[1px] bg-[#D95B3F]" />
              <div className="w-2 h-2 border-t border-r border-[#D95B3F] rotate-45 -ml-1" />
            </div>
          </div>

          {/* System Update Metadata Box */}
          <div className="border-l-2 border-[#171714] pl-3 py-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#5E594F] leading-relaxed">
            <p className="text-[#171714] font-medium">SYSTEM UPDATE</p>
            <p>IDENTITY RESOLVED → LOADING WORK INDEX</p>
          </div>
        </div>

        {/* Vertical Divider on Desktop */}
        <div className="hidden lg:block lg:col-span-1 h-full flex justify-center">
          <div className="w-[1px] h-full border-r border-dashed border-[#171714]/20" />
        </div>

        {/* Right Column: Typographic Selected Work Contents List */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Section Heading & Handwritten Annotation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#171714]">
            <h3 className="font-mono text-[14px] md:text-[16px] font-semibold tracking-[0.25em] text-[#171714] uppercase">
              SELECTED WORK
            </h3>

            {/* Handwritten Note + Red Circled Range */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 font-hand text-[15px] md:text-[17px] text-[#5E594F]">
                <span>5 projects that explain me better than a bio.</span>
                <HandArrow direction="right" width={24} height={10} color="#5E594F" />
              </div>

              <HandCircle color="#D95B3F">
                <span className="font-mono text-[12px] md:text-[13px] font-semibold text-[#D95B3F] tracking-wider">
                  01–05
                </span>
              </HandCircle>
            </div>
          </div>

          {/* Project List */}
          <ul className="divide-y divide-[#171714]/20">
            {projects.map((project) => (
              <li key={project.id}>
                <a
                  href={project.href}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-4 md:py-5 px-2 hover:bg-[#F6F2E8]/80 transition-colors"
                >
                  {/* Left: Project Number + Title */}
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-mono text-[13px] md:text-[14px] font-semibold text-[#5E594F] group-hover:text-[#D95B3F] transition-colors">
                      {project.number}
                    </span>
                    <span className="font-display text-[22px] sm:text-[26px] md:text-[30px] font-normal text-[#171714] tracking-tight group-hover:translate-x-1 transition-transform">
                      {project.id === "university-ad" ? (
                        <>
                          THE <span className="font-sans font-medium text-[0.9em]">₦</span>0 UNIVERSITY AD
                        </>
                      ) : (
                        project.title
                      )}
                    </span>
                  </div>

                  {/* Right: Mode & Subtitle Descriptor */}
                  <div className="mt-1 sm:mt-0 font-mono text-[12px] md:text-[13px] text-[#5E594F] group-hover:text-[#171714] transition-colors flex items-center gap-1.5 pl-8 sm:pl-0">
                    <span className="text-[#D95B3F] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span className="italic">{project.role}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Proof Metadata & Registration */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-dashed border-[#171714]/15">
        <CmykSwatches version="VER. 0.1" date="05 / 20 / 26" />
        <RegistrationMark size={20} />
        <RevisionStamp label="PROOF 01" revision="rev A" />
      </div>
    </section>
  );
};
