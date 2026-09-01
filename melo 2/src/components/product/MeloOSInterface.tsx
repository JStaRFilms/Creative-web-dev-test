"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  Receipt, 
  UserCheck, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  Search,
  ShieldCheck,
  Zap,
  BookOpen,
  CreditCard,
  Send,
  Sparkles
} from "lucide-react";
import { sound } from "@/components/audio/SynthesizerEngine";

type TabType = "academics" | "finance" | "admissions" | "curriculum" | "communication";

export const MeloOSInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("academics");
  
  // Authentic Academic state
  const [students, setStudents] = useState([
    { id: "ST-2026-041", name: "Amara Okonjo", ca1: 9, ca2: 10, ca3: 9, exam: 64, grade: "A1", status: "Published" },
    { id: "ST-2026-042", name: "Tunde Bakare", ca1: 8, ca2: 7, ca3: 9, exam: 58, grade: "B2", status: "Published" },
    { id: "ST-2026-043", name: "Chisom Eze", ca1: 10, ca2: 10, ca3: 9, exam: 68, grade: "A1", status: "Pending Review" },
    { id: "ST-2026-044", name: "Zainab Bello", ca1: 7, ca2: 8, ca3: 7, exam: 52, grade: "B3", status: "Published" },
  ]);

  // Authentic Finance state (Paystack & Naira billing)
  const [balanceDue, setBalanceDue] = useState(185000);
  const [isReconciled, setIsReconciled] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);

  // Authentic Admissions state
  const [applicantStage, setApplicantStage] = useState<"review" | "tested" | "accepted" | "enrolled">("accepted");

  // Authentic Curriculum Intelligence state
  const [curriculumUnits, setCurriculumUnits] = useState([
    { week: "Week 1", topic: "Kinematics & Projectile Motion", status: "Approved", evidence: "Page 14 (WAEC Physics Syllabus)" },
    { week: "Week 2", topic: "Newton's Laws & Momentum Conservation", status: "Approved", evidence: "Page 18 (NERDC Curriculum)" },
    { week: "Week 3", topic: "Work, Energy & Gravitational Potential", status: "Pending HOD Sign-off", evidence: "Page 22 (Scheme of Work 2025/2026)" },
  ]);

  // Authentic Communication state
  const [messages, setMessages] = useState([
    { sender: "Admin Desk", text: "2025/2026 Session Term 2 broadsheets compiled and verified for SS 2 Diamond.", time: "09:14 AM" },
    { sender: "Parent Portal (Mrs. Okonjo)", text: "Received Amara's physics terminal report and Paystack receipt. Verified.", time: "09:32 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handlePublishGrade = (id: string) => {
    sound.playHoverBlip(720);
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Published" } : s))
    );
  };

  const handleSimulatePayment = () => {
    if (balanceDue === 0) return;
    sound.playChime();
    setBalanceDue(0);
    setIsReconciled(true);
    setReceiptNumber(`PAY-NG-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleApproveCurriculum = (week: string) => {
    sound.playHoverBlip(680);
    setCurriculumUnits((prev) =>
      prev.map((u) => (u.week === week ? { ...u, status: "Approved" } : u))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sound.playTick(480, 0.05);
    setMessages((prev) => [
      ...prev,
      { sender: "You (Vice Principal Academics)", text: newMessage, time: "Just now" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border border-[#D8D3C8] bg-[#FAF8F5] shadow-2xl overflow-hidden text-[#111214] font-mono-tech">
      {/* OS Header & System Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#EFEBE1] border-b border-[#D8D3C8] gap-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D8D3C8] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#142E28] inline-block"></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
            <span>MELO INSTITUTIONAL OS</span>
            <span className="text-[#6B7075] font-normal text-[10px]">v4.2.0-PROD</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#6B7075]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#142E28]"></span>
            DB: SYNCHRONIZED
          </span>
          <span className="hidden sm:inline-block">|</span>
          <span className="hidden sm:inline-block">TERM 2: 2025/2026</span>
        </div>
      </div>

      {/* OS Navigation Tabs */}
      <div className="flex items-center overflow-x-auto bg-[#F6F3EC] border-b border-[#D8D3C8] px-2 py-1 gap-1 text-xs">
        <button
          onClick={() => {
            sound.playHoverBlip(500);
            setActiveTab("academics");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            activeTab === "academics"
              ? "bg-[#FAF8F5] text-[#111214] font-bold shadow-sm border border-[#D8D3C8]"
              : "text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1]"
          }`}
        >
          <GraduationCap size={14} className={activeTab === "academics" ? "text-[#FF5A1F]" : ""} />
          <span>Academic Broadsheet</span>
        </button>

        <button
          onClick={() => {
            sound.playHoverBlip(550);
            setActiveTab("finance");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            activeTab === "finance"
              ? "bg-[#FAF8F5] text-[#111214] font-bold shadow-sm border border-[#D8D3C8]"
              : "text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1]"
          }`}
        >
          <Receipt size={14} className={activeTab === "finance" ? "text-[#142E28]" : ""} />
          <span>Paystack Bursary</span>
        </button>

        <button
          onClick={() => {
            sound.playHoverBlip(600);
            setActiveTab("admissions");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            activeTab === "admissions"
              ? "bg-[#FAF8F5] text-[#111214] font-bold shadow-sm border border-[#D8D3C8]"
              : "text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1]"
          }`}
        >
          <UserCheck size={14} className={activeTab === "admissions" ? "text-[#FF5A1F]" : ""} />
          <span>Admissions Funnel</span>
        </button>

        <button
          onClick={() => {
            sound.playHoverBlip(650);
            setActiveTab("curriculum");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            activeTab === "curriculum"
              ? "bg-[#FAF8F5] text-[#111214] font-bold shadow-sm border border-[#D8D3C8]"
              : "text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1]"
          }`}
        >
          <BookOpen size={14} className={activeTab === "curriculum" ? "text-[#142E28]" : ""} />
          <span>WAEC / NERDC Schemes</span>
        </button>

        <button
          onClick={() => {
            sound.playHoverBlip(700);
            setActiveTab("communication");
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            activeTab === "communication"
              ? "bg-[#FAF8F5] text-[#111214] font-bold shadow-sm border border-[#D8D3C8]"
              : "text-[#6B7075] hover:text-[#111214] hover:bg-[#EFEBE1]"
          }`}
        >
          <MessageSquare size={14} className={activeTab === "communication" ? "text-[#FF5A1F]" : ""} />
          <span>Institutional Stream</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-6 min-h-[380px]">
        {/* TAB 1: ACADEMICS & BROADSHEET */}
        {activeTab === "academics" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D3C8]">
              <div>
                <h4 className="text-sm font-bold text-[#111214]">Senior Secondary 2 (Diamond) — Physics Broadsheet</h4>
                <p className="text-[11px] text-[#6B7075]">Subject Lead: Dr. E. Adeyemi • Weighting: CA (30%) + Exam (70%)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-1 rounded bg-[#142E28]/10 text-[#142E28] font-semibold">
                  WAEC Standard Grading
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D8D3C8] text-[#6B7075] text-[10px] uppercase">
                    <th className="py-2 px-3">Student ID</th>
                    <th className="py-2 px-3">Student Name</th>
                    <th className="py-2 px-2 text-center">CA1 (10)</th>
                    <th className="py-2 px-2 text-center">CA2 (10)</th>
                    <th className="py-2 px-2 text-center">CA3 (10)</th>
                    <th className="py-2 px-2 text-center">Exam (70)</th>
                    <th className="py-2 px-2 text-center font-bold">Total</th>
                    <th className="py-2 px-2 text-center font-bold">Grade</th>
                    <th className="py-2 px-3 text-right">Status / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8D3C8]/60">
                  {students.map((s) => {
                    const total = s.ca1 + s.ca2 + s.ca3 + s.exam;
                    return (
                      <tr key={s.id} className="hover:bg-[#EFEBE1]/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-[#FF5A1F]">{s.id}</td>
                        <td className="py-2.5 px-3 font-medium text-[#111214]">{s.name}</td>
                        <td className="py-2.5 px-2 text-center">{s.ca1}</td>
                        <td className="py-2.5 px-2 text-center">{s.ca2}</td>
                        <td className="py-2.5 px-2 text-center">{s.ca3}</td>
                        <td className="py-2.5 px-2 text-center font-medium">{s.exam}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-[#111214]">{total}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-[#111214] text-[#FAF8F5] text-[10px] font-bold">
                            {s.grade}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {s.status === "Published" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#142E28] font-semibold">
                              <CheckCircle2 size={12} />
                              Published
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePublishGrade(s.id)}
                              className="px-2.5 py-1 rounded bg-[#FF5A1F] text-white text-[10px] font-semibold hover:bg-[#111214] transition-colors"
                            >
                              Publish Result
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#EFEBE1] rounded-lg border border-[#D8D3C8] flex items-center justify-between text-xs">
              <span className="text-[#6B7075]">Class Average: <strong className="text-[#111214]">87.25% (A1 Distinction)</strong></span>
              <span className="text-[10px] text-[#6B7075]">Parent Portal Sync: <strong className="text-[#142E28]">Live</strong></span>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCE & PAYSTACK BURSARY */}
        {activeTab === "finance" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D3C8]">
              <div>
                <h4 className="text-sm font-bold text-[#111214]">Bursary & Paystack Payment Reconciliation</h4>
                <p className="text-[11px] text-[#6B7075]">Student: Amara Okonjo (ST-2026-041) • SS 2 Diamond</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] px-2.5 py-1 rounded font-semibold ${
                  balanceDue === 0 ? "bg-[#142E28]/15 text-[#142E28]" : "bg-[#FF5A1F]/15 text-[#FF5A1F]"
                }`}>
                  {balanceDue === 0 ? "LEDGER RECONCILED (₦0.00)" : "OUTSTANDING BALANCE"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] space-y-3">
                <h5 className="text-xs font-bold text-[#111214] uppercase tracking-wider">Fee Breakdown (Term 2)</h5>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7075]">Tuition & Academic Facility</span>
                    <span className="font-semibold">₦140,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7075]">STEM Laboratory & Robotics Levy</span>
                    <span className="font-semibold">₦25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7075]">PTA & Health Insurance</span>
                    <span className="font-semibold">₦20,000</span>
                  </div>
                  <div className="pt-2 border-t border-[#D8D3C8] flex justify-between font-bold text-sm">
                    <span>Total Amount Due</span>
                    <span className={balanceDue === 0 ? "text-[#142E28] line-through" : "text-[#FF5A1F]"}>
                      ₦185,000
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] flex flex-col justify-between space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-[#111214] uppercase tracking-wider mb-2">Automated Paystack Hook</h5>
                  {isReconciled ? (
                    <div className="space-y-1.5 text-xs text-[#142E28]">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 size={14} />
                        <span>Paystack Transaction Verified</span>
                      </div>
                      <p className="text-[11px] text-[#6B7075]">Receipt Number: <strong className="text-[#111214]">{receiptNumber}</strong></p>
                      <p className="text-[11px] text-[#6B7075]">Exam Hall Clearance: <strong className="text-[#142E28]">Granted (Pass #902)</strong></p>
                      <p className="text-[11px] text-[#6B7075]">Parent SMS / Email Receipt: <strong className="text-[#142E28]">Dispatched</strong></p>
                    </div>
                  ) : (
                    <p className="text-xs text-[#6B7075] leading-relaxed">
                      Click below to simulate an incoming Paystack tuition payment. Melo immediately reconciles the ledger, grants examination clearance, and sends cryptographic proof of payment to the parent.
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={balanceDue === 0}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    balanceDue === 0
                      ? "bg-[#142E28] text-white cursor-default"
                      : "bg-[#111214] text-[#FAF8F5] hover:bg-[#FF5A1F]"
                  }`}
                >
                  <CreditCard size={14} />
                  <span>{balanceDue === 0 ? "Payment Settled & Reconciled" : "Simulate Paystack Fee Payment"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADMISSIONS FUNNEL */}
        {activeTab === "admissions" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D3C8]">
              <div>
                <h4 className="text-sm font-bold text-[#111214]">2026/2027 Admissions Pipeline</h4>
                <p className="text-[11px] text-[#6B7075]">Automated workflow: Applicant → Entrance Exam → Acceptance → Student Record</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div
                onClick={() => setApplicantStage("review")}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  applicantStage === "review" ? "bg-[#111214] text-[#FAF8F5] border-[#111214]" : "bg-[#FAF8F5] border-[#D8D3C8] text-[#111214]"
                }`}
              >
                <div className="text-lg font-bold">142</div>
                <div className="text-[10px] uppercase font-semibold">1. Applications</div>
              </div>
              <div
                onClick={() => setApplicantStage("tested")}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  applicantStage === "tested" ? "bg-[#111214] text-[#FAF8F5] border-[#111214]" : "bg-[#FAF8F5] border-[#D8D3C8] text-[#111214]"
                }`}
              >
                <div className="text-lg font-bold">89</div>
                <div className="text-[10px] uppercase font-semibold">2. CBT Tested</div>
              </div>
              <div
                onClick={() => setApplicantStage("accepted")}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  applicantStage === "accepted" ? "bg-[#111214] text-[#FAF8F5] border-[#111214]" : "bg-[#FAF8F5] border-[#D8D3C8] text-[#111214]"
                }`}
              >
                <div className="text-lg font-bold">34</div>
                <div className="text-[10px] uppercase font-semibold">3. Offer Accepted</div>
              </div>
              <div
                onClick={() => setApplicantStage("enrolled")}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  applicantStage === "enrolled" ? "bg-[#142E28] text-white border-[#142E28]" : "bg-[#FAF8F5] border-[#D8D3C8] text-[#111214]"
                }`}
              >
                <div className="text-lg font-bold">31</div>
                <div className="text-[10px] uppercase font-semibold">4. Fully Enrolled</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111214]">Featured Candidate: Kenechukwu Obi (App #ADM-26-088)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF5A1F]/15 text-[#FF5A1F] font-semibold">
                  Target: JS 1 Emerald
                </span>
              </div>
              <p className="text-[#6B7075] text-[11px]">
                Entrance CBT Score: <strong className="text-[#111214]">94/100 (Mathematics & Verbal)</strong> • Medical Clearance: <strong className="text-[#142E28]">Verified</strong>
              </p>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    sound.playChime(659.25);
                    setApplicantStage("enrolled");
                  }}
                  className="px-3 py-1.5 rounded bg-[#111214] text-white text-xs font-semibold hover:bg-[#FF5A1F] transition-colors"
                >
                  Generate Official Student ID & Class Placement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CURRICULUM & SCHEMES */}
        {activeTab === "curriculum" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D3C8]">
              <div>
                <h4 className="text-sm font-bold text-[#111214]">NERDC & WAEC Curriculum Verification</h4>
                <p className="text-[11px] text-[#6B7075]">Physics (SS 2) Scheme of Work Alignment</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {curriculumUnits.map((u) => (
                <div
                  key={u.week}
                  className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111214]">{u.week}: {u.topic}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7075]">Curriculum Citation: {u.evidence}</p>
                  </div>

                  <div>
                    {u.status === "Approved" ? (
                      <span className="inline-flex items-center gap-1 text-[#142E28] font-semibold text-[11px]">
                        <CheckCircle2 size={13} />
                        HOD Signed Off
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApproveCurriculum(u.week)}
                        className="px-3 py-1 rounded bg-[#FF5A1F] text-white text-xs font-semibold hover:bg-[#111214] transition-colors"
                      >
                        Sign-off Week
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMMUNICATION STREAM */}
        {activeTab === "communication" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D3C8]">
              <div>
                <h4 className="text-sm font-bold text-[#111214]">Unified Institutional Communication Stream</h4>
                <p className="text-[11px] text-[#6B7075]">Direct synchronized dispatch across Administration, Teachers, and Guardians</p>
              </div>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] text-xs">
                  <div className="flex justify-between items-center text-[10px] text-[#6B7075] mb-1">
                    <span className="font-bold text-[#111214]">{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="text-[#111214]">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Broadcast instant academic or financial update to SS 2 parents..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-[#FAF8F5] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#FF5A1F]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#111214] text-white text-xs font-semibold hover:bg-[#FF5A1F] transition-colors flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* OS Footer Telemetry Bar */}
      <div className="px-4 py-2.5 bg-[#EFEBE1] border-t border-[#D8D3C8] flex flex-wrap items-center justify-between text-[10px] text-[#6B7075]">
        <div className="flex items-center gap-3">
          <span>INSTITUTION: Corona Secondary</span>
          <span>CAMPUS ID: NG-LOS-042</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={11} className="text-[#FF5A1F]" />
          <span>REALTIME SYNCHRONIZATION ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
