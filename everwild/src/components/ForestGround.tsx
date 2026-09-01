"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function ForestGround() {
  const groundGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 400, 60, 200);
    geo.rotateX(-Math.PI / 2);

    // Add subtle terrain undulation
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const noise =
        Math.sin(x * 0.5) * 0.3 +
        Math.cos(z * 0.3) * 0.4 +
        Math.sin(x * 1.2 + z * 0.8) * 0.15;
      positions.setY(i, noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={groundGeometry} position={[0, -0.5, -80]} receiveShadow>
      <meshStandardMaterial
        color="#1a2a14"
        roughness={0.95}
        metalness={0.0}
      />
    </mesh>
  );
}
