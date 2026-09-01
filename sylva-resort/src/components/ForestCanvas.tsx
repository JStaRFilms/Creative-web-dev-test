"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ForestScene from "./ForestScene";

export default function ForestCanvas({
  progress,
  mouse,
}: {
  progress: number;
  mouse: { x: number; y: number };
}) {
  return (
    <Canvas
      shadows={false}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.02,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      dpr={[1, 2]}
      camera={{ fov: 55, near: 0.1, far: 200, position: [0, 8, 28] }}
      style={{ background: "transparent" }}
    >
      <ForestScene progress={progress} mouse={mouse} />
    </Canvas>
  );
}
