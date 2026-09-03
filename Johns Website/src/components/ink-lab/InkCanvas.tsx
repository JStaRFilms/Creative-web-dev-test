"use client";

import { useEffect, useRef, useCallback } from "react";
import { PointerTracker } from "@/motion/inkPhysics";
import { INK_VERTEX_SHADER, INK_FRAGMENT_SHADER } from "@/shaders/inkDistortionShader";

export interface InkDistortionParams {
  disturbance: number;
  registration: number;
  drag: number;
  dragAngle: number;
  roughness: number;
  reveal: number;
  pointerActive: boolean;
  renderMode: "transparent" | "paper";
}

export interface InkTelemetry {
  fps: number;
  frameTimeMs: number;
  logicalWidth: number;
  logicalHeight: number;
  renderWidth: number;
  renderHeight: number;
  dpr: number;
  pointerUvX: number;
  pointerUvY: number;
  pointerVx: number;
  pointerVy: number;
  pointerSpeed: number;
  activeDisturbance: number;
}

interface InkCanvasProps {
  params: InkDistortionParams;
  onTelemetry?: (telemetry: InkTelemetry) => void;
  className?: string;
  isStackedLayout?: boolean;
}

// Distributed under-print layout across the span of JOHN
const SINGLE_LINE_MODES = [
  { text: "BUILDER", x: 0.28, y: 0.44 },
  { text: "DIRECTOR", x: 0.42, y: 0.42 },
  { text: "ENGINEER", x: 0.58, y: 0.44 },
  { text: "DESIGNER", x: 0.72, y: 0.42 },
  { text: "MUSICIAN", x: 0.35, y: 0.57 },
  { text: "EXPERIMENTER", x: 0.50, y: 0.58 },
  { text: "TEACHER", x: 0.65, y: 0.57 },
];

