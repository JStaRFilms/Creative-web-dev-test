import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const baseUrl = "http://localhost:3000";
const browser = await chromium.launch({ executablePath, headless: true });
mkdirSync("screenshots/milestone-02a", { recursive: true });
mkdirSync("recordings", { recursive: true });

async function openPage(viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__JOHN_HERO__?.end);
  return page;
}

const desktop = await openPage({ width: 1440, height: 1000 });
const points = [0, 0.4, 0.63, 0.78, 1];
for (const progress of points) {
  await desktop.evaluate((value) => {
    const hero = window.__JOHN_HERO__;
    if (!hero) return;
    window.scrollTo(0, hero.start + (hero.end - hero.start) * Math.min(value, 0.9995));
  }, progress);
  await desktop.waitForTimeout(450);
  const label = progress.toFixed(2).replace(".", "-");
  await desktop.screenshot({ path: `screenshots/milestone-02a/progress-${label}.png` });
}
await desktop.close();

async function recordScroll(name, viewport, frameCount, fps) {
  const page = await openPage(viewport);
  const frameDir = path.resolve(`recordings/.${name}-frames`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir, { recursive: true });
  const bounds = await page.evaluate(() => ({
    start: window.__JOHN_HERO__?.start ?? 0,
    end: window.__JOHN_HERO__?.end ?? window.innerHeight,
    height: window.innerHeight,
  }));
  const destination = bounds.end + bounds.height;
  for (let frame = 0; frame < frameCount; frame += 1) {
    const t = frame / (frameCount - 1);
    const eased = t * t * (3 - 2 * t);
    await page.evaluate((y) => window.scrollTo(0, y), bounds.start + destination * eased);
    await page.waitForTimeout(1000 / fps);
    await page.screenshot({
      path: path.join(frameDir, `frame-${String(frame).padStart(4, "0")}.jpg`),
      type: "jpeg",
      quality: 72,
    });
  }
  await page.close();
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(fps),
    "-i", path.join(frameDir, "frame-%04d.jpg"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path.resolve(`recordings/${name}.mp4`),
  ]);
  rmSync(frameDir, { recursive: true, force: true });
}

await recordScroll("milestone-02a-desktop-scroll", { width: 1440, height: 1000 }, 96, 12);
await recordScroll("milestone-02a-mobile-scroll", { width: 390, height: 844 }, 84, 12);
await browser.close();
