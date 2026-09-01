import ForestExperience from "@/components/ForestExperience";

export default function Home() {
  return (
    <main className="bg-[#0B0F0D]">
      {/* The scroll-jacked forest is pinned inside ForestExperience (700vh) */}
      <ForestExperience />

      {/* Tail piece — minimal footer after the walk, not a scroll section */}
      <section className="relative bg-[#0B0F0D] border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20 flex flex-col md:flex-row gap-10 justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-[#C86432]">SILVA — HOH VALLEY, WASHINGTON</div>
            <div className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-[#EDE8DE]">Forest time is<br />not slow time.<br />It&apos;s true time.</div>
          </div>
          <div className="grid grid-cols-2 gap-10 font-mono text-[11px] leading-[1.7] tracking-[0.12em] text-white/50">
            <div>
              <div className="text-white/90 mb-2">VISIT</div>
              <div>124 Hoh River Road<br />Forks, WA 98331<br />Get directions →</div>
            </div>
            <div>
              <div className="text-white/90 mb-2">INQUIRIES</div>
              <div>hello@silva.hoh<br />+1 (360) 555 0142<br />Instagram →</div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 pb-8 font-mono text-[10px] tracking-[0.16em] text-white/25 flex justify-between">
          <span>© 2026 SILVA HOH — LEAVE NO TRACE. STAY A WHILE.</span>
          <span>SCROLL ↑ TO RE-ENTER</span>
        </div>
      </section>
    </main>
  );
}
