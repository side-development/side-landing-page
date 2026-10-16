import assert from "node:assert/strict";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SIDE_QA_URL || "http://localhost:3019";
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const [path, locale, title, headings] of [
    ["/por-que-side", "pt-BR", "Por que Side | Side", ["Side não é só um nome. É uma posição.", "Entender antes de construir.", "Executar com intenção.", "Cuidar também depois da entrega."]],
    ["/en/why-side", "en", "Why Side | Side", ["Side is more than a name. It's where we stand.", "Understand before building.", "Build with intention.", "Care beyond delivery."]],
  ]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`${base}${path}`);
    assert.equal(response.status(), 200, `${path} must exist`);
    assert.equal(await page.title(), title);
    assert.equal(await page.locator("html").getAttribute("lang"), locale);
    assert.equal(await page.locator("h1").count(), 1);
    for (const heading of headings) assert.equal(await page.getByRole("heading", { name: heading, exact: true }).count(), 1, heading);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `https://sidecode.com.br${path}`);
    assert.equal(await page.locator('link[hreflang="pt-BR"]').getAttribute("href"), "https://sidecode.com.br/por-que-side");
    assert.equal(await page.locator('link[hreflang="en"]').getAttribute("href"), "https://sidecode.com.br/en/why-side");
    assert.equal(await page.locator('[data-work-nav] a[aria-current="page"]').getAttribute("href"), path);
    assert.equal(await page.locator("[data-final-footer]").count(), 1);
    assert.equal(await page.locator("[data-prototype-controls]").count(), 0);
    assert.equal(await page.locator("[data-pin-one], [data-pin-two]").count(), 0);
    assert.equal(await page.locator('main a[href*="?case="]').count(), 0);
    assert.equal(await page.locator('[aria-labelledby="manifesto-work-heading"]').count(), 0);
    assert.equal(await page.locator("#manifesto-name img, #manifesto-name svg").count(), 0);
    assert.equal(await page.locator("#manifesto-name").getByText(locale === "en" ? "A name. A point of view." : "O nome é uma posição", { exact: true }).count(), 0);
    assert.deepEqual(errors, []);
    console.log(`PASS ${path}: content, metadata, shell and requested removals`);
    await page.close();
  }
} finally { await browser.close(); }
