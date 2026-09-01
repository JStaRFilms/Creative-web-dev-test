"use client";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ForestHDRI, RealCabin, RealBridge } from "./RealAssets";

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(800, 800, 128, 128);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const n =
        Math.sin(x * 0.008) * 8 +
        Math.cos(y * 0.012) * 6 +
        Math.sin((x + y) * 0.005) * 10 +
        Math.sin(x * 0.03) * Math.cos(y * 0.03) * 2;
      const corridor = Math.exp(-(x * x) / 80) * -2;
      pos.setZ(i, n + corridor);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <mesh ref={meshRef} geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
      <meshStandardMaterial color="#1E2A20" roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

function InstancedForest({ count = 620 }: { count?: number }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const foliageRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    const arr: { x: number; z: number; scale: number; rot: number; trunkH: number; folH: number }[] = [];
    for (let i = 0; i < count; i++) {
      const z = THREE.MathUtils.randFloat(-360, 360);
      let x = THREE.MathUtils.randFloatSpread(260);
      if (Math.abs(x) < 10) x = (x > 0 ? 1 : -1) * (10 + Math.random() * 18);
      if (Math.abs(x) < 30 && Math.random() > 0.35) continue;
      const scale = THREE.MathUtils.randFloat(0.7, 1.6);
      arr.push({ x, z, scale, rot: Math.random() * Math.PI * 2, trunkH: THREE.MathUtils.randFloat(7, 14), folH: THREE.MathUtils.randFloat(9, 16) });
    }
    return arr;
  }, [count]);
  useLayoutEffect(() => {
    if (!trunkRef.current || !foliageRef.current) return;
    data.forEach((d, i) => {
      dummy.position.set(d.x, -6 + d.trunkH / 2 - 1.5, d.z);
      dummy.rotation.set(0, d.rot, 0);
      dummy.scale.set(1 * d.scale, d.trunkH, 1 * d.scale);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(i, dummy.matrix);
      dummy.position.set(d.x, -6 + d.trunkH + d.folH / 2 - 1.8, d.z);
      dummy.rotation.set(0, d.rot, 0);
      dummy.scale.set(1.15 * d.scale, d.folH, 1.15 * d.scale);
      dummy.updateMatrix();
      foliageRef.current!.setMatrixAt(i, dummy.matrix);
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;
    foliageRef.current.instanceMatrix.needsUpdate = true;
    trunkRef.current.computeBoundingSphere();
    foliageRef.current.computeBoundingSphere();
  }, [data, dummy]);
  return (
    <group>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, data.length]} castShadow receiveShadow frustumCulled={false}>
        <cylinderGeometry args={[0.32, 0.42, 1, 6]} />
        <meshStandardMaterial color="#2A1E16" roughness={0.92} />
      </instancedMesh>
      <instancedMesh ref={foliageRef} args={[undefined, undefined, data.length]} frustumCulled={false}>
        <coneGeometry args={[1.9, 1, 7]} />
        <meshStandardMaterial color="#2F3D2C" roughness={0.88} />
      </instancedMesh>
    </group>
  );
}

function LowPolyCabinsFallback() {
  const cabins: [number, number, number][] = [
    [-22, -2.8, -110],
    [14, -3.5, -190],
  ];
  return (
    <group>
      {cabins.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[7, 3.2, 5]} />
            <meshStandardMaterial color="#3B2E26" roughness={0.8} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow>
            <coneGeometry args={[4.8, 2.2, 4]} />
            <meshStandardMaterial color="#1C1815" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.2, 2.51]}>
            <planeGeometry args={[2.2, 1.3]} />
            <meshStandardMaterial color="#FFD8A6" emissive="#FF8C42" emissiveIntensity={0.35} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Dust() {
  const pointsRef = useRef<THREE.Points>(null);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 1000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = THREE.MathUtils.randFloatSpread(180);
      pos[i * 3 + 1] = THREE.MathUtils.randFloat(2, 28);
      pos[i * 3 + 2] = THREE.MathUtils.randFloatSpread(700);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    elapsed.current += delta;
    pointsRef.current.rotation.y = Math.sin(elapsed.current * 0.03) * 0.06;
  });
  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial size={0.2} color="#D6DDD6" transparent opacity={0.38} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function River() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.4, -20]}>
      <planeGeometry args={[16, 520]} />
      <meshStandardMaterial color="#1E2F2E" roughness={0.35} metalness={0.15} transparent opacity={0.9} />
    </mesh>
  );
}

export default function ForestScene() {
  return (
    <group>
      <fogExp2 attach="fog" args={["#0E1410", 0.014]} />
      <ambientLight intensity={0.5} color="#D6DDD6" />
      <directionalLight position={[40, 60, 20]} intensity={1.2} color="#FFEED0" castShadow shadow-mapSize={[2048, 2048]}>
        <orthographicCamera attach="shadow-camera" args={[-80, 80, 80, -80]} />
      </directionalLight>
      <directionalLight position={[-30, 20, -40]} intensity={0.45} color="#8AA0FF" />

      <Suspense fallback={null}>
        <ForestHDRI />
      </Suspense>

      <Terrain />
      <River />

      <Suspense fallback={null}>
        <RealBridge position={[0, -5.1, -18]} />
      </Suspense>

      <Suspense fallback={<LowPolyCabinsFallback />}>
        <RealCabin position={[18, -4.2, -40]} scale={3.2} />
      </Suspense>
      <LowPolyCabinsFallback />

      <InstancedForest count={620} />
      <Dust />
    </group>
  );
}
