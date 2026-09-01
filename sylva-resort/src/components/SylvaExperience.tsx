"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// dynamically import R3F to avoid SSR
const ForestCanvas = dynamic(() => import("./ForestCanvas"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function mapRange(inMin: number, inMax: number, outMin: number, outMax: number, v: number) {
  if (v <= inMin) return outMin;
  if (v >= inMax) return outMax;
  return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export default function SylvaExperience() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lenis + GSAP ticker unification
  useEffect(() => {
    let lenis: any = null;
    let rafId = 0;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
        infinite: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      // cleanup
      return () => {
        gsap.ticker.remove(ticker);
      };
    })();

    // progress ScrollTrigger — pinned 700vh
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 7}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
        // markers: true,
      });

      // stagger initial load reveal
      gsap.fromTo(
        ".reveal-load",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    });

    // mouse
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);

    const t = setTimeout(() => setLoaded(true), 600);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(t);
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      if (lenis) lenis.destroy();
    };
  }, []);

  // Derived per-shot opacities / transforms
  const shots = useMemo(() => {
    const p = progress;

    // helper: shot active range returns 0-1 in, sustain, 0-1 out
    const shot = (a: number, b: number, fadeIn = 0.04, fadeOut = 0.04) => {
      if (p < a - fadeIn || p > b + fadeOut) return 0;
      if (p < a) return mapRange(a - fadeIn, a, 0, 1, p);
      if (p > b) return mapRange(b, b + fadeOut, 1, 0, p);
      return 1;
    };
    const local = (a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

    return {
      s1: { o: shot(0, 0.15), t: local(0, 0.15) },
      s2: { o: shot(0.14, 0.30), t: local(0.14, 0.30) },
      s3: { o: shot(0.29, 0.44), t: local(0.29, 0.44) },
      s4: { o: shot(0.43, 0.58), t: local(0.43, 0.58) },
      s5: { o: shot(0.57, 0.72), t: local(0.57, 0.72) },
      s6: { o: shot(0.71, 0.86), t: local(0.71, 0.86) },
      s7: { o: shot(0.85, 1.02), t: local(0.85, 1.02) },
    };
  }, [progress]);

  const progressPct = Math.round(progress * 100);

  return (
    <div ref={trackRef} className="relative w-full">
      {/* NAV — z-index 100 */}
      <nav className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 md:px-8 py-5 md:py-6 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="h-8 w-8 rounded-[9px] bg-[#E8E6DE] flex items-center justify-center">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0D1A14] -translate-y-px">◈</span>
          </div>
          <span className="font-serif text-[17px] tracking-[0.14em] font-[500] text-[#E8E6DE]">SYLVA</span>
          <span className="hidden md:inline text-[10px] tracking-[0.22em] text-[#E8E6DE]/55 ml-2 font-mono">HOH · WASHINGTON</span>
        </div>

        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          <span className="text-[11px] tracking-[0.18em] text-[#E8E6DE]/60 font-mono mr-3">
            {String(progressPct).padStart(2, "0")} — 100
          </span>
          <a href="#reserve" className="h-9 px-5 rounded-full bg-[#E8E6DE] text-[#0D1A14] text-[11px] tracking-[0.16em] font-medium flex items-center hover:bg-white transition">
            RESERVE
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden pointer-events-auto h-9 w-9 rounded-full bg-[#E8E6DE]/10 backdrop-blur border border-white/15 flex items-center justify-center"
          aria-label="Menu"
        >
          <span className="block w-3.5 h-px bg-[#E8E6DE] shadow-[0_5px_0_#E8E6DE,0_-5px_0_#E8E6DE]" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#0D1A14]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-6 text-[#E8E6DE]/60">✕</button>
          {["JOURNEY", "CABINS", "ONSEN", "RESERVE"].map((l) => (
            <a key={l} className="font-serif text-3xl tracking-wide text-[#E8E6DE]" href="#" onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* PROGRESS BAR + WORLD INDICATOR */}
      <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-[80] hidden md:flex flex-col items-center gap-3">
        <span className="text-[9px] tracking-[0.2em] text-white/45 font-mono [writing-mode:vertical-lr]">SCROLL TO JOURNEY</span>
        <div className="h-[28vh] w-px bg-white/15 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full bg-[#E8E6DE] transition-none" style={{ height: `${progress * 100}%` }} />
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "THRESHOLD", active: progress < 0.29 },
            { label: "SHELTER", active: progress >= 0.29 && progress < 0.57 },
            { label: "ELEMENTS", active: progress >= 0.57 && progress < 0.85 },
            { label: "RETURN", active: progress >= 0.85 },
          ].map((s) => (
            <span key={s.label} className={`text-[9px] tracking-[0.18em] font-mono ${s.active ? "text-[#E8E6DE]" : "text-white/25"}`}>● {s.label}</span>
          ))}
        </div>
      </div>

      {/* PINNED VIEWPORT — 100svh, strata: base webgl z-10, DOM UI z-20 */}
      <div
        ref={pinRef}
        className="relative h-[100svh] w-full overflow-hidden bg-[#0D1A14] flex flex-col"
        style={{ perspective: "1200px" }}
      >
        {/* WebGL Base — z-10 */}
        <div className="absolute inset-0 z-[1]">
          <ForestCanvas progress={progress} mouse={mouse} />
          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(13,26,20,0.55)_78%,rgba(13,26,20,0.85)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* CENTER STAGE DOM — z-20 */}
        <div className="relative z-20 flex-1 flex flex-col pointer-events-none">
          {/* TOP EYEBROW — persistent but morphs */}
          <div className="absolute top-[74px] md:top-[88px] inset-x-0 flex justify-center">
            <div
              className="reveal-load flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md"
              style={{ opacity: loaded ? 1 : 0 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#8A9B6E] animate-pulse" />
              <span className="text-[10px] tracking-[0.22em] text-[#E8E6DE]/80 font-mono">EST. 2026 · 12 CABINS · OFF-GRID</span>
              <span className="hidden md:inline text-[10px] tracking-[0.16em] text-white/40 font-mono">— HOH RAINFOREST</span>
            </div>
          </div>

          {/* SHOT 1 — Threshold */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{
              opacity: shots.s1.o,
              transform: `translateY(${(1 - shots.s1.o) * 14}px) scale(${0.98 + shots.s1.o * 0.02})`,
              pointerEvents: shots.s1.o > 0.5 ? "auto" : "none",
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] text-[#8A9B6E] mb-4">SHOT 01 — THE THRESHOLD</p>
            <h1 className="font-serif font-[300] leading-[0.92] tracking-[-0.03em] text-[#E8E6DE] text-[42px] md:text-[72px] lg:text-[84px] max-w-[14ch]">
              What if the
              <br />
              <span className="italic font-[400] text-[#CFC9B8]">forest kept</span>
              <br />a room for you?
            </h1>
            <p className="mt-6 max-w-[36ch] text-[13px] md:text-[14px] leading-relaxed text-[#E8E6DE]/62 font-light">
              No road in. No signal out. SYLVA is twelve cabins dispersed across 800 acres of Hoh old-growth — where
              the loudest sound is moss growing.
            </p>
            <div className="mt-8 flex items-center gap-2 text-[10px] tracking-[0.18em] font-mono text-white/45">
              <span className="h-px w-10 bg-white/20" />
              SCROLL TO ENTER
              <span className="h-px w-10 bg-white/20" />
            </div>
          </div>

          {/* SHOT 2 — Cabin */}
          <div
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-6 md:px-16 lg:px-24"
            style={{
              opacity: shots.s2.o,
              transform: `translateY(${(1 - shots.s2.o) * 18}px)`,
              pointerEvents: shots.s2.o > 0.5 ? "auto" : "none",
            }}
          >
            <div className="flex-1 max-w-[560px] text-center md:text-left">
              <p className="font-mono text-[11px] tracking-[0.32em] text-[#8A9B6E] mb-3">SHOT 02 — SHELTER</p>
              <h2 className="font-serif text-[36px] md:text-[54px] leading-[0.95] tracking-[-0.02em] text-[#E8E6DE]">
                Architecture
                <br />
                <span className="italic text-[#CFC9B8]">that disappears.</span>
              </h2>
              <p className="mt-4 text-[13.5px] leading-relaxed text-[#E8E6DE]/64 max-w-[42ch]">
                Cedar, glass, and basalt. Built on stilts above the fern floor so the forest moves underneath you.
                Heated by the same spring you&apos;ll bathe in.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {["Off-grid solar", "Spring-fed", "No foundations"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/7 border border-white/10 text-[11px] tracking-wide text-[#E8E6DE]/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* side card — animated in */}
            <div
              className="w-full max-w-[320px] md:w-[340px] rounded-[20px] overflow-hidden bg-[#E8E6DE]/[0.06] backdrop-blur-xl border border-white/10"
              style={{
                transform: `translateX(${clamp((0.5 - shots.s2.t) * 40, -40, 40)}px) rotateY(${(0.5 - shots.s2.t) * 8}deg)`,
                opacity: shots.s2.o,
              }}
            >
              <div className="p-5 md:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/45 mb-3">CABIN 07 — CEDAR</p>
                <div className="flex items-end justify-between">
                  <p className="font-serif text-[28px] leading-none text-[#E8E6DE]">24 m²</p>
                  <p className="text-[11px] text-white/55 font-mono">Sleeps 2 · 1 bath</p>
                </div>
                <div className="mt-4 h-px bg-white/10" />
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "GLASS", v: "73%" },
                    { k: "WOOD", v: "100%" },
                    { k: "LIGHT", v: "∞" },
                  ].map((m) => (
                    <div key={m.k}>
                      <p className="font-serif text-[18px] text-[#E8E6DE]">{m.v}</p>
                      <p className="text-[9px] tracking-[0.16em] text-white/40 font-mono">{m.k}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-24 bg-gradient-to-t from-[#0D1A14]/60 to-transparent relative flex items-end p-4">
                <p className="text-[11px] leading-snug text-white/70">Floor-to-ceiling glass faces north — the forest side. No curtains.</p>
              </div>
            </div>
          </div>

          {/* SHOT 3 — Scale */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{
              opacity: shots.s3.o,
              transform: `translateY(${(1 - shots.s3.o) * 16}px)`,
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] text-[#8A9B6E] mb-6">SHOT 03 — SCALE</p>
            <div className="flex flex-wrap items-end justify-center gap-6 md:gap-10">
              {[
                { n: "12", label: "cabins", sub: "1 per 67 acres" },
                { n: "800", label: "acres", sub: "old-growth protected" },
                { n: "0", label: "roads", sub: "hike or horseback only" },
              ].map((stat) => (
                <div key={stat.label} className="min-w-[120px] md:min-w-[160px]">
                  <p className="font-serif text-[56px] md:text-[84px] leading-none tracking-[-0.04em] text-[#E8E6DE]">{stat.n}</p>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-[#8A9B6E] mt-1">{stat.label.toUpperCase()}</p>
                  <p className="text-[11px] text-white/45 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[52ch] text-[13px] leading-relaxed text-[#E8E6DE]/60">
              The most luxurious thing we built is <span className="text-[#E8E6DE]">absence</span>. Fewer cabins than trails. More owls than guests.
            </p>
          </div>

          {/* SHOT 4 — Fire & Water */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{
              opacity: shots.s4.o,
              transform: `translateY(${(1 - shots.s4.o) * 18}px)`,
            }}
          >
            <div className="max-w-[760px] w-full grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-center">
              <div className="text-center md:text-left">
                <p className="font-mono text-[11px] tracking-[0.32em] text-[#9BB5C2] mb-3">SHOT 04 — FIRE & WATER</p>
                <h2 className="font-serif text-[32px] md:text-[44px] leading-[0.96] text-[#E8E6DE]">
                  42° water.
                  <br />
                  <span className="italic text-[#9BB5C2]">−4° forest.</span>
                </h2>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[#E8E6DE]/65">
                  Each cabin&apos;s private onsen is fed by the Hoh spring. Steam rises through cedar, snow settles on your
                  hair. You are warm because the mountain is warm.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9BB5C2]/15 border border-[#9BB5C2]/20">
                  <span className="h-2 w-2 rounded-full bg-[#9BB5C2] animate-pulse" />
                  <span className="text-[11px] tracking-wide text-[#E8E6DE]/80">Open year-round · even in snowfall</span>
                </div>
              </div>

              <div className="rounded-[20px] overflow-hidden bg-gradient-to-b from-[#0F2A2E] to-[#0D1A14] border border-white/10 p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-white/45">ONSEN TEMP</p>
                    <p className="font-serif text-3xl text-[#E8E6DE] mt-1">
                      42<span className="text-lg align-super">°C</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-white/45">AIR</p>
                    <p className="font-serif text-xl text-[#9BB5C2] mt-1">−4°C</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-[#9BB5C2] to-[#C96A2B] w-[78%]" />
                </div>
                <p className="mt-3 text-[11px] leading-snug text-white/55">Mineral: silica · sulphur · magnesium. No chlorine. No jets. Just stone and heat.</p>
              </div>
            </div>
          </div>

          {/* SHOT 5 — Three Worlds */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10"
            style={{
              opacity: shots.s5.o,
              transform: `translateY(${(1 - shots.s5.o) * 14}px)`,
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] text-[#A8C090] mb-3">SHOT 05 — THREE WORLDS · ONE FOREST</p>
            <h2 className="font-serif text-[28px] md:text-[42px] leading-tight text-center text-[#E8E6DE] max-w-[18ch]">
              You don&apos;t visit <span className="italic text-[#A8C090]">one</span> forest. You move through three.
            </h2>

            <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-[980px]">
              {[
                {
                  title: "Canopy",
                  subtitle: "12 — 40m",
                  desc: "Walk the suspended nets. Sleep above the fog line where barred owls hunt.",
                  activeFrom: 0.57,
                  activeTo: 0.63,
                  accent: "#8A9B6E",
                },
                {
                  title: "Forest Floor",
                  subtitle: "0 — 2m",
                  desc: "Fern, moss, nurse logs. The cabins float here. Everything decomposes and returns.",
                  activeFrom: 0.63,
                  activeTo: 0.69,
                  accent: "#CFC9B8",
                },
                {
                  title: "River",
                  subtitle: "Water",
                  desc: "The Hoh braids cold and fast. Drink it. Bathe in it. Listen to it at night.",
                  activeFrom: 0.69,
                  activeTo: 0.75,
                  accent: "#9BB5C2",
                },
              ].map((w) => {
                const localActive = progress >= w.activeFrom && progress < w.activeTo;
                return (
                  <div
                    key={w.title}
                    className={`rounded-[18px] border p-5 md:p-6 transition-all duration-500 backdrop-blur-xl text-left ${
                      localActive ? "bg-white/[0.08] border-white/20 scale-[1.02]" : "bg-white/[0.04] border-white/10 opacity-80"
                    }`}
                    style={{ transform: localActive ? "translateZ(24px)" : "translateZ(0)" }}
                  >
                    <p className="font-mono text-[10px] tracking-[0.22em]" style={{ color: w.accent }}>
                      {w.subtitle}
                    </p>
                    <h3 className="font-serif text-[22px] mt-1 text-[#E8E6DE]">{w.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{w.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-mono tracking-wide" style={{ color: w.accent }}>
                      <span className="h-px w-6" style={{ background: w.accent }} />
                      {localActive ? "NOW VIEWING" : "PASSING THROUGH"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex gap-1.5">
              {[0, 1, 2].map((i) => {
                const thresholds = [0.6, 0.66, 0.72];
                const activeIdx = progress < 0.63 ? 0 : progress < 0.69 ? 1 : 2;
                return <span key={i} className={`h-1 rounded-full transition-all ${i === activeIdx ? "w-8 bg-[#E8E6DE]" : "w-1.5 bg-white/20"}`} />;
              })}
            </div>
          </div>

          {/* SHOT 6 — Proof / LIDAR */}
          <div
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16"
            style={{
              opacity: shots.s6.o,
              transform: `translateY(${(1 - shots.s6.o) * 16}px)`,
            }}
          >
            <div className="flex-1 max-w-[520px] text-center md:text-left">
              <p className="font-mono text-[11px] tracking-[0.32em] text-[#9BB5C2] mb-3">SHOT 06 — THE PROOF</p>
              <h2 className="font-serif text-[30px] md:text-[42px] leading-[0.97] text-[#E8E6DE]">
                Carbon negative
                <br />
                <span className="italic text-[#9BB5C2]">by design.</span>
              </h2>
              <ul className="mt-5 space-y-2 text-left inline-block md:block">
                {[
                  "LIDAR-scanned cabins — zero trees felled",
                  "314% more forest protected than occupied",
                  "All water returned cleaner than taken",
                ].map((t) => (
                  <li key={t} className="flex gap-2 text-[12.5px] text-[#E8E6DE]/70">
                    <span className="text-[#8A9B6E] mt-px">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full max-w-[340px] rounded-[18px] bg-[#E8E6DE]/5 backdrop-blur-xl border border-white/10 p-5 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-[0.2em] text-white/45">LIDAR SCAN</span>
                <span className="text-[10px] text-[#8A9B6E]">● LIVE</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { v: "−12.4t", l: "CO₂ / yr" },
                  { v: "100%", l: "SOLAR" },
                  { v: "0", l: "CUT" },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                    <p className="text-[16px] font-medium text-[#E8E6DE]">{m.v}</p>
                    <p className="text-[9px] tracking-[0.14em] text-white/40 mt-1">{m.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-[66px] rounded-xl bg-[#0D1A14]/60 border border-white/5 flex items-center justify-center overflow-hidden relative">
                {/* fake lidar lines */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18px, rgba(155,181,194,0.25) 18px 19px), repeating-linear-gradient(0deg, transparent 0 18px, rgba(155,181,194,0.18) 18px 19px)`,
                }} />
                <span className="relative text-[10px] tracking-[0.18em] text-[#9BB5C2]">WIREFRAME TOPOLOGY · 4.2M pts</span>
              </div>
            </div>
          </div>

          {/* SHOT 7 — Climax */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{
              opacity: shots.s7.o,
              transform: `translateY(${(1 - shots.s7.o) * 18}px) scale(${0.97 + shots.s7.o * 0.03})`,
              pointerEvents: shots.s7.o > 0.6 ? "auto" : "none",
            }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] text-[#8A9B6E] mb-4">SHOT 07 — THE CLEARING</p>
            <h2 className="font-serif text-[40px] md:text-[68px] leading-[0.9] tracking-[-0.03em] text-[#E8E6DE]">
              Stay until
              <br />
              <span className="italic text-[#CFC9B8]">the forest</span> forgets you.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[13.5px] leading-relaxed text-[#E8E6DE]/60">
              Three nights minimum. We ask that you arrive on foot. Leave no trace — not even a review, if you can help it.
            </p>

            <div id="reserve" className="mt-8 flex flex-col md:flex-row gap-3 pointer-events-auto">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="h-12 px-8 rounded-full bg-[#E8E6DE] text-[#0D1A14] text-[13px] tracking-[0.12em] font-medium flex items-center justify-center hover:bg-white transition"
              >
                CHECK AVAILABILITY — WINTER 2026
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="h-12 px-7 rounded-full bg-white/8 backdrop-blur border border-white/15 text-[#E8E6DE] text-[13px] tracking-wide flex items-center justify-center hover:bg-white/12 transition"
              >
                Watch 47s film →
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["From $740 / night", "3-night min", "Guided in by foot"].map((t) => (
                <span key={t} className="text-[11px] text-white/45 font-mono">
                  {t} {t !== "Guided in by foot" && "·"}
                </span>
              ))}
            </div>
          </div>

          {/* BOTTOM META */}
          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 flex justify-between items-end pointer-events-none">
            <div className="hidden md:block text-[10px] tracking-[0.16em] font-mono text-white/30">
              47°48′N 123°45′W · ELEV. 182m · OLD-GROWTH SITKA SPRUCE
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.14em] text-white/35">
              <span className="hidden md:inline">AUDIO</span>
              <span className="h-3 w-8 flex items-end gap-px">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="flex-1 bg-white/40 rounded-full" style={{ height: `${30 + Math.sin(progress * 12 + i) * 30}%` }} />
                ))}
              </span>
              <span>RAVEN · WIND · WATER</span>
            </div>
          </div>
        </div>
      </div>

      {/* SPACER for pin — GSAP handles pinSpacing but we need overflow */}
      <div className="h-[1px]" aria-hidden />

      {/* FOOTER after pin releases — subtle */}
      <footer className="bg-[#0D1A14] border-t border-white/5 px-6 md:px-8 py-10 flex flex-col md:flex-row justify-between gap-6 text-[11px] font-mono tracking-wide text-white/35">
        <div>
          <p className="font-serif text-[15px] tracking-[0.14em] text-[#E8E6DE]/80">SYLVA</p>
          <p className="mt-1 max-w-[34ch] leading-relaxed">A fictional forest resort concept — crafted as a scroll-driven 3D experience. No video was harmed in the making; every frame is real-time WebGL.</p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-white/55">BUILD</p>
            <p className="mt-1">Next.js · R3F · GSAP · Lenis</p>
          </div>
          <div>
            <p className="text-white/55">FOREST</p>
            <p className="mt-1">Hoh Rainforest — Olympic Peninsula</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
