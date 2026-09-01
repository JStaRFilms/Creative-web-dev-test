import { chromium } from "playwright-core";
import path from "node:path";

const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath, headless: true });
const captures = [
  ["#top", "01-desktop-hero.png", { width: 1440, height: 1000 }],
  ["#work", "02-desktop-selected-work.png", { width: 1440, height: 1000 }],
  ["#melo", "03-desktop-melo.png", { width: 1440, height: 1000 }],
  ["#top", "04-mobile-hero.png", { width: 390, height: 844 }],
];
for (const [selector, file, viewport] of captures) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.resolve("screenshots", file) });
  await page.close();
}
await browser.close();
