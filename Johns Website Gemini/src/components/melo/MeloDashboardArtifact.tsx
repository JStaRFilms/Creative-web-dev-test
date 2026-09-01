import React from "react";
import {
  Users,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Bell,
  Search,
  BookOpen,
  CalendarCheck,
  FileText,
  MessageSquare,
  Settings,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export const MeloDashboardArtifact: React.FC = () => {
  return (
    <div className="w-full rounded-lg border border-[#171714]/20 bg-[#FAF7F0] shadow-md overflow-hidden text-[#171714] font-sans select-none">
      {/* Top Header / App Bar */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2.5 bg-[#EFE9DC] border-b border-[#171714]/15">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Melo Logo */}
          <div className="flex items-center gap-1.5 font-sans font-bold text-[14px] md:text-[15px] tracking-tight text-[#171714]">
            <span>melo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
          </div>

          {/* Search bar */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#FAF7F0] px-2.5 py-1 rounded border border-[#171714]/15 text-[11px] text-[#5E594F] w-48 md:w-64">
            <Search size={12} />
            <span className="truncate">Search students, classes, receipts...</span>
          </div>
        </div>

        {/* User & Notifications */}
        <div className="flex items-center gap-3 text-[11px] text-[#5E594F]">
          <Bell size={13} className="text-[#5E594F]" />
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#171714] text-white flex items-center justify-center text-[9px] font-bold">
              A
            </div>
            <span className="hidden md:inline font-medium text-[#171714]">Admin Desk</span>
          </div>
        </div>
      </div>

      {/* Main App Layout: Sidebar + Overview Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
        {/* Sidebar */}
        <aside className="hidden md:flex md:col-span-3 bg-[#E9E3D4] border-r border-[#171714]/15 p-3 flex-col justify-between text-[11px]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#171714] text-white font-medium">
              <TrendingUp size={13} />
              <span>Overview</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <Users size={13} />
              <span>Students</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <GraduationCap size={13} />
              <span>Classes</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <BookOpen size={13} />
              <span>Academics</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <CreditCard size={13} />
              <span>Fees & Billing</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <CalendarCheck size={13} />
              <span>Attendance</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <FileText size={13} />
              <span>Reports</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded text-[#5E594F] hover:bg-[#FAF7F0]/60">
              <MessageSquare size={13} />
              <span>Messages</span>
            </div>
          </div>

          <div className="border-t border-[#171714]/15 pt-2 text-[10px] text-[#5E594F]">
            <p className="font-semibold text-[#171714]">NYANYA MODEL SCH.</p>
            <p>Term 2 • 2025/2026</p>
          </div>
        </aside>

        {/* Dashboard Main Content */}
        <main className="md:col-span-9 p-3 md:p-4 space-y-4 bg-[#FAF7F0]">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[13px] md:text-[14px] text-[#171714]">
              System Overview
            </h4>
            <span className="text-[10px] font-mono text-[#5E594F] bg-[#EFE9DC] px-2 py-0.5 rounded">
              REAL-TIME SYNC
            </span>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            <div className="p-2.5 bg-white border border-[#171714]/10 rounded">
              <p className="text-[10px] text-[#5E594F]">Total Students</p>
              <p className="font-bold text-[16px] md:text-[18px] text-[#171714]">1,248</p>
              <p className="text-[9px] text-[#34A853] font-medium">+4.2% this term</p>
            </div>
            <div className="p-2.5 bg-white border border-[#171714]/10 rounded">
              <p className="text-[10px] text-[#5E594F]">Classes</p>
              <p className="font-bold text-[16px] md:text-[18px] text-[#171714]">42</p>
              <p className="text-[9px] text-[#34A853] font-medium">+1 new stream</p>
            </div>
            <div className="p-2.5 bg-white border border-[#171714]/10 rounded">
              <p className="text-[10px] text-[#5E594F]">Pending Fees</p>
              <p className="font-bold text-[16px] md:text-[18px] text-[#D95B3F]">₦1.84M</p>
              <p className="text-[9px] text-[#5E594F]">12 unpaid invoices</p>
            </div>
            <div className="p-2.5 bg-white border border-[#171714]/10 rounded">
              <p className="text-[10px] text-[#5E594F]">Attendance</p>
              <p className="font-bold text-[16px] md:text-[18px] text-[#171714]">92%</p>
              <p className="text-[9px] text-[#5E594F]">• This month</p>
            </div>
          </div>

          {/* Split Chart + Activities */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
            {/* Attendance Chart */}
            <div className="sm:col-span-7 p-3 bg-white border border-[#171714]/10 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#171714]">Attendance Overview</span>
                <span className="text-[9px] font-mono text-[#5E594F] bg-[#FAF7F0] px-1.5 py-0.5 rounded border border-[#171714]/10">
                  This Term ▾
                </span>
              </div>
              <div className="h-20 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  {/* Subtle Grid Lines */}
                  <line x1="0" y1="15" x2="200" y2="15" stroke="#EFE9DC" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="0" y1="35" x2="200" y2="35" stroke="#EFE9DC" strokeWidth="1" strokeDasharray="2,2" />
                  {/* Attendance Trend Curve */}
                  <path
                    d="M 10 40 Q 40 10 70 30 T 130 18 T 190 22"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Curve nodes */}
                  <circle cx="10" cy="40" r="2.5" fill="#4F46E5" />
                  <circle cx="70" cy="30" r="2.5" fill="#4F46E5" />
                  <circle cx="130" cy="18" r="2.5" fill="#4F46E5" />
                  <circle cx="190" cy="22" r="2.5" fill="#4F46E5" />
                </svg>
              </div>
              <div className="flex justify-between text-[8px] font-mono text-[#5E594F] px-1 pt-1">
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
                <span>JUL</span>
                <span>AUG</span>
                <span>SEP</span>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="sm:col-span-5 p-3 bg-white border border-[#171714]/10 rounded flex flex-col justify-between text-[10px]">
              <span className="font-semibold text-[11px] text-[#171714] mb-1">Recent Activities</span>
              <ul className="space-y-1.5 text-[9px] text-[#5E594F]">
                <li className="flex items-start justify-between">
                  <span>• New invoice generated (JSS 2A)</span>
                  <span className="font-mono text-[#8E887E]">2m</span>
                </li>
                <li className="flex items-start justify-between">
                  <span>• Score entry finalized (Physics)</span>
                  <span className="font-mono text-[#8E887E]">15m</span>
                </li>
                <li className="flex items-start justify-between">
                  <span>• Student enrolled: Grace E.</span>
                  <span className="font-mono text-[#8E887E]">1h</span>
                </li>
                <li className="flex items-start justify-between">
                  <span>• Paystack payment: ₦85,000</span>
                  <span className="font-mono text-[#8E887E]">2h</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Fees Collection Bar */}
          <div className="p-2.5 bg-white border border-[#171714]/10 rounded flex items-center justify-between text-[10px]">
            <div>
              <span className="font-medium text-[#171714]">Fees Collection: </span>
              <span className="font-mono font-semibold text-[#171714]">₦4,380,000</span>
              <span className="text-[#5E594F]"> of ₦6,500,000 (67%)</span>
            </div>
            <span className="font-mono text-[9px] font-medium text-[#4F46E5] cursor-pointer">
              VIEW FULL REPORT →
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};
