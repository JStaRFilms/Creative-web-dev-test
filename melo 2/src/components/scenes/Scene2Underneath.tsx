"use client";

import React, { useState } from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { ArrowRight, CheckCircle2, ChevronRight, Cpu } from "lucide-react";

interface PipelineStep {
  name: string;
  desc: string;
}

interface Pipeline {
  id: string;
  domain: string;
  color: string;
  activeColor: string;
  steps: PipelineStep[];
}

const PIPELINES: Pipeline[] = [
  {
    id: "academic-pipeline",
    domain: "Academic Assessment Engine",
    color: "border-[#FF5A1F]/30 bg-[#FAF8F5]",
    activeColor: "bg-[#FF5A1F] text-white",
    steps: [
      { name: "ENTRY", desc: "Teacher enters CA1 & CA2 in local spreadsheet" },
      { name: "REVIEW", desc: "Head of Dept audits question weights & anomalies" },
      { name: "APPROVAL", desc: "Vice Principal confirms WAEC grade cutoffs" },
      { name: "COMPILATION", desc: "Broadsheet merges terminal exam with continuous assessments" },
      { name: "PUBLICATION", desc: "Official report card minted to parent portal" },
    ],
  },
  {
    id: "financial-pipeline",
    domain: "Bursary & Payment Engine",
    color: "border-[#142E28]/30 bg-[#FAF8F5]",
    activeColor: "bg-[#142E28] text-white",
    steps: [
      { name: "BILLING", desc: "Term 2 tuition & laboratory invoice generated" },
      { name: "PAYMENT", desc: "Guardian initiates online transfer or card payment" },
      { name: "GATEWAY", desc: "Paystack / Bank confirms cryptographic settlement" },
      { name: "RECONCILIATION", desc: "Bursar ledger clears outstanding student liability" },
      { name: "CLEARANCE", desc: "Exam admission pass auto-granted with zero manual queue" },
    ],
  },
  {
    id: "admissions-pipeline",
    domain: "Admissions & Identity Engine",
    color: "border-[#767A80]/30 bg-[#FAF8F5]",
    activeColor: "bg-[#111214] text-white",
    steps: [
      { name: "APPLICANT", desc: "Online application form & birth record submitted" },
      { name: "CBT EXAM", desc: "Standardized entrance test scores evaluated" },
      { name: "ACCEPTANCE", desc: "Admission offer letter dispatched to prospective parent" },
      { name: "ENROLLED", desc: "Tuition deposit confirmed & house allocated" },
      { name: "STUDENT ID", desc: "Unique institutional matriculation identity issued" },
    ],
  },
];

export const Scene2Underneath: React.FC = () => {
  const [activeSteps, setActiveSteps] = useState<Record<string, number>>({
    "academic-pipeline": 2,
    "financial-pipeline": 3,
    "admissions-pipeline": 4,
  });

  const handleStepClick = (pipelineId: string, stepIdx: number) => {
    sound.playHoverBlip(500 + stepIdx * 90);
    setActiveSteps((prev) => ({ ...prev, [pipelineId]: stepIdx }));
  };

  return (
    <section
      id="beat-2-machine"
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-24 pb-20 px-4 md:px-8 text-[#111214] font-mono-tech select-none"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#142E28] uppercase tracking-widest mb-4">
        <Cpu size={14} className="text-[#FF5A1F]" />
        <span>Chapter 02 — The Machine Underneath</span>
      </div>

      {/* Headline */}
      <div className="max-w-4xl text-center space-y-4 mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-[#111214] tracking-tight">
          It isn’t one problem. It’s hundreds of little ones.
        </h2>
        <p className="text-sm sm:text-base text-[#6B7075] max-w-2xl mx-auto leading-relaxed">
          A school is not a simple static directory. It is an intricate web of high-stakes transactional pipelines where one delayed approval paralyzes ten downstream operations.
        </p>
      </div>

      {/* Interactive Pipeline Engines */}
      <div className="w-full max-w-5xl space-y-8">
        {PIPELINES.map((pipeline) => {
          const currentStep = activeSteps[pipeline.id] || 0;
          return (
            <div
              key={pipeline.id}
              className={`p-5 sm:p-6 rounded-2xl border shadow-sm ${pipeline.color}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111214]">
                  {pipeline.domain}
                </span>
                <span className="text-[11px] text-[#6B7075]">
                  Stage {currentStep + 1} of {pipeline.steps.length}
                </span>
              </div>

              {/* Step Sequence Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                {pipeline.steps.map((step, idx) => {
                  const isPassed = idx <= currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <button
                      key={step.name}
                      onClick={() => handleStepClick(pipeline.id, idx)}
                      className={`p-2.5 rounded-lg text-left text-xs transition-all duration-200 border ${
                        isCurrent
                          ? `${pipeline.activeColor} border-transparent shadow-md font-bold scale-[1.02]`
                          : isPassed
                          ? "bg-[#EFEBE1] text-[#111214] border-[#D8D3C8] font-medium"
                          : "bg-[#FAF8F5] text-[#6B7075] border-[#D8D3C8]/60 hover:bg-[#EFEBE1]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-wider opacity-70 mb-0.5">
                        <span>0{idx + 1}</span>
                        {isPassed && <CheckCircle2 size={10} />}
                      </div>
                      <div className="font-bold text-[11px]">{step.name}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Real-time Explanation */}
              <div className="p-3.5 rounded-lg bg-[#EFEBE1]/80 border border-[#D8D3C8] text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-[#FF5A1F] flex-shrink-0" />
                  <span className="text-[#111214] font-medium">
                    {pipeline.steps[currentStep].desc}
                  </span>
                </div>
                <span className="text-[10px] text-[#6B7075] hidden sm:inline-block uppercase">
                  Click stages to inspect flow
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Relational Next Question Relay */}
      <div className="max-w-2xl text-center mt-16 p-6 rounded-xl bg-[#FAF8F5] border border-[#D8D3C8]">
        <h4 className="text-base sm:text-lg font-bold font-editorial text-[#111214] mb-2">
          What happens when these separate pipelines finally know about each other?
        </h4>
        <p className="text-xs text-[#6B7075] leading-relaxed">
          When an academic grade, a tuition receipt, and an admissions decision share the same institutional memory in real time.
        </p>
      </div>
    </section>
  );
};
