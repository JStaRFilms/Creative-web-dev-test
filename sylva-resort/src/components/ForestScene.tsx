"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

// Camera path keyframes — progress 0–1
const CAMERA_KEYS = [
  { p: 0.0, pos: [0, 8, 28] as const, target: [0, 2, -2] as const, fog: 0.018, fogColor: "#0D1A14" },
  { p: 0.14, pos: [0, 3.5, 9] as const, target: [0, 1.2, -1] as const, fog: 0.022, fogColor: "#0D1A14" },
  { p: 0.29, pos: [-4.5, 2.6, 6.5] as const, target: [0.5, 1.0, -3] as const, fog: 0.02, fogColor: "#14261E" },
  { p: 0.43, pos: [0, 1.1, 5.2] as const, target: [0, 0.6, -6] as const, fog: 0.035, fogColor: "#0A1410" },
  { p: 0.57, pos: [0, 12, 5] as const, target: [0, 6, -8] as const, fog: 0.01, fogColor: "#1A2E22" },
  { p: 0.64, pos: [0, 0.55, 7] as const, target: [0, 0.2, -10] as const, fog: 0.028, fogColor: "#0D1A14" },
  { p: 0.71, pos: [0, 0.25, 8.5] as const, target: [0, 0.0, -12] as const, fog: 0.02, fogColor: "#0F2228" },
  { p: 0.85, pos: [0, 7, 16] as const, target: [0, 1, -4] as const, fog: 0.015, fogColor: "#0D1A14" },
  { p: 1.0, pos: [0, 2.2, 6.8] as const, target: [0, 1.0, -8] as const, fog: 0.018, fogColor: "#0D1A14" },
];

function getInterpolated(progress: number) {
  const p = clamp(progress, 0, 1);
  let i = 0;
  while (i < CAMERA_KEYS.length - 1 && p > CAMERA_KEYS[i + 1].p) i++;
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[Math.min(i + 1, CAMERA_KEYS.length - 1)];
  const span = b.p - a.p || 1;
  const t = clamp((p - a.p) / span, 0, 1);
  const st = smoothstep(t);
  return {
    pos: new THREE.Vector3(
      lerp(a.pos[0], b.pos[0], st),
      lerp(a.pos[1], b.pos[1], st),
      lerp(a.pos[2], b.pos[2], st)
    ),
    target: new THREE.Vector3(
      lerp(a.target[0], b.target[0], st),
      lerp(a.target[1], b.target[1], st),
      lerp(a.target[2], b.target[2], st)
    ),
    fog: lerp(a.fog, b.fog, st),
    fogColor: t < 0.5 ? a.fogColor : b.fogColor,
  };
}

