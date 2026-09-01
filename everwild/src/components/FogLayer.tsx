"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FogLayer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#2a4a3a") },
        uOpacity: { value: 0.15 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 0.3 + pos.z * 0.2) * 1.5;
          wave += cos(pos.z * 0.15) * 0.8;
          pos.y += wave;
          vElevation = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        varying float vElevation;

        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float fade = 1.0 - smoothstep(0.0, 1.0, dist);

          float n = noise(vUv * 3.0 + uTime * 0.1);
          float alpha = fade * uOpacity * (0.7 + n * 0.3);

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    material.uniforms.uTime.value = timeRef.current;
  });

  return (
    <group>
      {/* Low fog banks */}
      {[0, -40, -80, -120, -160, -200].map((z, i) => (
        <mesh
          key={i}
          ref={i === 0 ? meshRef : undefined}
          position={[0, 0.5, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={material}
        >
          <planeGeometry args={[60, 30, 32, 32]} />
        </mesh>
      ))}
    </group>
  );
}
