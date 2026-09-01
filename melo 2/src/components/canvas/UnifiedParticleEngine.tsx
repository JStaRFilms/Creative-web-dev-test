"use client";

import React, { useEffect, useRef } from "react";
import { sound } from "@/components/audio/SynthesizerEngine";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  category: number; // 0: Results, 1: Fees, 2: Admission, 3: Attendance, 4: Parent, 5: Receipts, 6: Academics
  pulseOffset: number;
  clusterX: number;
  clusterY: number;
}

interface UnifiedParticleEngineProps {
  scrollProgress: number; // 0.0 to 1.0
  activeBeat: number;     // 1 to 6
  isGlitching: boolean;
  onGlitchTrigger?: () => void;
}

const CATEGORY_COLORS = [
  "#FF5A1F", // Results (Precision Orange)
  "#142E28", // Fees (Deep Forest)
  "#767A80", // Admission (Graphite)
  "#9B9FA6", // Attendance (Light Slate)
  "#C6C1B7", // Parent (Warm Linen)
  "#C86432", // Receipts (Terracotta)
  "#111214", // Academics (Archival Ink)
];

export const UnifiedParticleEngine: React.FC<UnifiedParticleEngineProps> = ({
  scrollProgress,
  activeBeat,
  isGlitching,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; active: boolean }>({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    active: false,
  });
  const prevMousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const glitchTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);

    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 450 : 1200;

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const cat = i % 7;
        const angle = (cat / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const dist = Math.min(width, height) * (0.28 + (Math.random() - 0.5) * 0.18);

        // Cluster anchors for Beat 1
        const clX = cx + Math.cos(angle) * dist;
        const clY = cy + Math.sin(angle) * dist;

        const jitter = (Math.random() - 0.5) * 90;
        const px = clX + jitter;
        const py = clY + jitter;

        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseX: px,
          baseY: py,
          size: Math.random() * 2.2 + 1.2,
          color: CATEGORY_COLORS[cat],
          category: cat,
          pulseOffset: Math.random() * Math.PI * 2,
          clusterX: clX,
          clusterY: clY,
        });
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (prevMousePos.current.x > 0) {
        mouseRef.current.vx = currentX - prevMousePos.current.x;
        mouseRef.current.vy = currentY - prevMousePos.current.y;
      }
      prevMousePos.current = { x: currentX, y: currentY };
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    // Main Simulation Loop
    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const cx = width / 2;
      const cy = height / 2;

      if (isGlitching) {
        glitchTimeRef.current += 0.08;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Calculate Beat-Driven Anchor Targets
        let targetX = p.baseX;
        let targetY = p.baseY;

        if (activeBeat === 1) {
          // BEAT 1: THE FRACTURE — Drift away from center, maintain 7 isolated clusters
          const wanderX = Math.sin(time + p.pulseOffset) * 18;
          const wanderY = Math.cos(time * 0.8 + p.pulseOffset) * 18;
          targetX = p.clusterX + wanderX;
          targetY = p.clusterY + wanderY;
        } else if (activeBeat === 2) {
          // BEAT 2: THE MACHINE — 3 horizontal parallel pipeline bands
          const bandIndex = p.category % 3; // 0: Academic, 1: Financial, 2: Admissions
          const bandY = cy + (bandIndex - 1) * 130 + Math.sin(time * 2 + p.x * 0.01) * 8;
          const speedFactor = (p.category + 1) * 0.7;
          
          p.x += speedFactor * 1.8;
          if (p.x > width + 40) {
            p.x = -40;
          }
          targetX = p.x;
          targetY = bandY + (Math.sin(p.pulseOffset + time) * 22);
        } else if (activeBeat === 3) {
          // BEAT 3: THE CONVERGENCE — Gravitational acceleration toward center vortex
          const vortexAngle = time * 0.6 + (i / particles.length) * Math.PI * 4;
          const vortexRadius = 60 + ((i * 19) % (Math.min(width, height) * 0.32));
          targetX = cx + Math.cos(vortexAngle) * vortexRadius;
          targetY = cy + Math.sin(vortexAngle) * vortexRadius;
        } else if (activeBeat === 4) {
          // BEAT 4: THE CRUCIBLE — Instability & recovery
          if (isGlitching) {
            const glitchNoiseX = (Math.random() - 0.5) * 160;
            const glitchNoiseY = (Math.random() - 0.5) * 160;
            targetX = cx + Math.sin(glitchTimeRef.current * 8 + i) * 280 + glitchNoiseX;
            targetY = cy + Math.cos(glitchTimeRef.current * 8 + i) * 220 + glitchNoiseY;
          } else {
            const latticeX = cx + ((i % 30) - 15) * 22;
            const latticeY = cy + (Math.floor(i / 30) - 15) * 18;
            targetX = latticeX + Math.sin(time + p.pulseOffset) * 6;
            targetY = latticeY + Math.cos(time + p.pulseOffset) * 6;
          }
        } else if (activeBeat === 5) {
          // BEAT 5: THE REVEAL — Frame boundary around Melo OS interface
          const rectW = Math.min(width * 0.88, 1080);
          const rectH = Math.min(height * 0.78, 620);
          const perimeter = 2 * (rectW + rectH);
          const posOnPerim = ((i / particles.length) * perimeter + time * 40) % perimeter;

          let px = 0;
          let py = 0;
          if (posOnPerim < rectW) {
            px = cx - rectW / 2 + posOnPerim;
            py = cy - rectH / 2;
          } else if (posOnPerim < rectW + rectH) {
            px = cx + rectW / 2;
            py = cy - rectH / 2 + (posOnPerim - rectW);
          } else if (posOnPerim < 2 * rectW + rectH) {
            px = cx + rectW / 2 - (posOnPerim - (rectW + rectH));
            py = cy + rectH / 2;
          } else {
            px = cx - rectW / 2;
            py = cy + rectH / 2 - (posOnPerim - (2 * rectW + rectH));
          }

          targetX = px + Math.sin(p.pulseOffset + time * 2) * 8;
          targetY = py + Math.cos(p.pulseOffset + time * 2) * 8;
        } else {
          // BEAT 6: THE HORIZON — Expansive relational constellation network
          const angle = (i / particles.length) * Math.PI * 6 + time * 0.1;
          const r = 120 + Math.pow(i / particles.length, 0.75) * (Math.max(width, height) * 0.65);
          targetX = cx + Math.cos(angle) * r;
          targetY = cy + Math.sin(angle) * r;
        }

        // 2. Spring Physics (Hooke's Law)
        const springK = activeBeat === 4 && isGlitching ? 0.02 : 0.065;
        const damping = 0.88;

        const ax = (targetX - p.x) * springK;
        const ay = (targetY - p.y) * springK;

        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;

        // 3. Mouse Force Field Repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radius = 140;
          if (distSq < radius * radius && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = ((radius - dist) / radius) * 14;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // 4. Render Particle
        ctx.beginPath();
        const pulse = 1 + Math.sin(time * 3 + p.pulseOffset) * 0.2;
        const currentSize = p.size * pulse * (activeBeat === 3 ? 1.3 : 1.0);
        ctx.arc(p.x, p.y, Math.max(0.6, currentSize), 0, Math.PI * 2);

        if (activeBeat === 4 && isGlitching) {
          ctx.fillStyle = i % 2 === 0 ? "#FF5A1F" : "#142E28";
        } else {
          ctx.fillStyle = p.color;
        }
        ctx.globalAlpha = activeBeat === 5 ? 0.45 : 0.75;
        ctx.fill();
      }

      // 5. Constellation Links in Beat 3 and Beat 6
      if (activeBeat === 3 || activeBeat === 6) {
        ctx.lineWidth = 0.6;
        const maxDist = activeBeat === 3 ? 65 : 85;
        const maxDistSq = maxDist * maxDist;

        // Optimized sampling step for performance
        const step = isMobile ? 4 : 2;
        for (let i = 0; i < particles.length; i += step) {
          const p1 = particles[i];
          for (let j = i + 1; j < Math.min(particles.length, i + 35); j += step) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = activeBeat === 3 ? "#FF5A1F" : "#142E28";
              ctx.globalAlpha = alpha;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [activeBeat, isGlitching, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700"
      style={{
        opacity: isGlitching ? 0.95 : 0.85,
      }}
      aria-hidden="true"
    />
  );
};
