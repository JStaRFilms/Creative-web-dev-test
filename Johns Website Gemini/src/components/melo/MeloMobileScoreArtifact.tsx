import React from "react";
import { ArrowLeft, Menu, ChevronDown } from "lucide-react";

export const MeloMobileScoreArtifact: React.FC = () => {
  const students = [
    { name: "Ibrahim A.", score: "78", avatarBg: "bg-[#4F46E5]" },
    { name: "Grace E.", score: "92", avatarBg: "bg-[#D95B3F]" },
    { name: "David O.", score: "65", avatarBg: "bg-[#059669]" },
    { name: "Maryam S.", score: "88", avatarBg: "bg-[#D97706]" },
    { name: "Joshua U.", score: "74", avatarBg: "bg-[#7C3AED]" },
  ];

  return (
    <div className="w-full max-w-[260px] mx-auto rounded-2xl border-2 border-[#171714] bg-[#FAF7F0] p-2.5 shadow-lg text-[#171714] font-sans select-none">
      {/* Mobile Top Status Bar */}
      <div className="flex justify-between items-center px-1 text-[8px] font-mono text-[#5E594F] mb-2">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <span>5G</span>
          <div className="w-3 h-1.5 border border-[#171714] rounded-sm bg-[#171714]" />
        </div>
      </div>

      {/* App Header */}
      <div className="flex items-center justify-between px-1 mb-2">
        <ArrowLeft size={13} className="text-[#171714]" />
        <span className="font-semibold text-[11px] text-[#171714]">Score Entry</span>
        <Menu size={13} className="text-[#171714]" />
      </div>

      {/* Class & Subject Selector */}
      <div className="space-y-1 mb-2 text-[10px]">
        <div className="flex justify-between items-center bg-[#EFE9DC] px-2 py-1 rounded border border-[#171714]/10">
          <span className="font-mono text-[#171714]">Class: JSS 2A</span>
          <ChevronDown size={11} className="text-[#5E594F]" />
        </div>
        <div className="flex justify-between items-center bg-[#EFE9DC] px-2 py-1 rounded border border-[#171714]/10">
          <span className="font-mono text-[#171714]">Subject: Mathematics</span>
          <ChevronDown size={11} className="text-[#5E594F]" />
        </div>
      </div>

      {/* Term Tabs */}
      <div className="flex justify-between bg-[#E9E3D4] p-0.5 rounded text-[8px] font-mono mb-2">
        <span className="px-2 py-0.5 text-[#5E594F]">Term 1</span>
        <span className="px-2 py-0.5 bg-white font-bold text-[#171714] rounded shadow-xs">Term 2</span>
        <span className="px-2 py-0.5 text-[#5E594F]">Term 3</span>
      </div>

      {/* Student List */}
      <div className="space-y-1.5 mb-3">
        {students.map((st, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-1.5 bg-white border border-[#171714]/10 rounded text-[10px]"
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`w-4 h-4 rounded-full ${st.avatarBg} text-white flex items-center justify-center text-[7px] font-bold`}
              >
                {st.name[0]}
              </div>
              <span className="font-medium text-[#171714]">{st.name}</span>
            </div>
            <div className="w-8 h-5 border border-[#171714]/20 rounded bg-[#FAF7F0] flex items-center justify-center font-mono font-bold text-[10px] text-[#171714]">
              {st.score}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button className="w-full py-1.5 bg-[#171714] text-white rounded text-[10px] font-mono uppercase tracking-wider font-semibold hover:bg-[#333]">
        Save Scores
      </button>
    </div>
  );
};
