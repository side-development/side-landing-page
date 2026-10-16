import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SIDE_QA_URL || "http://localhost:3019";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
const opacity = locator => locator.evaluate(element => Number(getComputedStyle(element).opacity));
const expectAllVisible = page => page.waitForFunction(() => [...document.querySelectorAll("[data-editorial-reveal]")].every(element => getComputedStyle(element).opacity === "1" && getComputedStyle(element).filter === "none"));

try {
  for (const [width, locale] of [[1440, "pt-BR"], [390, "pt-BR"], [1440, "en"], [390, "en"]]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, isMobile: width === 390, hasTouch: width === 390 });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`${base}${locale === "en" ? "/en/why-side" : "/por-que-side"}`);
    await page.waitForSelector('[data-manifesto-opening][data-motion="ready"]');
    const phases = page.locator("[data-editorial-phase]");
    assert.equal(await phases.count(), 3);
    assert.equal(await opacity(phases.first()), 0, "Phases wait offscreen until scroll reaches them");
    assert.equal(await opacity(page.locator("#name-heading")), 0, "The manifesto heading also waits for entry");
    for (let index = 0; index < 3; index++) {
      const phase = phases.nth(index);
      await phase.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .8, behavior: "instant" }));
      await page.waitForFunction(index => {
        const opacity = Number(getComputedStyle(document.querySelectorAll("[data-editorial-phase]")[index]).opacity);
        return opacity > 0 && opacity < 1;
      }, index);
      await page.waitForTimeout(1100);
      assert.equal(await opacity(phase), 1, "The phase finishes arriving");
      if (index < 2) assert.equal(await opacity(phases.nth(index + 1)), 0, "The next phase waits for its own scroll position");
    }
    await page.locator("[aria-labelledby=manifesto-closing-heading] a").focus();
    assert.equal(await page.locator("[aria-labelledby=manifesto-closing-heading] a").evaluate(element => getComputedStyle(element.closest("[data-editorial-reveal]")).opacity), "1", "Keyboard focus is immediately visible");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(100);
    await expectAllVisible(page);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(100);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expectAllVisible(page);
    assert.equal(await page.locator("#manifesto-name svg, #manifesto-name img").count(), 0);
    assert.equal(await page.locator("[aria-labelledby=manifesto-work-heading], main a[href*='?case=']").count(), 0);
    assert.equal(await page.locator("main section").count(), 4);
    assert.deepEqual(errors, []);
    results.push({ width, locale, phases: 3, scrollArrival: true, focusVisible: true, reducedRestoresText: true, errors });
    console.log("PASS scroll arrivals, removals, keyboard focus and reduced", width, locale);
    await context.close();
  }
} finally {
  writeFileSync(new URL("./final/arrivals.json", import.meta.url), JSON.stringify(results, null, 2));
  await browser.close();
}
