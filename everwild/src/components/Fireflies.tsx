"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Fireflies({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const timeRef = useRef(0);

  const { positions, speeds, offsets, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = 0.5 + Math.random() * 8;
      pos[i * 3 + 2] = -Math.random() * 300;
      spd[i] = 0.3 + Math.random() * 0.8;
      off[i] = Math.random() * Math.PI * 2;
      sz[i] = 0.05 + Math.random() * 0.1;
    }

    return { positions: pos, speeds: spd, offsets: off, sizes: sz };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      const floatY =
        baseY + Math.sin(timeRef.current * speeds[i] + offsets[i]) * 0.5;
      const floatX =
        x + Math.sin(timeRef.current * speeds[i] * 0.7 + offsets[i]) * 0.3;

      dummy.position.set(floatX, floatY, z);
      dummy.scale.setScalar(
        sizes[i] * (0.8 + Math.sin(timeRef.current * 2 + offsets[i]) * 0.4)
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#e8d878"
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
