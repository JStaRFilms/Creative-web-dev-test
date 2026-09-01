"use client";
import { useMemo, useLayoutEffect } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

export function ForestHDRI() {
  return (
    <Environment
      files="/hdri/forest_slope_1k.exr"
      background={false}
      environmentIntensity={0.55}
      environmentRotation={[0, Math.PI * 0.3, 0]}
    />
  );
}

function useNormalizedScene(scene: THREE.Group, targetScale: number) {
  const clone = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    c.scale.setScalar(targetScale / maxDim);
    const box2 = new THREE.Box3().setFromObject(c);
    c.position.y -= box2.min.y;
    return c;
  }, [scene, targetScale]);
  return clone;
}

export function RealCabin({ position = [18, -4.2, -40] as [number, number, number], scale = 3.0 }) {
  const { scene } = useGLTF("/cabin.glb");
  const normalized = useNormalizedScene(scene, scale);
  useLayoutEffect(() => {
    normalized.traverse((o: THREE.Object3D) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.castShadow = true;
        m.receiveShadow = true;
        if (m.material) {
          const mat = m.material as THREE.MeshStandardMaterial;
          if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
        }
      }
    });
  }, [normalized]);
  return (
    <group position={position as unknown as THREE.Vector3} rotation={[0, 0.3, 0]}>
      <primitive object={normalized} />
      <pointLight position={[0, 0.8, 0]} intensity={14} distance={10} color="#FF8C42" decay={2} />
    </group>
  );
}

export function RealBridge({ position = [0, -5.1, -18] as [number, number, number] }) {
  const { scene } = useGLTF("/bridge_over_a_river.glb");
  const normalized = useNormalizedScene(scene, 18);
  useLayoutEffect(() => {
    normalized.traverse((o: THREE.Object3D) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).castShadow = true;
        (o as THREE.Mesh).receiveShadow = true;
      }
    });
  }, [normalized]);
  return (
    <group position={position as unknown as THREE.Vector3}>
      <primitive object={normalized} />
    </group>
  );
}

useGLTF.preload("/cabin.glb");
useGLTF.preload("/bridge_over_a_river.glb");
