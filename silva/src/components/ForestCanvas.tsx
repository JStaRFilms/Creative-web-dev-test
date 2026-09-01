"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import ForestScene from "./ForestScene";

// Catmull curve through the forest
function useCameraPath() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector3(0, 2.2, 70),
      new THREE.Vector3(3, 1.8, 30),
      new THREE.Vector3(-4, 2.6, -10),
      new THREE.Vector3(6, 1.4, -55),
      new THREE.Vector3(-5, 1.9, -105),
      new THREE.Vector3(2, 3.4, -155),
      new THREE.Vector3(0, 4.2, -210),
      new THREE.Vector3(0, 2.0, -260),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  }, []);
}

function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const curve = useCameraPath();
  const lookTarget = useRef(new THREE.Vector3());
  const smoothProgress = useRef(0);

  // Preallocate vectors outside frame
  const camPos = useRef(new THREE.Vector3());
  const lookPos = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // lerp progress for buttery feel
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, progress.current, 1 - Math.pow(0.001, delta * 60));
    const t = THREE.MathUtils.clamp(smoothProgress.current, 0, 0.999);

    curve.getPointAt(t, camPos.current);
    // gentle sway
    camPos.current.x += Math.sin(t * Math.PI * 4) * 0.6;
    camPos.current.y += Math.sin(t * Math.PI * 2.2) * 0.5;

    // look ahead along curve
    const ahead = Math.min(t + 0.03, 0.999);
    curve.getPointAt(ahead, lookPos.current);
    lookPos.current.y -= 0.8;

    camera.position.lerp(camPos.current, 0.22);
    lookTarget.current.lerp(lookPos.current, 0.12);
    (camera as THREE.PerspectiveCamera).lookAt(lookTarget.current);
  });
  return null;
}

export default function ForestCanvas({ progress }: { progress: React.MutableRefObject<number> }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 2, 70], fov: 52, near: 0.1, far: 800 }}
        shadows="soft"
        onCreated={({ gl }) => {
          // three r185 deprecated PCFSoftShadowMap — use PCFShadowMap (still soft via shadow map size + blur via soft shadows prop)
          gl.shadowMap.type = THREE.PCFShadowMap;
          gl.shadowMap.enabled = true;
        }}
      >
        <CameraRig progress={progress} />
        <Suspense fallback={null}>
          <ForestScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
