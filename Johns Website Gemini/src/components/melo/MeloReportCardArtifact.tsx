import React from "react";
import { Download } from "lucide-react";

export const MeloReportCardArtifact: React.FC = () => {
  const subjects = [
    { name: "Mathematics", ca: 32, exam: 50, total: 82, grade: "A" },
    { name: "English Language", ca: 30, exam: 48, total: 78, grade: "B+" },
    { name: "Physics", ca: 28, exam: 42, total: 70, grade: "B" },
    { name: "Chemistry", ca: 26, exam: 45, total: 71, grade: "B" },
    { name: "Biology", ca: 34, exam: 54, total: 88, grade: "A" },
    { name: "Civic Education", ca: 30, exam: 42, total: 72, grade: "B" },
  ];

  return (
    <div className="w-full max-w-[290px] mx-auto rounded-lg border border-[#171714]/20 bg-white p-3 shadow-md text-[#171714] font-sans select-none">
      {/* Header */}
      <div className="flex justify-between items-start pb-2 border-b border-[#171714]/15 mb-2">
        <div>
          <h5 className="font-bold text-[11px] text-[#171714]">Report Card</h5>
          <p className="text-[8px] font-mono text-[#5E594F]">Term 1 2025/2026</p>
        </div>
        <div className="flex items-center gap-1 text-[8px] font-mono border border-[#171714]/15 px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#5E594F]">
          <Download size={8} />
          <span>PDF</span>
        </div>
      </div>

      {/* Student Details */}
      <div className="flex items-center gap-2 mb-2 p-1.5 bg-[#FAF7F0] rounded border border-[#171714]/10">
        <div className="w-6 h-6 rounded-full bg-[#D95B3F] text-white flex items-center justify-center text-[9px] font-bold">
          G
        </div>
        <div>
          <p className="font-bold text-[10px] text-[#171714] leading-tight">Grace E. Ajayi</p>
          <p className="text-[8px] font-mono text-[#5E594F]">JSS 2A • ID: ST-042</p>
        </div>
      </div>

      {/* Subject Grades Table */}
      <table className="w-full text-[8px] mb-2 font-mono">
        <thead>
          <tr className="border-b border-[#171714]/15 text-[#5E594F] text-left">
            <th className="py-0.5 font-normal">Subject</th>
            <th className="py-0.5 text-center font-normal">CA</th>
            <th className="py-0.5 text-center font-normal">Exam</th>
            <th className="py-0.5 text-center font-normal">Total</th>
            <th className="py-0.5 text-right font-normal">Grd</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#171714]/5">
          {subjects.map((s, idx) => (
            <tr key={idx} className="py-0.5">
              <td className="py-0.5 font-sans font-medium text-[#171714] truncate max-w-[80px]">
                {s.name}
              </td>
              <td className="py-0.5 text-center text-[#5E594F]">{s.ca}</td>
              <td className="py-0.5 text-center text-[#5E594F]">{s.exam}</td>
              <td className="py-0.5 text-center font-bold text-[#171714]">{s.total}</td>
              <td className="py-0.5 text-right font-bold text-[#D95B3F]">{s.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance & Teacher Remark */}
      <div className="border-t border-[#171714]/10 pt-1.5 space-y-1 text-[8px]">
        <div className="flex justify-between font-mono">
          <span className="text-[#5E594F]">Attendance:</span>
          <span className="font-bold text-[#171714]">93%</span>
        </div>
        <div>
          <span className="text-[#5E594F] block">Teacher&apos;s Remark:</span>
          <p className="font-hand text-[12px] text-[#171714] font-medium leading-none pt-0.5">
            Good progress. Keep it up!
          </p>
        </div>
      </div>
    </div>
  );
};
