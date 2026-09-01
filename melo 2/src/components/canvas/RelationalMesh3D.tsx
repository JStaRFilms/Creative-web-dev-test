"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface RelationalMesh3DProps {
  scrollProgress: number;
  activeBeat: number;
}

export const RelationalMesh3D: React.FC<RelationalMesh3DProps> = ({
  scrollProgress,
  activeBeat,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 32;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    groupRef.current = rootGroup;

    // Center Node: The Student
    const centerGeom = new THREE.SphereGeometry(1.6, 32, 32);
    const centerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF5A1F"),
      wireframe: true,
    });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    rootGroup.add(centerMesh);

    // Orbiting Domain Nodes
    const domainColors = ["#142E28", "#FF5A1F", "#767A80", "#C86432", "#111214", "#9B9FA6"];
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeCount = 12;
    const orbitRadius = 14;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const elevation = (Math.sin(i * 1.5) * Math.PI) / 4;
      const x = Math.cos(angle) * Math.cos(elevation) * orbitRadius;
      const y = Math.sin(elevation) * orbitRadius * 0.7;
      const z = Math.sin(angle) * Math.cos(elevation) * orbitRadius;

      const nodeGeom = new THREE.IcosahedronGeometry(0.8, 1);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(domainColors[i % domainColors.length]),
        wireframe: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(x, y, z);
      rootGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // Dynamic Connecting Lines
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const p = nodeMeshes[i].position;
      // Connect center to node
      linePositions.push(0, 0, 0, p.x, p.y, p.z);
      // Connect adjacent nodes
      const nextP = nodeMeshes[(i + 1) % nodeCount].position;
      linePositions.push(p.x, p.y, p.z, nextP.x, nextP.y, nextP.z);
    }

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#111214"),
      transparent: true,
      opacity: 0.18,
    });
    const lineSegments = new THREE.LineSegments(lineGeom, lineMat);
    rootGroup.add(lineSegments);

    // Mouse Tracking
    const onPointerMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (rootGroup) {
        rootGroup.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.4;
        rootGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + mouseRef.current.y * 0.3;

        // Pulse center node
        const pulse = 1 + Math.sin(elapsedTime * 2) * 0.08;
        centerMesh.scale.set(pulse, pulse, pulse);

        // Orbit individual nodes
        nodeMeshes.forEach((mesh, idx) => {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.015;
          const offset = Math.sin(elapsedTime * 1.5 + idx) * 0.3;
          mesh.position.y += offset * 0.02;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      centerGeom.dispose();
      centerMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        activeBeat === 6 ? "opacity-90" : "opacity-35"
      }`}
      aria-hidden="true"
    />
  );
};
