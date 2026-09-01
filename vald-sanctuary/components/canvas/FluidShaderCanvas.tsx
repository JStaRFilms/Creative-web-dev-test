'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FluidShaderCanvasProps {
  progress: number;
}

export const FluidShaderCanvas: React.FC<FluidShaderCanvasProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // Fullscreen quad with custom GLSL Fog & Thermal Fluid Shader
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0.0 },
        uProgress: { value: progress },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseVelocity: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uMouse;
        uniform float uMouseVelocity;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Simplex Noise Kernel
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        // 4-Octave Fractional Brownian Motion (FBM)
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * snoise(p);
            p = p * 2.0 + vec2(10.0);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 mouse = uMouse;
          float aspect = uResolution.x / uResolution.y;
          vec2 aspectUv = vec2(uv.x * aspect, uv.y);
          vec2 aspectMouse = vec2(mouse.x * aspect, mouse.y);

          float distToMouse = length(aspectUv - aspectMouse);

          // 1. Interactive Fog Parting (Shot 1 Canopy & Shot 4 Mycelium)
          // As mouse sweeps over, it creates an eddy clearing the morning mist
          float fogNoise = fbm(uv * 3.0 + vec2(uTime * 0.05, uTime * 0.02));
          float cursorMask = smoothstep(0.0, 0.45, distToMouse);
          float mistIntensity = smoothstep(0.2, 0.8, fogNoise) * cursorMask * 0.28;

          // 2. Liquid Thermal Ripples (Shot 3 Mineral Springs)
          // When in Shot 3 (progress ~ 0.4 to 0.6), mouse leaves liquid ripples
          float isSprings = smoothstep(0.35, 0.45, uProgress) * (1.0 - smoothstep(0.55, 0.65, uProgress));
          float rippleWave = sin(distToMouse * 35.0 - uTime * 6.0) * exp(-distToMouse * 4.5) * isSprings * uMouseVelocity;

          // Subtle Chromatic Dispersion on ripple edges
          vec3 mistColor = vec3(0.9, 0.95, 0.92);
          vec3 waterTint = vec3(0.2, 0.45, 0.4) * rippleWave * 2.0;

          vec3 finalColor = mistColor + waterTint;
          float alpha = clamp(mistIntensity + abs(rippleWave) * 0.5, 0.0, 0.45);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse Tracking with Velocity Damping
    let prevMouseX = 0.5;
    let prevMouseY = 0.5;
    let currentVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX / window.innerWidth;
      const currentY = 1.0 - (e.clientY / window.innerHeight);

      const dx = currentX - prevMouseX;
      const dy = currentY - prevMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      currentVelocity = Math.min(dist * 12.0, 1.5);

      material.uniforms.uMouse.value.set(currentX, currentY);
      prevMouseX = currentX;
      prevMouseY = currentY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    let animId: number;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uProgress.value = progress;

      // Decay velocity
      currentVelocity *= 0.92;
      material.uniforms.uMouseVelocity.value = currentVelocity;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-5"
    />
  );
};
