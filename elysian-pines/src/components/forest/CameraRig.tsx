"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "../../store/scroll";

/**
 * Drives the camera along a winding path through the forest as the shared
 * scroll progress advances. Uses damped interpolation so the motion feels
 * like a slow, weighty fly-through.
 */
export function CameraRig() {
  const { camera } = useThree();

  const pose = useMemo(() => ({
    pos: new THREE.Vector3(0, 3.4, 4),
    look: new THREE.Vector3(0, 3.2, -4),
  }), []);

  useFrame(() => {
    const { progress } = scrollStore;

    // Path down the -Z axis with a swelling lateral meander and a gentle rise.
    const z = -28 - progress * 240;
    const x = Math.sin(progress * Math.PI * 3.2) * (0.2 + progress * 7);
    const y = 3.2 + Math.sin(progress * Math.PI * 2.1) * 1.2 + progress * 2.5;

    const lookZ = z - 9;
    const lookX = Math.sin((Math.min(progress + 0.05, 1)) * Math.PI * 3.2) * (0.2 + Math.min(progress + 0.05, 1) * 7);
    const lookY = y - 0.3;

    const damp = 0.05;
    pose.pos.x = x;
    pose.pos.y = y;
    pose.pos.z = z;
    pose.look.set(lookX, lookY, lookZ);

    camera.position.lerp(pose.pos, damp);
    camera.lookAt(pose.look);
  });

  return null;
}
