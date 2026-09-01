"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface TreePose {
  x: number;
  z: number;
  scale: number;
  lean: number;
}

function useTreePoses(count: number, radius: number, depth: number, seed: number): TreePose[] {
  return useMemo(() => {
    const rng = mulberry32(seed);
    const poses: TreePose[] = [];
    let guard = 0;
    while (poses.length < count && guard < count * 60) {
      guard++;
      const angle = rng() * Math.PI * 2;
      const bias = Math.pow(rng(), 1.4);
      const r = 3.2 + bias * radius;
      const x = Math.cos(angle) * r;
      const z = (rng() - 0.5) * 2 * depth;
      // keep a clean corridor down the middle (the path the camera flies)
      if (Math.abs(x) < 2.6 && Math.abs(z) < 24) continue;
      poses.push({ x, z, scale: 0.6 + rng() * 1.1, lean: -0.12 + rng() * 0.24 });
    }
    return poses;
  }, [count, radius, depth, seed]);
}

/** Procedural low-poly forest: instanced trunks + foliage for cheap draw calls. */
export function Forest({ count = 340, radius = 60, depth = 300, seed = 7 }: {
  count?: number;
  radius?: number;
  depth?: number;
  seed?: number;
}) {
  const poses = useTreePoses(count, radius, depth, seed);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const foliageRef = useRef<THREE.InstancedMesh>(null);

  const timeRef = useRef(0);
  useFrame((_, delta) => {
    const trunk = trunkRef.current;
    const foliage = foliageRef.current;
    if (!trunk || !foliage) return;
    timeRef.current += delta;
    const time = timeRef.current;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const e = new THREE.Euler();

    for (let i = 0; i < poses.length; i++) {
      const pose = poses[i];
      const sway = Math.sin(time * 0.4 + i) * 0.02;
      e.set(pose.lean + sway, 0, pose.lean * -0.6 + sway);
      q.setFromEuler(e);
      s.set(pose.scale, pose.scale, pose.scale);
      p.set(pose.x, 0, pose.z);
      m.compose(p, q, s);
      trunk.setMatrixAt(i, m);

      e.set(pose.lean * 1.4 + sway, i * 1.3, pose.lean * -0.8);
      q.setFromEuler(e);
      s.set(pose.scale * 1.15, pose.scale * 1.15, pose.scale * 1.15);
      p.set(pose.x, 0, pose.z);
      m.compose(p, q, s);
      foliage.setMatrixAt(i, m);
    }
    trunk.instanceMatrix.needsUpdate = true;
    foliage.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, poses.length]}>
        <cylinderGeometry args={[0.28, 0.45, 2.6, 6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.95} metalness={0} />
      </instancedMesh>
      <instancedMesh ref={foliageRef} args={[undefined, undefined, poses.length]}>
        <coneGeometry args={[1.7, 4.6, 7]} />
        <meshStandardMaterial color="#16260f" roughness={0.9} metalness={0} flatShading />
      </instancedMesh>
    </group>
  );
}

/** Dark forest floor stretching along the fly-path. */
export function ForestFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -120]} receiveShadow>
      <planeGeometry args={[260, 420]} />
      <meshStandardMaterial color="#0c160c" roughness={1} metalness={0} />
    </mesh>
  );
}

/** Amber fireflies shimmering through the grove. */
export function Fireflies({ count = 260, radius = 42, depth = 300 }: {
  count?: number;
  radius?: number;
  depth?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const positions = useMemo(() => {
    const rng = mulberry32(99);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * radius * 2;
      arr[i * 3 + 1] = 0.5 + rng() * 5.5;
      arr[i * 3 + 2] = (rng() - 0.5) * depth;
    }
    return arr;
  }, [count, radius, depth]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    timeRef.current += delta;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.5 + Math.sin(timeRef.current * 1.8) * 0.32;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#e8c37f"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
