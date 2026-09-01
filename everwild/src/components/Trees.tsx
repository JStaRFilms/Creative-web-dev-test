"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TreeProps {
  scrollProgress: React.RefObject<number>;
}

function TreeInstance({
  position,
  scale,
  rotationY,
  trunkColor,
  canopyColor,
}: {
  position: [number, number, number];
  scale: number;
  rotationY: number;
  trunkColor: string;
  canopyColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const trunkGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.15 * scale, 0.25 * scale, 4 * scale, 6);
    return geo;
  }, [scale]);

  const canopyGeometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.8 * scale, 5 * scale, 7);
    return geo;
  }, [scale]);

  const canopy2Geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1.3 * scale, 3.5 * scale, 7);
    return geo;
  }, [scale]);

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Trunk */}
      <mesh geometry={trunkGeometry} position={[0, 2 * scale, 0]} castShadow>
        <meshStandardMaterial
          color={trunkColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Lower canopy */}
      <mesh geometry={canopyGeometry} position={[0, 5.5 * scale, 0]} castShadow>
        <meshStandardMaterial
          color={canopyColor}
          roughness={0.8}
          metalness={0.0}
          flatShading
        />
      </mesh>

      {/* Upper canopy */}
      <mesh
        geometry={canopy2Geometry}
        position={[0, 8 * scale, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={canopyColor}
          roughness={0.8}
          metalness={0.0}
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function Trees({ scrollProgress }: TreeProps) {
  const treesData = useMemo(() => {
    const trees: {
      position: [number, number, number];
      scale: number;
      rotationY: number;
      trunkColor: string;
      canopyColor: string;
    }[] = [];

    const trunkColors = ["#3d2b1f", "#4a3728", "#2d1f14", "#5a4030"];
    const canopyColors = [
      "#1a3a1a",
      "#2d5a2d",
      "#1a4a2a",
      "#2a5030",
      "#1a3020",
      "#3a6a3a",
    ];

    // Generate trees along the path
    for (let i = 0; i < 150; i++) {
      const z = -i * 2.5 + Math.random() * 5;
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (3 + Math.random() * 25);
      const scale = 0.6 + Math.random() * 1.8;
      const rotationY = Math.random() * Math.PI * 2;

      trees.push({
        position: [x, 0, z],
        scale,
        rotationY,
        trunkColor: trunkColors[Math.floor(Math.random() * trunkColors.length)],
        canopyColor:
          canopyColors[Math.floor(Math.random() * canopyColors.length)],
      });
    }

    // Dense canopy trees close to path
    for (let i = 0; i < 60; i++) {
      const z = -i * 4 + Math.random() * 3;
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (2 + Math.random() * 6);
      const scale = 0.8 + Math.random() * 1.2;

      trees.push({
        position: [x, 0, z],
        scale,
        rotationY: Math.random() * Math.PI * 2,
        trunkColor: trunkColors[Math.floor(Math.random() * trunkColors.length)],
        canopyColor:
          canopyColors[Math.floor(Math.random() * canopyColors.length)],
      });
    }

    return trees;
  }, []);

  return (
    <group>
      {treesData.map((tree, i) => (
        <TreeInstance
          key={i}
          position={tree.position}
          scale={tree.scale}
          rotationY={tree.rotationY}
          trunkColor={tree.trunkColor}
          canopyColor={tree.canopyColor}
        />
      ))}
    </group>
  );
}
