"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Forest, ForestFloor, Fireflies } from "./Trees";
import { Atmosphere } from "./Atmosphere";
import { CameraRig } from "./CameraRig";

export function ForestScene() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 3.4, 4], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <color attach="background" args={["#071007"]} />
        <fog attach="fog" args={["#0a140a", 10, 60]} />
        <CameraRig />
        <Atmosphere />
        <Forest />
        <ForestFloor />
        <Fireflies />
      </Canvas>
    </div>
  );
}
