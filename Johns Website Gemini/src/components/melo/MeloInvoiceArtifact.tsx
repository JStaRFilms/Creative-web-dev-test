import React from "react";
import { Check } from "lucide-react";

export const MeloInvoiceArtifact: React.FC = () => {
  return (
    <div className="w-full max-w-[270px] mx-auto rounded-lg border border-[#171714]/20 bg-white p-3 shadow-md text-[#171714] font-sans select-none">
      {/* Header */}
      <div className="flex justify-between items-start pb-2 border-b border-[#171714]/15 mb-2">
        <div>
          <h5 className="font-bold text-[11px] text-[#171714]">Invoice</h5>
          <p className="text-[8px] font-mono text-[#5E594F]">INV-2026-00073</p>
        </div>
        <span className="text-[8px] font-mono font-bold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <Check size={8} />
          <span>PAID</span>
        </span>
      </div>

      {/* Student info */}
      <div className="space-y-1 mb-2.5 text-[9px]">
        <div>
          <span className="text-[8px] font-mono text-[#5E594F] block">Student:</span>
          <span className="font-semibold text-[#171714]">Grace E. Ajayi</span>
        </div>
        <div>
          <span className="text-[8px] font-mono text-[#5E594F] block">Class:</span>
          <span className="text-[#171714]">JSS 2A</span>
        </div>
        <div>
          <span className="text-[8px] font-mono text-[#5E594F] block">Description:</span>
          <span className="text-[#171714]">1st Term School Fees</span>
        </div>
      </div>

      {/* Amount Box */}
      <div className="p-2 bg-[#FAF7F0] border border-[#171714]/10 rounded mb-2">
        <span className="text-[8px] font-mono text-[#5E594F] block">Amount:</span>
        <span className="font-mono font-bold text-[15px] text-[#171714]">₦85,000</span>
      </div>

      {/* Payment info */}
      <div className="space-y-1 text-[8px] font-mono text-[#5E594F] pt-1 border-t border-[#171714]/10">
        <div className="flex justify-between">
          <span>Pay Method:</span>
          <span className="font-medium text-[#171714]">Bank Transfer</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span className="font-medium text-[#171714]">01 Sep 2026</span>
        </div>
        <div className="flex justify-between items-center pt-1 text-[#137333]">
          <span>Receipt sent:</span>
          <span>✓</span>
        </div>
      </div>
    </div>
  );
};
