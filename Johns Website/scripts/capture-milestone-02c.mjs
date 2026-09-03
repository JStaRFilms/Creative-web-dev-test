import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const baseUrl = process.env.CAPTURE_URL ?? "http://localhost:3000";
mkdirSync("screenshots/milestone-02c", { recursive: true });
mkdirSync("recordings", { recursive: true });

async function openPage(viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__JOHN_HERO__?.end && document.querySelector(".hero-ink-canvas")?.dataset.inkReady === "true");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  return page;
}

async function setProgress(page, progress) {
  await page.evaluate((value) => {
    const hero = window.__JOHN_HERO__;
    if (hero) window.scrollTo(0, hero.start + (hero.end - hero.start) * Math.min(value, 0.9995));
  }, progress);
  await page.waitForTimeout(350);
}

const desktop = await openPage({ width: 1440, height: 1000 });
for (const [name, progress] of [["rest", 0], ["disturb", 0.4], ["reveal", 0.63], ["reconstruct", 0.78], ["selected-work", 1]]) {
  await setProgress(desktop, progress);
  await desktop.screenshot({ path: `screenshots/milestone-02c/${name}.png` });
}
await desktop.close();

async function record(name, viewport, frames, fps, update) {
  const page = await openPage(viewport);
  const frameDir = path.resolve(`recordings/.${name}-frames`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir, { recursive: true });
  for (let frame = 0; frame < frames; frame += 1) {
    await update(page, frame / (frames - 1));
    await page.waitForTimeout(1000 / fps);
    await page.screenshot({ path: path.join(frameDir, `frame-${String(frame).padStart(4, "0")}.jpg`), type: "jpeg", quality: 76 });
  }
  await page.close();
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(fps), "-i", path.join(frameDir, "frame-%04d.jpg"), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.resolve(`recordings/${name}.mp4`)]);
  rmSync(frameDir, { recursive: true, force: true });
}

await record("milestone-02c-desktop-full", { width: 1440, height: 1000 }, 96, 12, async (page, t) => {
  const destination = await page.evaluate(() => (window.__JOHN_HERO__?.end ?? 0) + innerHeight);
  const eased = t * t * (3 - 2 * t);
  await page.evaluate((y) => scrollTo(0, y), destination * eased);
});

await record("milestone-02c-desktop-pointer-states", { width: 1440, height: 1000 }, 96, 12, async (page, t) => {
  const stateProgress = t < 0.5 ? 0.4 : 0.63;
  await page.evaluate((progress) => {
    const hero = window.__JOHN_HERO__;
    if (hero) scrollTo(0, hero.start + (hero.end - hero.start) * progress);
  }, stateProgress);
  const box = await page.locator(".hero-ink-canvas").boundingBox();
  if (!box) return;
  const phase = (t % 0.5) / 0.5;
  if (phase < 0.72) {
    const sweep = phase / 0.72;
    await page.mouse.move(box.x + box.width * (0.18 + sweep * 0.64), box.y + box.height * (0.42 + Math.sin(sweep * Math.PI * 2) * 0.1));
  } else {
    await page.mouse.move(box.x + box.width + 30, box.y + box.height * 0.5);
  }
});

await record("milestone-02c-mobile-integrated", { width: 390, height: 844 }, 84, 12, async (page, t) => {
  const destination = await page.evaluate(() => (window.__JOHN_HERO__?.end ?? 0) + innerHeight);
  const eased = t * t * (3 - 2 * t);
  await page.evaluate((y) => scrollTo(0, y), destination * eased);
});

await browser.close();
console.log("Milestone 02C screenshots and recordings captured.");
