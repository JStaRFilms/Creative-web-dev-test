import React from "react";

interface RevisionStampProps {
  label?: string;
  revision?: string;
  className?: string;
}

export const RevisionStamp: React.FC<RevisionStampProps> = ({
  label = "PROOF 01",
  revision = "rev A",
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Boxed mono proof label */}
      <div className="border border-[#171714] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#171714] bg-[#F1EBDD]">
        {label}
      </div>

      {/* Handwritten red revision mark */}
      {revision && (
        <span className="font-hand text-[18px] md:text-[20px] text-[#D95B3F] font-semibold tracking-wide -rotate-3 select-none">
          {revision}
        </span>
      )}
    </div>
  );
};
