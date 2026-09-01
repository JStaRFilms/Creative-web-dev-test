"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function MoonLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.05) * 2;
      lightRef.current.intensity = 1.5 + Math.sin(t * 0.3) * 0.2;
    }
    if (moonRef.current) {
      moonRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group>
      {/* Moon sphere */}
      <mesh ref={moonRef} position={[15, 25, -80]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#d8e8f0" toneMapped={false} />
      </mesh>

      {/* Moon light */}
      <pointLight
        ref={lightRef}
        position={[15, 25, -80]}
        color="#8ab8d8"
        intensity={1.5}
        distance={120}
        decay={0.5}
      />

      {/* Volumetric moonbeam spot */}
      <spotLight
        position={[15, 30, -80]}
        color="#6a98b8"
        intensity={0.8}
        angle={0.3}
        penumbra={0.8}
        distance={100}
        decay={0.6}
        target-position={[0, 0, -100]}
      />
    </group>
  );
}
