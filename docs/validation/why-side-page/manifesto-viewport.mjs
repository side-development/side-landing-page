import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${process.env.SIDE_QA_URL || "http://localhost:3019"}/por-que-side`);
  await page.waitForSelector('[data-manifesto-opening][data-motion="ready"]');
  await page.setViewportSize({ width: 390, height: 500 });
  await page.waitForTimeout(500);
  assert.equal(await page.locator("[data-prototype-stage]").evaluate(element => element.offsetHeight), 500, "Narrow desktop windows must respond to height changes");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.setViewportSize({ width: 740, height: 390 });
  await page.waitForTimeout(700);
  const stage = await page.locator("[data-prototype-stage]").evaluate(element => ({ height: element.offsetHeight, viewport: innerHeight }));
  assert.equal(stage.height, stage.viewport, "Width/orientation changes must remeasure the mobile stage");
  await page.evaluate(() => {
    const opening = document.querySelector("[data-manifesto-opening]");
    scrollTo({ top: opening.offsetTop + opening.offsetHeight - document.querySelector("[data-prototype-stage]").offsetHeight, behavior: "instant" });
  });
  await page.waitForTimeout(700);
  const state = await page.locator("[data-prototype-art]").evaluate(element => ({
    art: element.getBoundingClientRect().toJSON(),
    text: [...element.querySelectorAll("[data-new-word], [data-second-type]")].map(node => node.getBoundingClientRect().toJSON()),
  }));
  for (const text of state.text) assert.ok(text.left >= 0 && text.right <= state.art.right + 1, "Resized text stays inside the art");
  console.log("PASS same-breakpoint orientation: stage and final typography");
  await page.close();
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await touch.goto(`${process.env.SIDE_QA_URL || "http://localhost:3019"}/por-que-side`);
  await touch.waitForSelector('[data-manifesto-opening][data-motion="ready"]');
  await touch.setViewportSize({ width: 390, height: 780 });
  await touch.waitForTimeout(400);
  assert.equal(await touch.locator("[data-prototype-stage]").evaluate(element => element.offsetHeight), 844, "Small touch browser-chrome changes must not move the stage");
  await touch.setViewportSize({ width: 390, height: 500 });
  await touch.waitForTimeout(400);
  assert.equal(await touch.locator("[data-prototype-stage]").evaluate(element => element.offsetHeight), 500, "Large touch viewport changes must remeasure");
  console.log("PASS touch browser chrome stability and large height resize");
} finally { await browser.close(); }
