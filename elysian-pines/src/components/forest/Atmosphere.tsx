"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Soft volumetric god-ray shafts slanting through the canopy. */
function GodRays({ count = 8, radius = 34, depth = 260 }: { count?: number; radius?: number; depth?: number }) {
  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#d8953b",
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const rays = useMemo(() => {
    const rng = (n: number) => {
      let t = (n += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (rng(i) - 0.5) * radius * 2,
        z: (rng(i + 100) - 0.2) * depth * 1.1,
        rot: (rng(i + 200) - 0.5) * 0.5,
        w: 2 + rng(i + 300) * 5,
        h: 12 + rng(i + 400) * 22,
      });
    }
    return arr;
  }, [count, radius, depth]);

  const geom = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  return (
    <group>
      {rays.map((r, i) => (
        <mesh
          key={i}
          geometry={geom}
          material={mat}
          position={[r.x, 9 + (i % 3) * 5, r.z]}
          rotation={[0, r.rot, -0.55]}
          scale={[r.w, r.h, 1]}
        />
      ))}
    </group>
  );
}

/** Floating amber dust motes drifting toward the camera. */
function DustMotes({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rng = (n: number) => {
      let t = (n += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng(i) - 0.5) * 60;
      arr[i * 3 + 1] = rng(i + 50) * 14;
      arr[i * 3 + 2] = -10 - rng(i + 100) * 260;
    }
    return arr;
  }, [count]);

  const timeRef = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    timeRef.current += delta;
    ref.current.rotation.y = timeRef.current * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Moonlit top glow + warm amber floor bounce through the grove. */
export function Atmosphere() {
  return (
    <group>
      <ambientLight intensity={0.25} color="#cfe0d0" />
      <directionalLight
        position={[4, 10, 6]}
        intensity={0.9}
        color="#e8d9c0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={80}
      />
      <directionalLight position={[-6, -2, -8]} intensity={0.5} color="#5c6b3a" />
      <pointLight position={[0, 2.5, -20]} intensity={8} distance={40} color="#d4953b" />
      <pointLight position={[0, 3, -120]} intensity={10} distance={50} color="#e8c37f" />
      <GodRays />
      <DustMotes />
    </group>
  );
}