// Procedural Tree Instance
function Trees({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { dummy, colors } = useMemo(() => {
    const d = new THREE.Object3D();
    const cols: THREE.Color[] = [];
    return { dummy: d, colors: cols };
  }, []);

  const positions = useMemo(() => {
    const pts: { x: number; z: number; s: number; h: number; type: number }[] = [];
    for (let i = 0; i < count; i++) {
      // Avoid center clearing, radial distribution
      let x: number, z: number, r: number;
      do {
        const angle = Math.random() * Math.PI * 2;
        r = 4 + Math.random() * 42;
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r - 8; // bias forward
      } while (Math.sqrt(x * x + z * z) < 5.5);
      const s = 0.6 + Math.random() * 1.4;
      const h = 1.8 + Math.random() * 3.2;
      pts.push({ x, z, s, h, type: Math.random() });
    }
    return pts;
  }, [count]);

  useMemo(() => {
    if (!meshRef.current) return;
  }, []);

  // Build on mount
  useFrame(() => {});

  // Imperative setup once
  const initialized = useRef(false);
  useFrame(() => {
    if (initialized.current || !meshRef.current) return;
    initialized.current = true;
    const mesh = meshRef.current;
    const color = new THREE.Color();
    positions.forEach((p, i) => {
      dummy.position.set(p.x, 0, p.z);
      dummy.scale.set(p.s, p.s * (0.8 + p.h * 0.15), p.s);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // bark / foliage variation
      const foliage =
        p.type > 0.7 ? "#1B2E1A" : p.type > 0.35 ? "#24361F" : "#2F4A2A";
      color.set(foliage);
      // slightly darker further out to fake AO
      const dist = Math.sqrt(p.x * p.x + p.z * p.z);
      color.multiplyScalar(1 - clamp((dist - 10) / 40, 0, 0.22));
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
      {/* low-poly cone for foliage + cylinder trunk merged visually via groups? simplified to cone */}
      <coneGeometry args={[0.7, 3.2, 6]} />
      <meshStandardMaterial roughness={0.9} metalness={0.02} vertexColors={false} />
    </instancedMesh>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, -2]} receiveShadow>
      <planeGeometry args={[140, 140, 32, 32]} />
      <meshStandardMaterial color="#0F1F16" roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

function Cabin({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  // appear strongly around 0.14-0.35, fade after
  const local = clamp((progress - 0.1) / 0.3, 0, 1);
  const exit = clamp((progress - 0.38) / 0.18, 0, 1);
  const opacity = (1 - exit) * smoothstep(local);

  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = lerp(-0.6, 0, smoothstep(local)) - exit * 0.4;
    // subtle float
    group.current.rotation.y = lerp(-0.35, 0.12, progress);
  });

  if (opacity < 0.02) return null;

  return (
    <group ref={group} position={[0, 0, -3]}>
      {/* platform */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[4.8, 0.25, 3.6]} />
        <meshStandardMaterial color="#1E2B1A" roughness={0.85} />
      </mesh>
      {/* main volume */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[3.8, 1.7, 2.6]} />
        <meshStandardMaterial color="#2B2117" roughness={0.78} transparent opacity={opacity} />
      </mesh>
      {/* glass front */}
      <mesh position={[0, 0.55, 1.32]}>
        <planeGeometry args={[3.2, 1.35]} />
        <meshStandardMaterial
          color="#9BB5C2"
          transparent
          opacity={0.18 * opacity}
          roughness={0.12}
          metalness={0.45}
          emissive="#9BB5C2"
          emissiveIntensity={0.12 * opacity}
        />
      </mesh>
      {/* warm interior light */}
      <pointLight position={[0, 0.6, 0.2]} intensity={6 * opacity} color="#FFA85C" distance={10} decay={2} />
      {/* roof */}
      <mesh position={[0, 1.55, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4.1, 0.12, 2.9]} />
        <meshStandardMaterial color="#1A1611" roughness={0.92} />
      </mesh>
      {/* chimney smoke particles proxy */}
      <mesh position={[1.4, 1.85, -0.4]}>
        <cylinderGeometry args={[0.08, 0.12, 0.35, 6]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
    </group>
  );
}

function Onsen({ progress }: { progress: number }) {
  const local = clamp((progress - 0.38) / 0.22, 0, 1);
  const exit = clamp((progress - 0.58) / 0.12, 0, 1);
  const op = smoothstep(local) * (1 - smoothstep(exit));
  if (op < 0.02) return null;

  return (
    <group position={[0, -0.55, -5]}>
      {/* pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2.1, 32]} />
        <meshStandardMaterial
          color="#0F2A2E"
          roughness={0.25}
          metalness={0.15}
          emissive="#0E4A52"
          emissiveIntensity={0.35 * op}
          transparent
          opacity={0.92 * op}
        />
      </mesh>
      {/* rim stones */}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r = 2.15 + Math.sin(i * 1.7) * 0.12;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.08, Math.sin(a) * r]}>
            <dodecahedronGeometry args={[0.18 + Math.random() * 0.1, 0]} />
            <meshStandardMaterial color="#2B2B2B" roughness={0.95} />
          </mesh>
        );
      })}
      {/* steam */}
      <pointLight position={[0, 0.6, 0]} intensity={2.2 * op} color="#9BB5C2" distance={7} />
      {/* snowfall proxy */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshBasicMaterial color="#E8E6DE" transparent opacity={0.0} />
      </mesh>
    </group>
  );
}

function MistParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 14 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 6;
      sz[i] = 0.08 + Math.random() * 0.28;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    const pos = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // drift
      pos[i3 + 0] += Math.sin(t + i * 0.02) * 0.0015;
      // wrap X
      if (pos[i3 + 0] > 40) pos[i3 + 0] = -40;
      if (pos[i3 + 0] < -40) pos[i3 + 0] = 40;
    }
    (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    // fade with fog density
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.42 + Math.sin(progress * Math.PI * 2) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        sizeAttenuation
        transparent
        opacity={0.42}
        color="#D6E0E3"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ForestScene({
  progress,
  mouse,
}: {
  progress: number;
  mouse: { x: number; y: number };
}) {
  const cameraLerpPos = useRef(new THREE.Vector3(0, 8, 28));
  const cameraLerpTarget = useRef(new THREE.Vector3(0, 2, -2));

  useFrame((state) => {
    const { pos, target, fog, fogColor } = getInterpolated(progress);
    // mouse parallax — subtle
    const mx = mouse.x * 0.6;
    const my = mouse.y * 0.4;

    cameraLerpPos.current.lerp(new THREE.Vector3(pos.x + mx, pos.y - my * 0.5, pos.z), 0.045);
    cameraLerpTarget.current.lerp(new THREE.Vector3(target.x + mx * 0.3, target.y - my * 0.3, target.z), 0.045);

    state.camera.position.copy(cameraLerpPos.current);
    (state.camera as THREE.PerspectiveCamera).lookAt(cameraLerpTarget.current);
    (state.camera as THREE.PerspectiveCamera).updateProjectionMatrix();

    if (state.scene.fog) {
      (state.scene.fog as THREE.FogExp2).density = THREE.MathUtils.lerp(
        (state.scene.fog as THREE.FogExp2).density,
        fog,
        0.06
      );
      ((state.scene.fog as THREE.FogExp2).color as THREE.Color).lerp(
        new THREE.Color(fogColor),
        0.04
      );
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#0D1A14", 0.018]} />
      {/* lights that morph with progress */}
      <ambientLight intensity={0.42} color="#E8E6DE" />
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.15}
        color="#FFF6E0"
        castShadow={false}
      />
      <directionalLight position={[-8, 6, -6]} intensity={0.35} color="#9BB5C2" />
      {/* warm cabin light already in Cabin */}
      <hemisphereLight args={["#9BB5C2", "#0D1A14", 0.28]} />

      <Ground />
      <Trees count={220} />
      {/* second layer darker trunks geometry via scaled trees? fake trunks */}
      <group position={[0, 0, 0]}>
        {/* additional nearer trunks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 3.8 + (i % 3) * 1.2;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r - 1;
          const h = 7 + Math.random() * 5;
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh position={[0, h / 2 - 0.9, 0]}>
                <cylinderGeometry args={[0.12, 0.18, h, 7]} />
                <meshStandardMaterial color="#1A120B" roughness={0.92} />
              </mesh>
              <mesh position={[0, h - 0.4, 0]}>
                <coneGeometry args={[1.1, 3, 7]} />
                <meshStandardMaterial color="#162214" roughness={0.88} />
              </mesh>
            </group>
          );
        })}
      </group>

      <Cabin progress={progress} />
      <Onsen progress={progress} />
      <MistParticles progress={progress} />

      {/* River plane for water world */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.78, -14]}
        visible={progress > 0.62 && progress < 0.82}
      >
        <planeGeometry args={[16, 28]} />
        <meshStandardMaterial
          color="#0B1E24"
          roughness={0.18}
          metalness={0.3}
          emissive="#0E3A42"
          emissiveIntensity={clamp((progress - 0.66) / 0.08, 0, 1) * 0.28}
          transparent
          opacity={clamp((progress - 0.62) / 0.1, 0, 1) * (1 - clamp((progress - 0.76) / 0.06, 0, 1))}
        />
      </mesh>

      {/* Canopy leaves proxy — when in canopy world show leaf cards */}
      {progress > 0.52 && progress < 0.68 && (
        <group>
          {Array.from({ length: 14 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 12,
                9 + Math.random() * 4,
                -2 + (Math.random() - 0.5) * 10,
              ]}
              rotation={[Math.random(), Math.random(), Math.random()]}
            >
              <planeGeometry args={[0.9 + Math.random() * 0.6, 0.6 + Math.random() * 0.4]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#8A9B6E" : "#A8C090"}
                side={THREE.DoubleSide}
                transparent
                opacity={0.62}
                roughness={0.85}
              />
            </mesh>
          ))}
        </group>
      )}
    </>
  );
}
