import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SIDE_QA_URL || "http://localhost:3019";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];

async function assertHome(page, en) {
  await page.waitForURL(url => url.pathname === (en ? "/en" : "/"));
  await page.locator('[data-hero-state][data-session-ready="true"]').waitFor();
  assert.equal(await page.locator("[data-hero-state]").getAttribute("data-hero-state"), "final", "Brand navigation opens the completed hero immediately");
  assert.equal(new URL(page.url()).hash, "#home-top");
  assert.equal(await page.locator("[data-error-surface]").count(), 0, "No intro error or cinematic restart");
  await page.waitForFunction(() => scrollY < 2);
  assert.equal(await page.locator("[data-final-hero]").getAttribute("aria-hidden"), "false");
}

try {
  for (const width of [1440, 390]) {
    for (const path of ["/por-que-side", "/trabalhos", "/servicos", "/contato", "/en/why-side", "/en/work", "/en/services", "/en/contact"]) {
      const en = path.startsWith("/en/");
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, isMobile: width === 390, hasTouch: width === 390 });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${base}${path}`);
      if (!path.includes("contato") && !path.includes("contact")) await page.evaluate(() => scrollTo({ top: 400, behavior: "instant" }));
      const brand = page.locator('[data-work-nav] > a, [data-contact-flow] > header > a').first();
      await brand.click();
      await assertHome(page, en);
      // The Home brand also returns from a lower section without restarting the hero.
      await page.evaluate(() => scrollTo({ top: 500, behavior: "instant" }));
      if (width === 390) await page.locator("[data-final-hero] button[aria-expanded]").click();
      await page.locator("[data-final-hero] > header > a").click();
      await page.waitForFunction(() => scrollY < 2);
      assert.equal(await page.locator("[data-hero-state]").getAttribute("data-hero-state"), "final");
      if (width === 390) assert.equal(await page.locator("[data-final-hero] button[aria-expanded]").getAttribute("aria-expanded"), "false");
      assert.deepEqual(errors, []);
      results.push({ path, width, finalImmediately: true, top: true, homeBrand: true, errors });
      console.log("PASS logo → completed Home", path, width);
      await context.close();
    }
  }
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Disabled", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Disabled", "SecurityError"); };
  });
  const page = await blocked.newPage();
  await page.goto(`${base}/por-que-side`);
  await page.locator("[data-work-nav] > a").click();
  await assertHome(page, false);
  results.push({ name: "storage-disabled", finalImmediately: true });
  await blocked.close();

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await reduced.goto(`${base}/por-que-side`);
  await reduced.locator("[data-work-nav] > a").focus();
  await reduced.keyboard.press("Enter");
  await assertHome(reduced, false);
  results.push({ name: "keyboard-and-reduced", finalImmediately: true });
  await reduced.close();

  const context = await browser.newContext();
  const source = await context.newPage();
  await source.goto(`${base}/en/why-side`);
  const popupPromise = context.waitForEvent("page");
  await source.locator("[data-work-nav] > a").click({ modifiers: ["Control"] });
  const popup = await popupPromise;
  await assertHome(popup, true);
  results.push({ name: "new-tab", finalImmediately: true });
  await context.close();

  for (const path of ["/", "/en", "/?intro=replay#home-top"]) {
    const page = await browser.newPage();
    await page.goto(`${base}${path}`);
    await page.locator('[data-session-ready="true"]').waitFor();
    assert.notEqual(await page.locator("[data-hero-state]").getAttribute("data-hero-state"), "final", "Direct first visit and explicit replay keep the intro");
    assert.equal(await page.locator("[data-error-surface]").count(), 1);
    results.push({ name: `first-visit-or-replay:${path}`, introPreserved: true });
    await page.close();
  }
  console.log("PASS storage disabled, keyboard/reduced, new tab, direct first visit and explicit replay");
} finally {
  writeFileSync(new URL("./final/navbar-home.json", import.meta.url), JSON.stringify(results, null, 2));
  await browser.close();
}