const STACKED_MODES = [
  { text: "BUILDER", x: 0.34, y: 0.26 },
  { text: "DIRECTOR", x: 0.48, y: 0.23 },
  { text: "MUSICIAN", x: 0.48, y: 0.32 },
  { text: "ENGINEER", x: 0.54, y: 0.66 },
  { text: "DESIGNER", x: 0.54, y: 0.74 },
  { text: "EXPERIMENTER", x: 0.68, y: 0.66 },
  { text: "TEACHER", x: 0.68, y: 0.74 },
];

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link failed:", gl.getShaderInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function InkCanvas({
  params,
  onTelemetry,
  className = "",
  isStackedLayout = false,
}: InkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTrackerRef = useRef<PointerTracker>(new PointerTracker());
  const paramsRef = useRef<InkDistortionParams>(params);
  paramsRef.current = params;

  const telemetryCallbackRef = useRef(onTelemetry);
  telemetryCallbackRef.current = onTelemetry;

  const rasterizeTexture = useCallback(
    (targetCanvas: HTMLCanvasElement, width: number, height: number, stacked: boolean) => {
      const ctx = targetCanvas.getContext("2d", { willReadFrequently: false });
      if (!ctx) return;

      targetCanvas.width = width;
      targetCanvas.height = height;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const scale = width / 1440;
      // High-resolution typographic scale matching production hero
      const baseFontSize = stacked
        ? Math.min(width * 0.44, height * 0.48)
        : Math.min(width * 0.29, height * 0.85);

      const serifFont = `400 ${baseFontSize}px "Instrument Serif", Georgia, serif`;
      const monoFont = `500 ${Math.max(12, Math.round(baseFontSize * 0.052))}px "IBM Plex Mono", monospace`;

      ctx.save();
      // Apply slight scaleX compression matching production design
      ctx.translate(width * 0.5, height * 0.5);
      ctx.scale(0.93, 1.0);
      ctx.translate(-width * 0.5, -height * 0.5);

      // 1. Red Channel = Primary Ink Layer
      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = serifFont;
      ctx.letterSpacing = "-0.065em";

      if (stacked) {
        ctx.fillText("JO", width * 0.40, height * 0.30);
        ctx.fillText("HN", width * 0.60, height * 0.70);
      } else {
        ctx.fillText("JOHN", width * 0.5, height * 0.5);
      }

      // 2. Green Channel = Proof-Red Registration Outline
      ctx.strokeStyle = "rgb(0, 255, 0)";
      ctx.lineWidth = Math.max(1.4, 2.0 * scale);
      ctx.font = serifFont;
      ctx.letterSpacing = "-0.065em";

      if (stacked) {
        ctx.strokeText("JO", width * 0.40, height * 0.30);
        ctx.strokeText("HN", width * 0.60, height * 0.70);
      } else {
        ctx.strokeText("JOHN", width * 0.5, height * 0.5);
      }

      ctx.restore();

      // 3. Blue Channel = Distributed Under-Print Modes
      ctx.fillStyle = "rgb(0, 0, 255)";
      ctx.font = monoFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0.065em";

      const modesList = stacked ? STACKED_MODES : SINGLE_LINE_MODES;
      modesList.forEach((mode) => {
        ctx.fillText(mode.text, width * mode.x, height * mode.y);
      });

      ctx.globalCompositeOperation = "source-over";
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });

    if (!gl) {
      console.error("WebGL2 not supported on this browser.");
      return;
    }

    const program = createProgram(gl, INK_VERTEX_SHADER, INK_FRAGMENT_SHADER);
    if (!program) return;

    gl.useProgram(program);

    // Screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTexLoc = gl.getUniformLocation(program, "u_tex");
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uAspectLoc = gl.getUniformLocation(program, "u_aspect");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uDisturbLoc = gl.getUniformLocation(program, "u_disturbance");
    const uRegLoc = gl.getUniformLocation(program, "u_registration");
    const uDragLoc = gl.getUniformLocation(program, "u_drag");
    const uDragAngleLoc = gl.getUniformLocation(program, "u_dragAngle");
    const uRoughLoc = gl.getUniformLocation(program, "u_roughness");
    const uRevealLoc = gl.getUniformLocation(program, "u_reveal");
    const uPtrLoc = gl.getUniformLocation(program, "u_pointer");
    const uVelLoc = gl.getUniformLocation(program, "u_velocity");
    const uSpeedLoc = gl.getUniformLocation(program, "u_speed");
    const uPtrActiveLoc = gl.getUniformLocation(program, "u_pointerActive");
    const uRenderModeLoc = gl.getUniformLocation(program, "u_renderMode");

    // Texture creation
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const offscreenCanvas = document.createElement("canvas");

    let animationFrameId = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let currentFps = 60;
    let currentFrameTime = 16.6;

    const tracker = pointerTrackerRef.current;

    const updateTexture = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.max(1, Math.round(rect.width * dpr));
      const displayH = Math.max(1, Math.round(rect.height * dpr));

      canvas.width = displayW;
      canvas.height = displayH;
      gl.viewport(0, 0, displayW, displayH);

      rasterizeTexture(offscreenCanvas, displayW, displayH, isStackedLayout);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreenCanvas);
    };

    // Ensure fonts are loaded before rasterizing
    if (typeof document !== "undefined" && "fonts" in document) {
      Promise.all([
        document.fonts.load('400 120px "Instrument Serif"'),
        document.fonts.load('500 20px "IBM Plex Mono"'),
        document.fonts.ready,
      ]).then(() => {
        updateTexture();
      });
    }

    updateTexture();
    const resizeObserver = new ResizeObserver(() => updateTexture());
    resizeObserver.observe(canvas);

    const render = (now: number) => {
      const delta = Math.max(1, now - lastTime);
      lastTime = now;
      frameCount += 1;

      if (now - lastFpsUpdate >= 250) {
        currentFps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        currentFrameTime = parseFloat((delta).toFixed(1));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      const pState = tracker.update(now);
      const p = paramsRef.current;

      gl.useProgram(program);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTexLoc, 0);

      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform1f(uAspectLoc, canvas.width / Math.max(1, canvas.height));
      gl.uniform1f(uTimeLoc, now * 0.001);

      gl.uniform1f(uDisturbLoc, p.disturbance);
      gl.uniform1f(uRegLoc, p.registration);
      gl.uniform1f(uDragLoc, p.drag);
      gl.uniform1f(uDragAngleLoc, p.dragAngle);
      gl.uniform1f(uRoughLoc, p.roughness);
      gl.uniform1f(uRevealLoc, p.reveal);

      const pointerEnabled = p.pointerActive ? 1.0 : 0.0;
      gl.uniform2f(uPtrLoc, pState.x, pState.y);
      gl.uniform2f(uVelLoc, pState.vx, pState.vy);
      gl.uniform1f(uSpeedLoc, pState.speed);
      gl.uniform1f(uPtrActiveLoc, pState.active ? pointerEnabled : 0.0);
      gl.uniform1i(uRenderModeLoc, p.renderMode === "paper" ? 1 : 0);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (telemetryCallbackRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        telemetryCallbackRef.current({
          fps: currentFps,
          frameTimeMs: currentFrameTime,
          logicalWidth: Math.round(canvas.width / dpr),
          logicalHeight: Math.round(canvas.height / dpr),
          renderWidth: canvas.width,
          renderHeight: canvas.height,
          dpr,
          pointerUvX: parseFloat(pState.x.toFixed(3)),
          pointerUvY: parseFloat(pState.y.toFixed(3)),
          pointerVx: parseFloat(pState.vx.toFixed(3)),
          pointerVy: parseFloat(pState.vy.toFixed(3)),
          pointerSpeed: parseFloat(pState.speed.toFixed(3)),
          activeDisturbance: parseFloat(p.disturbance.toFixed(3)),
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(createShader(gl, gl.VERTEX_SHADER, INK_VERTEX_SHADER));
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(texture);
    };
  }, [rasterizeTexture, isStackedLayout]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !params.pointerActive) return;
    const rect = canvasRef.current.getBoundingClientRect();
    pointerTrackerRef.current.onPointerMove(e.clientX, e.clientY, rect, performance.now());
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !params.pointerActive) return;
    const rect = canvasRef.current.getBoundingClientRect();
    pointerTrackerRef.current.onPointerEnter(e.clientX, e.clientY, rect);
  };

  const handlePointerLeave = () => {
    pointerTrackerRef.current.onPointerLeave();
  };

  return (
    <canvas
      ref={canvasRef}
      className={`ink-canvas ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    />
  );
}
