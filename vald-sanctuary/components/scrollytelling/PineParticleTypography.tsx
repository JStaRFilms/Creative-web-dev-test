'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  density: number;
}

interface PineParticleTypographyProps {
  text: string;
  subtitle?: string;
  active: boolean;
}

export const PineParticleTypography: React.FC<PineParticleTypographyProps> = ({
  text,
  subtitle,
  active,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -2000, y: -2000, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 160);

    const initParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Render bold headline text to offscreen buffer
      const fontSize = Math.max(32, Math.min(width * 0.07, 72));
      ctx.fillStyle = '#E5ECE4';
      ctx.font = `200 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 10, height / 2);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const particles: Particle[] = [];

      // Stride for high-DPI balance: sample every 4 pixels
      const stride = 4;
      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const index = (y * 4 * width) + (x * 4);
          const alpha = data[index + 3];

          if (alpha > 120) {
            particles.push({
              x: x + (Math.random() - 0.5) * 40,
              y: y + (Math.random() - 0.5) * 40,
              baseX: x,
              baseY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.5 + 0.8,
              color: Math.random() > 0.85 ? '#D97736' : '#E5ECE4',
              density: Math.random() * 20 + 8,
            });
          }
        }
      }

      particlesRef.current = particles;
      ctx.clearRect(0, 0, width, height);
    };

    initParticles();

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -2000;
      mouseRef.current.y = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Physics Loop (Hooke's Law spring elasticity + cursor force repulsion)
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const radiusSq = mouse.radius * mouse.radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        // Repulsion force field
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouse.radius - dist) / mouse.radius;
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx -= nx * force * p.density * 0.4;
          p.vy -= ny * force * p.density * 0.4;
        }

        // Hooke's Law: pull back toward immutable anchor memory
        const springX = p.baseX - p.x;
        const springY = p.baseY - p.y;
        p.vx += springX * 0.08;
        p.vy += springY * 0.08;

        // Friction damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text]);

  return (
    <div className="relative w-full overflow-hidden pointer-events-auto select-none">
      {subtitle && (
        <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#D97736] uppercase mb-1">
          {subtitle}
        </p>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-[140px] sm:h-[160px] block cursor-crosshair"
      />
      <div className="text-[10px] font-mono tracking-[0.2em] text-[#E5ECE4]/40 mt-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97736]" />
        <span>SWIPE TO DISPERSE CEDAR PARTICLES</span>
      </div>
    </div>
  );
};
