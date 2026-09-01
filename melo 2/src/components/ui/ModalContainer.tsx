"use client";

import React, { useState } from "react";
import { sound } from "@/components/audio/SynthesizerEngine";
import { X, CheckCircle, ShieldCheck, Database, Layers, ArrowRight, Clock, Building2 } from "lucide-react";

interface ModalContainerProps {
  demoOpen: boolean;
  exploreOpen: boolean;
  onCloseDemo: () => void;
  onCloseExplore: () => void;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  demoOpen,
  exploreOpen,
  onCloseDemo,
  onCloseExplore,
}) => {
  const [formData, setFormData] = useState({
    institution: "",
    role: "Principal / Head of School",
    students: "500 - 1,500 students",
    email: "",
    phone: "",
    challenge: "Fragmented Academic & Financial Systems",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime(587.33);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    onCloseDemo();
    setTimeout(() => setSubmitted(false), 300);
  };

  if (!demoOpen && !exploreOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={demoOpen ? "demo-modal-title" : "explore-modal-title"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111214]/60 backdrop-blur-sm"
      onClick={() => {
        if (demoOpen) handleResetAndClose();
        if (exploreOpen) onCloseExplore();
      }}
    >
      <div
        className="relative w-full max-w-xl bg-[#F6F3EC] rounded-xl border border-[#D8D3C8] shadow-2xl p-6 sm:p-8 text-[#111214] font-mono-tech max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            sound.playHoverBlip(400);
            if (demoOpen) handleResetAndClose();
            if (exploreOpen) onCloseExplore();
          }}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* DEMO / WALKTHROUGH MODAL */}
        {demoOpen && (
          <div>
            {!submitted ? (
              <>
                <div className="flex items-center gap-2 text-xs text-[#FF5A1F] font-bold tracking-widest uppercase mb-1">
                  <Building2 size={14} />
                  <span>Institutional Consultation</span>
                </div>
                <h3 id="demo-modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-[#111214] mb-2">
                  Schedule a Platform Walkthrough
                </h3>
                <p className="text-xs text-[#6B7075] mb-6 leading-relaxed">
                  Experience how Melo unifies your academic, bursary, admissions, and guardian operations into a single synchronized system.
                </p>

                <form onSubmit={handleSubmitDemo} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                      School / Institution Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Corona Secondary School / Meadow Hall"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                        Your Institutional Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                      >
                        <option>Principal / Head of School</option>
                        <option>Bursar / Financial Director</option>
                        <option>Vice Principal Academics</option>
                        <option>IT Director / Administrator</option>
                        <option>Proprietor / Board Trustee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                        Student Population
                      </label>
                      <select
                        value={formData.students}
                        onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                      >
                        <option>Under 250 students</option>
                        <option>250 - 600 students</option>
                        <option>600 - 1,500 students</option>
                        <option>1,500+ students (Multi-campus)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="principal@school.edu.ng"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#111214] mb-1 uppercase">
                      Primary Operational Bottleneck
                    </label>
                    <select
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] focus:border-[#FF5A1F] focus:outline-none transition-colors"
                    >
                      <option>Fragmented Academic & Financial Systems</option>
                      <option>Manual Broadsheet Compilation & WAEC Delays</option>
                      <option>Unreconciled Tuition Payments & Lost Receipts</option>
                      <option>Chaotic Parent Communication & Disconnected Portals</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-lg bg-[#111214] text-[#F6F3EC] font-semibold text-xs hover:bg-[#FF5A1F] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Confirm Institutional Walkthrough</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#142E28]/10 text-[#142E28] flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-bold font-editorial text-[#111214]">
                  Walkthrough Requested
                </h3>
                <p className="text-xs text-[#6B7075] max-w-md mx-auto leading-relaxed">
                  Thank you. Our institutional systems engineering team will contact{" "}
                  <strong className="text-[#111214]">{formData.email}</strong> within 4 business hours with your dedicated live migration environment.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 rounded-lg bg-[#111214] text-[#F6F3EC] text-xs font-semibold hover:bg-[#FF5A1F] transition-colors"
                  >
                    Return to Experience
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EXPLORE / ARCHITECTURE BLUEPRINT MODAL */}
        {exploreOpen && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#FF5A1F] font-bold tracking-widest uppercase">
              <Database size={14} />
              <span>Technical Blueprint</span>
            </div>
            <h3 id="explore-modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-[#111214]">
              Melo Unified System Architecture
            </h3>
            <p className="text-xs text-[#6B7075] leading-relaxed">
              Melo replaces ad-hoc software stacks with a single relational ledger engine designed specifically for educational institutions.
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8]">
                <div className="flex items-center gap-2 font-bold text-[#111214] mb-1">
                  <Layers size={14} className="text-[#FF5A1F]" />
                  <span>Synchronous State Resolution</span>
                </div>
                <p className="text-[#6B7075] text-[11px]">
                  When a bursary payment settles via Paystack or direct bank transfer, the student’s financial balance, examination clearance status, and guardian portal reflect the updated ledger state instantaneously without batch jobs or manual reconciliation.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8]">
                <div className="flex items-center gap-2 font-bold text-[#111214] mb-1">
                  <ShieldCheck size={14} className="text-[#142E28]" />
                  <span>Curriculum & Broadsheet Integrity Engine</span>
                </div>
                <p className="text-[#6B7075] text-[11px]">
                  Continuous assessment (CA1, CA2, CA3) and examination scores undergo automatic WAEC/NERDC grading conversion, class ranking calculations, and administrative multi-tier approval before terminal publication.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8]">
                <div className="flex items-center gap-2 font-bold text-[#111214] mb-1">
                  <Clock size={14} className="text-[#FF5A1F]" />
                  <span>Zero-Loss Migration Pipeline</span>
                </div>
                <p className="text-[#6B7075] text-[11px]">
                  Legacy spreadsheets and disparate school databases are parsed through Melo&apos;s schema normalizer to reconstitute fragmented historical records into clean relational graphs.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onCloseExplore}
                className="px-5 py-2.5 rounded-lg bg-[#111214] text-[#F6F3EC] text-xs font-semibold hover:bg-[#FF5A1F] transition-colors"
              >
                Close Architecture Blueprint
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
