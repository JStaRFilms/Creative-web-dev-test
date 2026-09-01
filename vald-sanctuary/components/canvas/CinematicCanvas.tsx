'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CinematicCanvasProps {
  progress: number;
  activeShotIndex: number;
  onLoadingProgress?: (percent: number) => void;
  onReady?: () => void;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  progress,
  activeShotIndex,
  onLoadingProgress,
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const currentDrawnFrameKey = useRef<string>('');
  const hasTriggeredReady = useRef(false);

  useEffect(() => {
    let isCancelled = false;
    const totalFrames = 600;
    let loadedCount = 0;

    const shots = [
      { folder: 'shot1', count: 120 },
      { folder: 'shot2', count: 120 },
      { folder: 'shot3', count: 120 },
      { folder: 'shot4', count: 120 },
      { folder: 'shot5', count: 120 },
    ];

    // Priority 1: Keyframe 1 of each shot (instant visual for any dimension)
    const priorityKeyframes: { folder: string; index: number }[] = shots.map((s) => ({
      folder: s.folder,
      index: 1,
    }));

    // Priority 2: Immediate landing frames (Shot 1, frames 2 to 25)
    const immediateShot1: { folder: string; index: number }[] = [];
    for (let i = 2; i <= 25; i++) {
      immediateShot1.push({ folder: 'shot1', index: i });
    }

    // Priority 3: All remaining frames across all shots
    const remainingFrames: { folder: string; index: number }[] = [];
    shots.forEach((s) => {
      const startIdx = s.folder === 'shot1' ? 26 : 2;
      for (let i = startIdx; i <= s.count; i++) {
        remainingFrames.push({ folder: s.folder, index: i });
      }
    });

    const fullQueue = [...priorityKeyframes, ...immediateShot1, ...remainingFrames];

    const loadBatch = (startIndex: number, batchSize = 12) => {
      if (isCancelled || startIndex >= fullQueue.length) return;

      const batch = fullQueue.slice(startIndex, startIndex + batchSize);
      let batchFinished = 0;

      batch.forEach((item) => {
        const frameNum = String(item.index).padStart(4, '0');
        const url = `/sequence/${item.folder}/frame_${frameNum}.webp`;
        const key = `${item.folder}_${item.index}`;

        const img = new Image();
        img.src = url;

        const onFinish = () => {
          if (isCancelled) return;
          loadedCount++;
          const pct = Math.floor((loadedCount / totalFrames) * 100);
          onLoadingProgress?.(pct);

          // INSTANT UNLOCK: As soon as the first 5 frames are ready (~300ms), unlock immediately!
          if (!hasTriggeredReady.current && loadedCount >= 5) {
            hasTriggeredReady.current = true;
            onReady?.();
          }

          batchFinished++;
          if (batchFinished === batch.length) {
            loadBatch(startIndex + batchSize, batchSize);
          }
        };

        img.onload = () => {
          imagesCacheRef.current.set(key, img);
          onFinish();
        };
        img.onerror = () => {
          onFinish();
        };
      });
    };

    loadBatch(0);

    return () => {
      isCancelled = true;
    };
  }, [onLoadingProgress, onReady]);

  // Dirty rendering: only paint when the frame index changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    }

    const totalShots = 5;
    const shotSpan = 1 / totalShots;
    const currentShotIdx = Math.min(Math.floor(progress / shotSpan), totalShots - 1);
    const folderName = `shot${currentShotIdx + 1}`;

    const localP = Math.max(0, Math.min((progress - currentShotIdx * shotSpan) / shotSpan, 1));
    const frameIndex = Math.max(1, Math.min(Math.floor(localP * 119) + 1, 120));
    const targetKey = `${folderName}_${frameIndex}`;

    // Skip redundant draws
    if (targetKey === currentDrawnFrameKey.current) return;
    currentDrawnFrameKey.current = targetKey;

    // Intelligent Fallback:
    // If target frame hasn't downloaded yet, find closest loaded frame in the same shot
    let img = imagesCacheRef.current.get(targetKey);
    if (!img) {
      // Search backwards for nearest available frame
      for (let f = frameIndex - 1; f >= 1; f--) {
        const candidate = imagesCacheRef.current.get(`${folderName}_${f}`);
        if (candidate) {
          img = candidate;
          break;
        }
      }
      // Or forward fallback / keyframe 1
      if (!img) {
        img = imagesCacheRef.current.get(`${folderName}_1`);
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (imgAspect > canvasAspect) {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
      } else {
        drawW = width;
        drawH = width / imgAspect;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{ width: '100%', height: '100%' }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 12, 10, 0.75) 100%)',
        }}
      />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
    </div>
  );
};
