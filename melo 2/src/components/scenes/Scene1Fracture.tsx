"use client";

import React from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { ArrowDown, AlertCircle, Sparkles } from "lucide-react";

interface FragmentCard {
  id: string;
  category: string;
  title: string;
  data: string;
  tag: string;
  color: string;
  driftClass: string;
}

const FRAGMENTS: FragmentCard[] = [
  {
    id: "frag-1",
    category: "RESULTS",
    title: "Physics Exam Score",
    data: "64/70 (CA Missing)",
    tag: "Teacher's Excel Sheet",
    color: "border-[#FF5A1F]/60 text-[#FF5A1F]",
    driftClass: "sm:translate-x-[-120px] sm:translate-y-[-80px]",
  },
  {
    id: "frag-2",
    category: "FEES",
    title: "Tuition Balance",
    data: "₦185,000 Unreconciled",
    tag: "Bank Portal Printout",
    color: "border-[#142E28]/60 text-[#142E28]",
    driftClass: "sm:translate-x-[140px] sm:translate-y-[-110px]",
  },
  {
    id: "frag-3",
    category: "ADMISSIONS",
    title: "Entrance Dossier",
    data: "Score: 94/100 (Accepted)",
    tag: "Admission Email Thread",
    color: "border-[#767A80]/60 text-[#767A80]",
    driftClass: "sm:translate-x-[-160px] sm:translate-y-[60px]",
  },
  {
    id: "frag-4",
    category: "ATTENDANCE",
    title: "Roll Call Log",
    data: "98.4% Present",
    tag: "Physical Paper Register",
    color: "border-[#9B9FA6]/60 text-[#111214]",
    driftClass: "sm:translate-x-[150px] sm:translate-y-[80px]",
  },
  {
    id: "frag-5",
    category: "PARENT",
    title: "Guardian Inquiries",
    data: "Mrs. Okonjo (Waiting)",
    tag: "WhatsApp Message Log",
    color: "border-[#C6C1B7]/80 text-[#6B7075]",
    driftClass: "sm:translate-x-[-90px] sm:translate-y-[-160px]",
  },
  {
    id: "frag-6",
    category: "RECEIPTS",
    title: "STEM Levy Receipt",
    data: "Slip #RC-9041 (Filing Cabinet)",
    tag: "Bursar Paper Carbon",
    color: "border-[#C86432]/60 text-[#C86432]",
    driftClass: "sm:translate-x-[90px] sm:translate-y-[-170px]",
  },
];

export const Scene1Fracture: React.FC = () => {
  return (
    <section
      id="beat-1-fracture"
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-28 sm:pt-36 px-4 md:px-8 text-[#111214] font-mono-tech select-none"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A1F] uppercase tracking-widest mb-4">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F] inline-block" />
        <span>Chapter 01 — The Fracture</span>
      </div>

      {/* Main Dramatic Thesis */}
      <div className="max-w-4xl text-center space-y-4 mb-16">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-editorial text-[#111214] tracking-tight leading-[1.1]">
          A school is one institution.
        </h1>
        <p className="text-xl sm:text-3xl font-editorial italic text-[#6B7075] transition-colors duration-500 hover:text-[#111214]">
          So why does its information live everywhere?
        </p>
      </div>

      {/* The Central Student & Drifting Fragment Matrix */}
      <div className="relative w-full max-w-4xl my-12 py-12 flex flex-col items-center justify-center">
        {/* Core Center Node: The Single Student */}
        <div
          onMouseEnter={() => sound.playHoverBlip(880)}
          className="relative z-20 w-64 p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#111214] shadow-xl text-center cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#FF5A1F] text-white text-[10px] font-bold tracking-wider uppercase">
            Primary Entity
          </div>
          <div className="text-base font-bold text-[#111214] mb-0.5 font-editorial">Amara Okonjo</div>
          <div className="text-[11px] text-[#6B7075] mb-2 font-mono-tech">ID: ST-2026-041 • SS 2 Diamond</div>
          <div className="flex items-center justify-center gap-1 text-[10px] text-[#142E28] font-semibold bg-[#142E28]/10 py-1 px-2 rounded-md">
            <Sparkles size={11} />
            <span>Center of Educational Universe</span>
          </div>
        </div>

        {/* Orbiting / Drifting Fragment Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 sm:mt-0 sm:absolute sm:inset-0 sm:pointer-events-none">
          {FRAGMENTS.map((frag) => (
            <div
              key={frag.id}
              onMouseEnter={() => sound.playTick(500, 0.04)}
              className={`sm:pointer-events-auto p-4 rounded-xl bg-[#FAF8F5]/90 backdrop-blur-sm border shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-105 ${frag.color} ${frag.driftClass}`}
            >
              <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mb-1">
                <span>{frag.category}</span>
                <span className="text-[#6B7075]">{frag.tag}</span>
              </div>
              <div className="text-xs font-bold text-[#111214]">{frag.title}</div>
              <div className="text-[11px] text-[#6B7075] mt-1 font-mono-tech">{frag.data}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Relational Question Relay */}
      <div className="max-w-2xl text-center space-y-4 my-16 p-6 rounded-xl bg-[#EFEBE1]/80 border border-[#D8D3C8]">
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#FF5A1F] font-bold uppercase tracking-wider">
          <AlertCircle size={14} />
          <span>The Structural Paradox</span>
        </div>
        <p className="text-sm sm:text-base text-[#111214] font-editorial leading-relaxed">
          This is one student. Yet her examination scores, fees, admissions file, and attendance live across six isolated softwares, four binders, and three chat threads.
        </p>
        <div className="pt-2 text-xs font-bold text-[#6B7075] tracking-widest uppercase flex items-center justify-center gap-2">
          <span>Scroll to uncover the machinery underneath</span>
          <ArrowDown size={13} className="animate-bounce text-[#FF5A1F]" />
        </div>
      </div>
    </section>
  );
};
