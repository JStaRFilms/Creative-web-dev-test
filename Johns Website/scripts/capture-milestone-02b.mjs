import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = "http://localhost:3000/lab/ink";
const browser = await chromium.launch({ executablePath, headless: true });

mkdirSync("screenshots/milestone-02b", { recursive: true });
mkdirSync("recordings", { recursive: true });

async function openLabPage(viewport = { width: 1440, height: 1000 }) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForFunction(() => typeof window.__INK_LAB__ !== "undefined");
  await page.evaluate(async () => {
    await document.fonts.load('400 120px "Instrument Serif"');
    await document.fonts.ready;
  });
  await page.waitForTimeout(600); // Allow fonts and canvas to settle
  return page;
}

console.log("1. Capturing Static Disturbance Tiers...");

// Tier 1: Clean JOHN (Disturbance 0)
const page = await openLabPage();
await page.evaluate(() => {
  window.__INK_LAB__?.setParams({
    disturbance: 0.0,
    registration: 0.0,
    drag: 0.0,
    dragAngle: 25,
    roughness: 0.0,
    reveal: 0.0,
    pointerActive: false,
    renderMode: "paper",
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/milestone-02b/01-clean-disturbance-0.png" });
console.log("✓ Captured 01-clean-disturbance-0.png");

// Tier 2: Mild Disturbance (~0.30)
await page.evaluate(() => {
  window.__INK_LAB__?.setParams({
    disturbance: 0.30,
    registration: 0.35,
    drag: 0.25,
    dragAngle: 15,
    roughness: 0.22,
    reveal: 0.18,
    pointerActive: false,
    renderMode: "paper",
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/milestone-02b/02-mild-disturbance.png" });
console.log("✓ Captured 02-mild-disturbance.png");

// Tier 3: Medium Disturbance (~0.60)
await page.evaluate(() => {
  window.__INK_LAB__?.setParams({
    disturbance: 0.60,
    registration: 0.65,
    drag: 0.55,
    dragAngle: 25,
    roughness: 0.48,
    reveal: 0.55,
    pointerActive: false,
    renderMode: "paper",
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/milestone-02b/03-medium-disturbance.png" });
console.log("✓ Captured 03-medium-disturbance.png");

// Tier 4: Maximum Acceptable Disturbance (~0.90)
await page.evaluate(() => {
  window.__INK_LAB__?.setParams({
    disturbance: 0.90,
    registration: 0.88,
    drag: 0.82,
    dragAngle: 35,
    roughness: 0.70,
    reveal: 0.85,
    pointerActive: false,
    renderMode: "paper",
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: "screenshots/milestone-02b/04-maximum-disturbance.png" });
console.log("✓ Captured 04-maximum-disturbance.png");

await page.close();

// Helper to record MP4 from canvas frames
async function recordSequence(name, viewport, frameCount, fps, updateFn) {
  console.log(`Recording sequence: ${name} (${frameCount} frames at ${fps} fps)...`);
  const recordPage = await openLabPage(viewport);
  const frameDir = path.resolve(`recordings/.${name}-frames`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir, { recursive: true });

  for (let frame = 0; frame < frameCount; frame += 1) {
    const t = frame / (frameCount - 1);
    await updateFn(recordPage, t, frame);
    await recordPage.waitForTimeout(1000 / fps);
    await recordPage.screenshot({
      path: path.join(frameDir, `frame-${String(frame).padStart(4, "0")}.jpg`),
      type: "jpeg",
      quality: 78,
    });
  }

  await recordPage.close();

  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(fps),
    "-i", path.join(frameDir, "frame-%04d.jpg"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path.resolve(`recordings/${name}.mp4`),
  ]);
  rmSync(frameDir, { recursive: true, force: true });
  console.log(`✓ Generated recordings/${name}.mp4`);
}

// Recording 1: Controls Sweep (0.0 -> 0.95 -> 0.0)
await recordSequence("milestone-02b-controls-sweep", { width: 1440, height: 1000 }, 80, 15, async (p, t) => {
  // Smooth sine wave progress up and down
  const curve = Math.sin(t * Math.PI);
  await p.evaluate((val) => {
    window.__INK_LAB__?.setParams({
      disturbance: val,
      registration: val * 0.9,
      drag: val * 0.8,
      dragAngle: 15 + val * 25,
      roughness: 0.08 + val * 0.65,
      reveal: val * 0.8,
      pointerActive: false,
    });
  }, curve);
});

// Recording 2: Interactive Pointer Drag & Smear
await recordSequence("milestone-02b-pointer-interaction", { width: 1440, height: 1000 }, 90, 15, async (p, t) => {
  const canvasEl = p.locator(".lab-canvas-wrapper");
  const box = await canvasEl.boundingBox();
  if (!box) return;

  // Set base mild disturbance
  await p.evaluate(() => {
    window.__INK_LAB__?.setParams({
      disturbance: 0.35,
      registration: 0.4,
      drag: 0.3,
      dragAngle: 20,
      roughness: 0.25,
      reveal: 0.2,
      pointerActive: true,
    });
  });

  // Calculate mouse path across the canvas
  // Path sweeps horizontally through the middle of the JOHN letters
  if (t < 0.1) {
    // idle start
  } else if (t < 0.75) {
    const sweepT = (t - 0.1) / 0.65;
    const x = box.x + box.width * (0.2 + sweepT * 0.6);
    const y = box.y + box.height * (0.45 + Math.sin(sweepT * Math.PI * 3) * 0.12);
    await p.mouse.move(x, y);
  } else {
    // move pointer away and let it settle
    const settleT = (t - 0.75) / 0.25;
    const x = box.x + box.width * (0.8 + settleT * 0.3);
    const y = box.y + box.height * 0.45;
    await p.mouse.move(x, y);
  }
});

await browser.close();
console.log("All Milestone 02B captures completed successfully.");
