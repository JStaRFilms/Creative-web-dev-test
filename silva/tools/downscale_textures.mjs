// Downscales the 4K/6K textures you copied to 2K web-ready JPGs
// Run: node tools/downscale_textures.mjs
// Requires: pnpm add -D sharp
import sharp from "sharp";
import { existsSync } from "fs";
import path from "path";

const jobs = [
  ["public/textures/bark/bark_basecolor.jpg", 2048, 82],
  ["public/textures/bark/bark_normal.png", 2048, 82],
  ["public/textures/bark/bark_roughness.png", 2048, 80],
  ["public/textures/bark/bark_ao.png", 2048, 80],
  ["public/textures/ground/ground_diff.jpg", 2048, 82],
  ["public/textures/ground/ground_rough.jpg", 2048, 80],
];

for (const [rel, size, q] of jobs) {
  if (!existsSync(rel)) { console.log(`skip missing ${rel}`); continue; }
  const out = rel.replace(/(\.\w+)$/, `_2k$1`).replace("_2k.jpg","_2k.jpg");
  console.log(`downscaling ${rel} -> ${out} (${size}px)`);
  await sharp(rel).resize(size, size, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: q }).toFile(out).catch(async () => {
    await sharp(rel).resize(size, size, { fit: "inside" }).png({ quality: 80 }).toFile(out.replace(".jpg",".png"));
  });
}
console.log("Done. Update ForestScene.tsx to point to *_2k.jpg for perf.");
