import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SIDE_QA_URL || "http://localhost:3021";
const out = fileURLToPath(new URL("./final/", import.meta.url));
const rawDir = join(tmpdir(), "side-why-final-video");
mkdirSync(out, { recursive: true });
mkdirSync(rawDir, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const recordings = [];

// Drive native scroll in the real page. The exported recording is only trimmed and encoded.
async function scrollTo(page, target, seconds) {
  await page.evaluate(({ target, seconds }) => new Promise(resolve => {
    const from = scrollY;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - start) / (seconds * 1000));
      window.scrollTo({ top: from + (target - from) * progress, behavior: "instant" });
      if (progress < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  }), { target, seconds });
}

try {
  for (const [name, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 801, hasTouch: width < 801, recordVideo: { dir: rawDir, size: { width, height } } });
    const start = Date.now();
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`${base}/por-que-side`);
    await page.waitForSelector('[data-manifesto-opening][data-motion="ready"]');
    await page.waitForTimeout(900);
    await page.mouse.move(width - 16, 72);
    const offset = Math.max(0, (Date.now() - start) / 1000 - .4);
    await page.screenshot({ path: join(out, `${name}-opening.png`) });
    await page.waitForTimeout(500);
    const openingEnd = await page.locator("[data-manifesto-opening]").evaluate(element => element.offsetTop + element.offsetHeight - element.querySelector("[data-prototype-stage]").offsetHeight);
    await scrollTo(page, openingEnd, 15);
    await page.waitForTimeout(800);
    assert.equal(await page.locator("[data-manifesto-opening]").getAttribute("data-progress"), "1.000");
    await page.screenshot({ path: join(out, `${name}-peak.png`) });
    for (const [label, selector, seconds] of [
      ["name", "#manifesto-name", 5],
      ["principles", "[aria-labelledby=principles-heading]", 6],
      ["work", "[aria-labelledby=manifesto-work-heading]", 8],
      ["closing", "[aria-labelledby=manifesto-closing-heading]", 10],
      ["footer", "[data-final-footer]", 7],
    ]) {
      const target = await page.locator(selector).evaluate(element => element.getBoundingClientRect().top + scrollY - (element.hasAttribute("data-final-footer") ? 0 : 110));
      await scrollTo(page, target, seconds);
      await page.waitForTimeout(1100);
      await page.screenshot({ path: join(out, `${name}-${label}.png`) });
    }
    const duration = (Date.now() - start) / 1000 - offset;
    const raw = await page.video().path();
    await context.close();
    assert.deepEqual(errors, []);
    const output = join(out, `${name}.mp4`);
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-ss", String(offset), "-i", raw, "-t", String(duration), "-an", "-vf", "fps=30", "-c:v", "libx264", "-crf", "19", "-preset", "medium", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-y", output]);
    const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_name,width,height,avg_frame_rate", "-of", "json", output], { encoding: "utf8" }));
    recordings.push({ name, width, height, file: `${name}.mp4`, bytes: statSync(output).size, probe, errors });
    console.log(JSON.stringify(recordings.at(-1)));
  }
} finally {
  writeFileSync(join(out, "recordings.json"), JSON.stringify(recordings, null, 2));
  await browser.close();
}
