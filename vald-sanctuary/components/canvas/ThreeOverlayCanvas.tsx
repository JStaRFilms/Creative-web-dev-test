'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeOverlayCanvasProps {
  progress: number;
}

export const ThreeOverlayCanvas: React.FC<ThreeOverlayCanvasProps> = ({ progress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Ingest forest_slope_1k.exr for photorealistic PBR lighting & reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new EXRLoader().load(
      '/assets/forest_slope_1k.exr',
      (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      },
      undefined,
      (err) => console.warn('EXR environment fallback:', err)
    );

    // Dynamic 3D Lantern Group
    const lanternGroup = new THREE.Group();
    // Scale lantern comfortably in lower right
    lanternGroup.scale.set(0.045, 0.045, 0.045);
    lanternGroup.position.set(3.0, -1.8, 0.0);
    scene.add(lanternGroup);

    // Warm Interior Hearth Light
    const lanternLight = new THREE.PointLight('#FFA74F', 2.0, 6);
    lanternLight.position.set(0, 4, 0);
    lanternGroup.add(lanternLight);

    let lanternMesh: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/expedition_lantern.glb',
      (gltf) => {
        lanternMesh = gltf.scene;
        const box = new THREE.Box3().setFromObject(lanternMesh);
        const center = box.getCenter(new THREE.Vector3());
        lanternMesh.position.sub(center);
        lanternGroup.add(lanternMesh);
      },
      undefined,
      (err) => console.warn('Lantern load fallback:', err)
    );

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight('#FFF3E0', 1.2);
    keyLight.position.set(4, 6, 3);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight('#18261F', 0.5));

    // Pointer Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointerMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const startTime = performance.now();
    let animId: number;
    let currentY = -1.8;
    let currentGlow = 2.0;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) * 0.001;
      const p = progressRef.current;

      // Organic gentle sway
      const swayZ = Math.sin(elapsed * 1.2) * 0.04;
      const swayX = Math.cos(elapsed * 1.0) * 0.03;
      lanternGroup.rotation.z = swayZ + mouseX * 0.08;
      lanternGroup.rotation.x = swayX + mouseY * 0.06;

      // Smooth gradual rotation over scroll (instead of abrupt jumps)
      lanternGroup.rotation.y = THREE.MathUtils.lerp(lanternGroup.rotation.y, p * Math.PI * 1.5 + elapsed * 0.1, 0.05);

      // Smooth lantern glow timing: increases gracefully at dusk/horizon (progress > 0.6)
      const targetGlow = p > 0.6 ? 4.5 : 2.0;
      currentGlow = THREE.MathUtils.lerp(currentGlow, targetGlow, 0.03);
      lanternLight.intensity = currentGlow + Math.sin(elapsed * 2.5) * 0.25;

      // Smooth vertical breathing motion
      const targetY = -1.8 + Math.sin(elapsed * 1.5) * 0.06;
      currentY = THREE.MathUtils.lerp(currentY, targetY, 0.05);
      lanternGroup.position.y = currentY;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
