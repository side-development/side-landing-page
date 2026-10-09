// Browser dependency stays outside the application. See pre-merge.md.
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.SIDE_QA_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({
      viewport, isMobile: viewport.width < 800, hasTouch: viewport.width < 800,
    });
    await context.addInitScript(() => sessionStorage.setItem("side:hero-complete:v1", "true"));
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    const centerTerminal = () => page.locator("[data-terminal]").evaluate(node => {
      scrollTo({ top: node.getBoundingClientRect().top + scrollY - Math.max(80, (innerHeight - node.offsetHeight) / 2), behavior: "instant" });
    });
    const assertComplete = async () => {
      const state = await page.locator("[data-terminal]").evaluate(node => ({
        animation: node.dataset.animation,
        parts: [...node.querySelectorAll("[data-terminal-shell], [data-terminal-command], [data-terminal-welcome], [data-terminal-response]")]
          .map(part => Number(getComputedStyle(part).opacity)),
        commands: [...node.querySelectorAll("[data-terminal-type]")].map(part => part.textContent),
      }));
      assert.equal(state.animation, "settled");
      assert.ok(state.parts.every(opacity => opacity === 1), "Previously revealed terminal lost blocks");
      assert.deepEqual(state.commands, ["claude", "/mcp"], "Previously typed commands were erased");
    };

    await page.goto(baseURL);
    await page.waitForSelector("[data-hero-state=final]");
    await centerTerminal();
    await page.waitForFunction(() => document.querySelector("[data-terminal]")?.dataset.animation === "settled");
    await assertComplete();

    for (const locale of ["en", "pt-BR"]) {
      await page.locator("[data-final-footer]").evaluate(node => node.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.locator(`[data-final-footer] a[lang="${locale}"]`).click();
      await page.waitForFunction(locale => document.querySelector("[data-final-footer] [aria-current]")?.textContent === locale, locale === "en" ? "EN" : "PT");
      await page.waitForSelector("[data-hero-state=final]");
      await centerTerminal();
      // No wait for a second entrance: the completed state must already exist.
      await assertComplete();
    }

    await page.reload();
    await page.waitForSelector("[data-hero-state=final]");
    await centerTerminal();
    await assertComplete();
    for (const reducedMotion of ["reduce", "no-preference"]) {
      await page.emulateMedia({ reducedMotion });
      await page.waitForTimeout(300);
      await centerTerminal();
      await assertComplete();
    }
    await page.setViewportSize({ width: viewport.width - 20, height: viewport.height - 60 });
    await page.waitForTimeout(300);
    await centerTerminal();
    await assertComplete();
    assert.deepEqual(errors, []);
    await page.setViewportSize(viewport);
    for (const target of ["center", "edge"]) {
      await page.goto(`${baseURL}/#start-project`);
      await page.waitForSelector("[data-hero-state=final]");
      const link = page.locator("[data-final-cta] a");
      await link.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      const bounds = await link.boundingBox();
      const x = bounds.x + bounds.width / 2;
      const y = target === "edge" ? bounds.y + bounds.height - 2 : bounds.y + bounds.height / 2;
      await page.mouse.move(x, y);
      await page.waitForTimeout(500);
      await page.mouse.down();
      await page.waitForTimeout(500);
      await Promise.all([page.waitForURL("**/contato"), page.mouse.up()]);
      await page.waitForSelector("[data-contact-step]");
    }
    assert.deepEqual(errors, []);
    console.log(`PASS ${viewport.width}×${viewport.height}: terminal lifecycle; CTA center/edge → contact`);
    await context.close();
  }
  // HTTP on a LAN does not expose crypto.randomUUID. Exercise the real origin.
  if (process.env.SIDE_QA_LAN_URL) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    for (const path of ["/contato", "/en/contact"]) {
      await page.goto(`${process.env.SIDE_QA_LAN_URL}${path}`);
      await page.waitForSelector("[data-contact-step='1']");
      const security = await page.evaluate(() => ({ secure: isSecureContext, uuid: typeof crypto.randomUUID }));
      assert.equal(security.secure, false);
      assert.equal(security.uuid, "undefined");
      await page.locator("[data-answer-input]").fill("Side QA");
      await page.keyboard.press("Enter");
      await page.waitForSelector("[data-contact-step='2']");
      const id = await page.evaluate(() => history.state.sideContact.id);
      assert.match(id, /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i);
    }
    assert.deepEqual(errors, []);
    console.log("PASS HTTP LAN: PT/EN contact opens, Enter advances, UUID v4 fallback");
    await context.close();
  }
} finally {
  await browser.close();
}
