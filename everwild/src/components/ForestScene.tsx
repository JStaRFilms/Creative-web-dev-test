"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ForestGround from "./ForestGround";
import Trees from "./Trees";
import Fireflies from "./Fireflies";
import FogLayer from "./FogLayer";
import MoonLight from "./MoonLight";

function CameraController({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 3, 20));
  const targetLookAt = useRef(new THREE.Vector3(0, 2, -5));

  useFrame(() => {
    const p = scrollProgress.current;

    // Camera path: fly forward through the forest
    const z = 20 - p * 120;
    const y = 3 + Math.sin(p * Math.PI * 2) * 1.5;
    const x = Math.sin(p * Math.PI * 3) * 4;

    targetPos.current.set(x, y, z);
    camera.position.lerp(targetPos.current, 0.05);

    // Look-ahead point
    const lookZ = z - 15;
    const lookY = 2 + Math.sin(p * Math.PI * 2.5) * 0.8;
    targetLookAt.current.set(x * 0.3, lookY, lookZ);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export default function ForestScene() {
  const scrollProgress = useRef(0);

  // Expose scroll progress globally for the scroll experience to drive
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__forestScrollProgress = scrollProgress;
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__forestScrollProgress;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 20], fov: 60, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        style={{ background: "#0a0f0a" }}
      >
        <color attach="background" args={["#0a0f0a"]} />
        <fog attach="fog" args={["#0a1a0d", 5, 60]} />

        <CameraController scrollProgress={scrollProgress} />

        <ambientLight intensity={0.15} color="#4a6b5a" />
        <directionalLight
          position={[10, 20, 10]}
          intensity={0.3}
          color="#8ab8a8"
          castShadow
        />

        <MoonLight />
        <ForestGround />
        <Trees scrollProgress={scrollProgress} />
        <FogLayer />
        <Fireflies count={200} />
      </Canvas>
    </div>
  );
}
