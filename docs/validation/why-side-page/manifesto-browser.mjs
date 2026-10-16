import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SIDE_QA_URL || "http://localhost:3021";
const out = new URL("./final/", import.meta.url);
mkdirSync(out, { recursive: true });
const results = [];
const browser = await chromium.launch({ channel: "msedge", headless: true });

async function seek(page, fraction) {
  await page.locator("[data-manifesto-opening]").evaluate((element, fraction) => {
    const stage = element.querySelector("[data-prototype-stage]");
    scrollTo({ top: element.offsetTop + (element.offsetHeight - stage.offsetHeight) * fraction, behavior: "instant" });
  }, fraction);
  await page.waitForTimeout(600);
}

try {
  for (const [name, width, height, en, reduced] of [
    ["desktop-pt", 1440, 1000, false, false], ["laptop-en", 1280, 720, true, false],
    ["mobile-pt", 390, 844, false, false], ["mobile-en", 390, 844, true, false],
    ["small-mobile", 320, 568, false, false], ["tablet-en", 768, 1024, true, false],
    ["landscape", 844, 390, false, false], ["reduced-desktop", 1440, 900, true, true],
    ["reduced-mobile", 390, 844, false, true],
  ]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 801, hasTouch: width < 801, reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    assert.equal((await page.goto(`${base}${en ? "/en/why-side" : "/por-que-side"}`)).status(), 200);
    if (!reduced) {
      await page.waitForSelector('[data-manifesto-opening][data-motion="ready"]');
      for (const fraction of [0, .5, 1, .2, 1]) await seek(page, fraction);
      const art = await page.locator("[data-prototype-art]").evaluate(element => ({
        bounds: element.getBoundingClientRect().toJSON(),
        type: [...element.querySelectorAll("[data-new-word],[data-second-type]")].map(node => node.getBoundingClientRect().toJSON()),
      }));
      for (const text of art.type) assert.ok(text.left >= 0 && text.right <= art.bounds.right + 1, `${name}: clipped opening`);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForTimeout(150);
      assert.equal(await page.locator("[data-manifesto-opening]").getAttribute("data-motion"), null);
      await page.emulateMedia({ reducedMotion: "no-preference" });
    }
    for (const selector of ["#manifesto-name", "[aria-labelledby=principles-heading]", "[aria-labelledby=manifesto-closing-heading]"]) {
      await page.locator(selector).evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 100, behavior: "instant" }));
      await page.waitForTimeout(250);
      const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, headings: [...document.querySelectorAll("h2,h3")].filter(node => node.getBoundingClientRect().width > 0).map(node => ({ text: node.textContent, right: node.getBoundingClientRect().right })) }));
      assert.equal(state.overflow, false, `${name}: horizontal overflow at ${selector}`);
      assert.ok(state.headings.every(heading => heading.right <= width + 1), `${name}: heading outside viewport`);
    }
    await page.locator("[data-final-footer]").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForTimeout(200);
    assert.equal(await page.locator("[data-work-nav]").evaluate(element => element.inert), true, `${name}: footer must disable covered nav`);
    const state = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, width: innerWidth, scrollWidth: document.documentElement.scrollWidth, track: getComputedStyle(document.documentElement, "::-webkit-scrollbar-track").backgroundColor }));
    assert.equal(state.track, "rgba(0, 0, 0, 0)");
    assert.deepEqual(errors, []);
    results.push({ name, width, height, en, reduced, ...state, errors });
    console.log("PASS", name);
    await context.close();
  }

  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => sessionStorage.setItem("side:hero-complete:v1", "true"));
  await page.goto(`${base}/por-que-side`);
  const toggle = page.locator("[data-work-nav] button[aria-expanded]");
  await toggle.click(); await page.keyboard.press("Escape");
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  assert.equal(await toggle.evaluate(element => element === document.activeElement), true);
  for (const path of ["/servicos", "/trabalhos"]) {
    await toggle.click();
    await page.locator(`[data-work-nav] a[href="${path}"]`).click();
    await page.waitForURL(`**${path}`);
    await page.locator("[data-work-nav] button[aria-expanded]").click();
    await page.locator('[data-work-nav] a[href="/por-que-side"]').click();
    await page.waitForURL("**/por-que-side");
  }
  for (const [lang, path] of [["en", "/en/why-side"], ["pt-BR", "/por-que-side"]]) {
    await page.locator("[data-final-footer]").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.locator(`[data-final-footer] a[lang="${lang}"]`).click();
    await page.waitForURL(`**${path}#side-footer`);
    await page.waitForTimeout(500);
    assert.ok(Math.abs(await page.locator("[data-final-footer]").evaluate(element => element.getBoundingClientRect().top)) < 3);
  }
  await page.locator('[aria-labelledby="manifesto-closing-heading"] a').click();
  await page.waitForURL("**/contato"); await page.waitForSelector("[data-contact-step]");
  await page.goBack(); await page.waitForURL("**/por-que-side**");
  await page.goto(`${base}/`); await page.waitForSelector("[data-hero-state=final]");
  await page.locator("[data-final-hero] button[aria-expanded]").click();
  await page.locator("[data-final-hero]").getByRole("button", { name: "Por que Side", exact: true }).click();
  await page.waitForURL("**/por-que-side");
  assert.deepEqual(errors, []);
  results.push({ name: "mobile-menu-locale-contact-home-history", errors });
  console.log("PASS mobile menu, locale, Contact, Home and back");
  await page.close();

  for (const [source, target] of [["/why-side", "/por-que-side"], ["/en/por-que-side", "/en/why-side"]]) {
    const page = await browser.newPage(); await page.goto(`${base}${source}`);
    assert.equal(new URL(page.url()).pathname, target); await page.close();
  }
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
    const page = await context.newPage(); await page.goto(`${base}/en/why-side`);
    assert.equal(await page.getByRole("heading", { name: "Care beyond delivery.", exact: true }).count(), 1);
    assert.equal(await page.locator("[data-manifesto-opening]").getAttribute("data-motion"), null);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false);
    results.push({ name: `no-js-${width}`, overflow }); await context.close();
  }
  console.log("PASS localized redirects and readable no-JS desktop/mobile");
} finally {
  writeFileSync(new URL("checks.json", out), JSON.stringify(results, null, 2));
  await browser.close();
}
