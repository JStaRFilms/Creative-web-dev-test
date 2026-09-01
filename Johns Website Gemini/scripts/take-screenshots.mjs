import puppeteer from "puppeteer";
import { spawn, execSync } from "child_process";
import fs from "fs";
import path from "path";
import net from "net";

const screenshotsDir = path.resolve("./screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Get a guaranteed free port
function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

// Wait for server to become responsive
async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} failed to start in ${timeout}ms`);
}

async function run() {
  const port = await getFreePort();
  console.log(`Starting Next.js production server on port ${port}...`);

  const nextServer = spawn("node", ["./node_modules/next/dist/bin/next", "start", "-p", String(port)], {
    stdio: "inherit",
  });

  const pid = nextServer.pid;

  try {
    const serverUrl = `http://localhost:${port}`;
    await waitForServer(serverUrl);
    console.log(`Server is ready on ${serverUrl}! Launching headless Chrome...`);

    const browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // 1. Desktop 1920x1080 Viewport
    console.log("Navigating desktop viewport (1920x1080)...");
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await desktopPage.goto(serverUrl, { waitUntil: "networkidle0" });
    await desktopPage.evaluateHandle("document.fonts.ready");
    await new Promise((r) => setTimeout(r, 1200));

    console.log("Capturing Desktop Hero...");
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, "01_desktop_hero.png"),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });

    const workElement = await desktopPage.$("#work");
    if (workElement) {
      console.log("Capturing Desktop Selected Work...");
      await workElement.screenshot({
        path: path.join(screenshotsDir, "02_desktop_selected_work.png"),
      });
    }

    const meloElement = await desktopPage.$("#melo");
    if (meloElement) {
      console.log("Capturing Desktop Melo Opening...");
      await meloElement.screenshot({
        path: path.join(screenshotsDir, "03_desktop_melo.png"),
      });
    }

    console.log("Capturing Desktop Full Page...");
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, "04_desktop_full_page.png"),
      fullPage: true,
    });
    await desktopPage.close();

    // 2. Mobile 390x844 Viewport (iPhone 14)
    console.log("Navigating mobile viewport (390x844)...");
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await mobilePage.goto(serverUrl, { waitUntil: "networkidle0" });
    await mobilePage.evaluateHandle("document.fonts.ready");
    await new Promise((r) => setTimeout(r, 1200));

    console.log("Capturing Mobile Hero...");
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, "05_mobile_hero.png"),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });

    console.log("Capturing Mobile Full Page...");
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, "06_mobile_full_page.png"),
      fullPage: true,
    });
    await mobilePage.close();

    await browser.close();
    console.log("All screenshots successfully captured in ./screenshots/");
  } finally {
    if (pid) {
      try {
        execSync(`taskkill /F /T /PID ${pid}`);
      } catch (e) {
        // ignore
      }
    }
  }
}

run().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
