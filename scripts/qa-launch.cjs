/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser QA with temporary tooling. */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium, firefox, webkit } = require(process.env.SIDE_PLAYWRIGHT_PATH || path.join(os.tmpdir(), 'side-landing-qa/node_modules/playwright'));
const base = process.env.SIDE_QA_URL || 'http://localhost:3100';
const baseline = process.argv.includes('--baseline');
const browserName = process.env.SIDE_QA_BROWSER || 'chromium';
const out = `artifacts/launch/${baseline ? 'before' : 'after'}-${browserName}`;
fs.mkdirSync(out, { recursive: true });
const results = [], errors = [];
const routes = ['/', '/en', '/trabalhos', '/en/work', '/servicos', '/en/services', '/por-que-side', '/en/why-side', '/contato', '/en/contact'];
function check(name, ok, detail) { results.push({ name, ok: !!ok, ...(detail === undefined ? {} : { detail }) }); }
async function open(context, route) {
  const page = await context.newPage();
  page.on('pageerror', e => errors.push({ route, message: e.message }));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('502')) errors.push({ route, message: m.text().slice(0, 300) }); });
  const response = await page.goto(base + route, { waitUntil: 'networkidle' });
  return { page, response };
}
(async () => {
  const browser = await ({ chromium, firefox, webkit }[browserName]).launch(browserName === 'chromium' ? { channel: 'msedge', headless: true } : { headless: true });
  try {
    // Regression probes, including source-order focus escape and no-JS crawlability.
    let context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    let { page } = await open(context, baseline ? '/en' : '/');
    check('Home usable without JavaScript', await page.getByRole('heading', { name: 'Side', exact: true }).isVisible().catch(() => false)
      && await page.getByRole('link', { name: /^(Contato|Contact)$/ }).isVisible().catch(() => false));
    await page.screenshot({ path: `${out}/home-no-js.png` }); await context.close();
    context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    ({ page } = await open(context, baseline ? '/en' : '/'));
    check('Reduced motion reaches final content immediately', await page.locator('[data-final-hero]').getAttribute('data-visible') === 'true');
    await page.goto(base + (baseline ? '/en/work?case=route' : '/trabalhos?case=route'), { waitUntil: 'networkidle' }); await page.getByRole('dialog').waitFor();
    await page.getByRole('dialog').focus(); await page.keyboard.press('Shift+Tab');
    check('Case Shift+Tab stays inside modal', await page.evaluate(() => !!document.activeElement?.closest('[role=dialog]')));
    await page.keyboard.press('Escape'); check('Escape closes case', await page.getByRole('dialog').count() === 0);
    await context.close();
    context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    ({ page } = await open(context, baseline ? '/en' : '/'));
    check('Fresh intro has error surface without skip button', await page.locator('[data-error-surface]').isVisible().catch(() => false) && await page.getByRole('button', { name: /Pular introdução|Skip intro/i }).count() === 0);
    if (baseline) { await context.close(); return; }
    await page.evaluate(() => { sessionStorage.setItem('side:hero-complete:v1', 'true'); location.reload(); });
    await page.waitForFunction(() => document.querySelector('[data-final-hero]')?.getAttribute('data-visible') === 'true');
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    check('Mobile menu opens', await page.locator('button[aria-expanded=true]').count() > 0);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).waitFor();
    check('Mobile menu Escape closes', await page.locator('button[aria-expanded=true]').count() === 0);
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.getByRole('link', { name: 'Trabalhos', exact: true }).first().click(); await page.waitForURL('**/trabalhos');
    await page.goBack(); await page.waitForFunction(() => document.querySelector('[data-final-hero]')?.getAttribute('data-visible') === 'true');
    check('Home return skips replay', true); await context.close();
    // Each route, six width breakpoints; landscape included separately.
    const sizes = browserName === 'chromium' ? [[320, 640], [375, 667], [390, 844], [768, 1024], [1024, 768], [1440, 900], [844, 390]] : [[390, 844], [1440, 900]];
    for (const [width, height] of sizes) {
      context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width < 800 });
      await context.addInitScript(() => sessionStorage.setItem('side:hero-complete:v1', 'true'));
      for (const route of routes) {
        const { page: p, response } = await open(context, route);
        check(`${width}x${height} ${route} status/lang`, response.status() === 200 && await p.locator('html').getAttribute('lang') === (route.startsWith('/en') ? 'en' : 'pt-BR'));
        check(`${width}x${height} ${route} horizontal overflow`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
        check(`${width}x${height} ${route} H1`, await p.locator('h1:visible').count() === 1);
        if (width === 390 || width === 1440) await p.screenshot({ path: `${out}/${width}-${route.replaceAll('/', '_') || 'home'}.png` });
        if (!route.includes('conta')) {
          await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
          await p.locator('[data-final-footer]').scrollIntoViewIfNeeded();
          const target = route.startsWith('/en') ? 'PT — Português' : 'EN — English';
          const link = p.getByRole('link', { name: target, exact: true });
          const href = await link.getAttribute('href');
          await link.click(); await p.waitForURL(new URL(href, base).href);
          await p.waitForFunction(lang => document.documentElement.lang === lang, route.startsWith('/en') ? 'pt-BR' : 'en');
          check(`${width} ${route} language switch`, await p.locator('html').getAttribute('lang') === (route.startsWith('/en') ? 'pt-BR' : 'en'));
        }
        await p.close();
      }
      await context.close();
    }
    // Normal motion: scroll through each long page in both locales, cleanup after route changes.
    context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => sessionStorage.setItem('side:hero-complete:v1', 'true'));
    for (const route of routes.filter(r => !r.includes('conta'))) {
      ({ page } = await open(context, route));
      for (let i = 0; i <= 12; i++) { await page.evaluate(f => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), i / 12); await page.waitForTimeout(100); }
      await page.evaluate(() => scrollTo(0, 0));
      check(`Motion scroll/reverse ${route}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.close();
    }
    // Contact six-step flows, HTTP errors preserve answers. Success below is a browser mock.
    for (const [route, english] of [['/contato', false], ['/en/contact', true]]) {
      ({ page } = await open(context, route));
      let calls = 0;
      await page.route('**/api/contact', async r => { calls++; await r.fulfill({ status: calls === 1 ? 502 : 200, contentType: 'application/json', body: JSON.stringify({ ok: calls !== 1 }) }); });
      const submit = () => page.locator('button[type=submit]').click();
      await submit(); check(`${route} empty validation`, (await page.locator('#contact-error').textContent()).trim().length > 0);
      await page.locator('[data-answer-input]').fill('QA synthetic'); await submit();
      await page.locator('[data-contact-step="2"]').waitFor();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('[data-contact-step="3"]').waitFor();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('[data-contact-step="4"]').waitFor();
      await page.locator('textarea').fill('Synthetic launch QA, no actual project.'); await submit();
      await page.locator('[data-contact-step="5"]').waitFor();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('[data-contact-step="6"]').waitFor();
      await page.locator('input[type=email]').fill('qa@example.invalid'); await submit();
      await page.waitForTimeout(400); check(`${route} provider error keeps email`, await page.locator('input[type=email]').inputValue() === 'qa@example.invalid');
      await submit(); await page.locator('[data-success-title]').waitFor();
      check(`${route} mocked success after retry`, (await page.locator('[data-success-title]').textContent()).includes(english ? 'Got it' : 'Recebemos'));
      await page.close();
    }
    await context.close();
    check('No page JavaScript errors', errors.length === 0, errors);
  } catch (error) { check('QA runner completed', false, error.stack); }
  finally {
    await browser.close();
    fs.writeFileSync(`${out}/results.json`, JSON.stringify({ base, browserName, baseline, results, errors }, null, 2));
    console.log(JSON.stringify({ browserName, baseline, passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok) }, null, 2));
    if (!baseline && results.some(r => !r.ok)) process.exitCode = 1;
  }
})().catch(e => { console.error(e.message); process.exitCode = 1; });
