/* eslint-disable @typescript-eslint/no-require-imports -- Standalone QA uses existing temporary Playwright tooling. */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const engines = require(process.env.SIDE_PLAYWRIGHT_PATH || path.join(os.tmpdir(), 'side-landing-qa/node_modules/playwright'));
const base = process.env.SIDE_QA_URL || 'http://localhost:3100';
const browserName = process.env.SIDE_QA_BROWSER || 'chromium';
const out = path.join('artifacts/launch/interactions', browserName);
fs.mkdirSync(out, { recursive: true });
const results = [], errors = [], intercepted = [], skipped = [];
const projects = ['route', 'owl', 'psicologia', 'computer-vision'];
const names = ['Route Security', 'OWL', 'Acompanhamento Terapêutico', 'Computer Vision'];
let page, browser, currentTest;
const safeName = name => name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
async function finish(ctx) {
  if (page && !page.isClosed() && page.context() === ctx) await page.screenshot({ path: path.join(out, safeName(currentTest) + '.png') }).catch(() => {});
  await ctx.close();
}
async function test(name, execute) {
  currentTest = name;
  try { const detail = await execute(); results.push({ name, ok: true, ...(detail ? { detail } : {}) }); }
  catch (error) {
    const screenshot = path.join(out, `${safeName(name)}.png`);
    await page?.screenshot({ path: screenshot }).catch(() => {});
    results.push({ name, ok: false, detail: error.stack, screenshot });
  }
  console.log(JSON.stringify(results.at(-1)));
}
async function context(options = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', ...options });
  await ctx.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== new URL(base).origin) return route.abort('blockedbyclient');
    if (/^\/api\/(contact|newsletter)$/.test(url.pathname)) {
      intercepted.push({ endpoint: url.pathname, status: 502 });
      return route.fulfill({ status: 502, contentType: 'application/json', body: '{"ok":false}' });
    }
    return route.continue();
  });
  page = await ctx.newPage();
  page.setDefaultTimeout(12000);
  page.setDefaultNavigationTimeout(35000);
  page.on('pageerror', error => errors.push({ url: new URL(page.url()).pathname, message: error.message }));
  return ctx;
}
async function visit(route) {
  const response = await page.goto(base + route, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, `HTTP ${route}`);
}
async function step(number) { await page.locator(`[data-contact-step="${number}"]`).waitFor(); await page.waitForTimeout(150); }
async function active(slug) { return page.locator(`[data-project="${slug}"] [data-sheet][data-active="true"]`).getAttribute('data-sheet'); }
async function changed(slug, previous, timeout = 4000) {
  await page.waitForFunction(({ slug, previous }) => document.querySelector(`[data-project="${slug}"] [data-active="true"]`)?.getAttribute('data-sheet') !== previous, { slug, previous }, { timeout });
}
async function selected(slug, index) {
  await page.waitForFunction(({ slug, index }) => document.querySelector(`[data-project="${slug}"] [data-active="true"]`)?.getAttribute('data-sheet') === String(index), { slug, index });
}
async function galleryKeys(english) {
  await visit(english ? '/en/work' : '/trabalhos');
  const gallery = page.locator('[data-project="route"]');
  const stage = gallery.locator('[data-gallery-stage]');
  await stage.focus(); await page.keyboard.press('Home'); await page.waitForTimeout(80);
  assert.equal(await active('route'), '0');
  await page.keyboard.press('ArrowRight'); await changed('route', '0');
  await page.keyboard.press('ArrowLeft'); await page.waitForFunction(() => document.querySelector('[data-project="route"] [data-active="true"]')?.getAttribute('data-sheet') === '0');
  const last = await gallery.locator('[data-sheet]').count() - 1;
  await page.keyboard.press('End'); await selected('route', last);
  await gallery.getByRole('button', { name: english ? 'Previous sheet' : 'Folha anterior', exact: true }).click();
  await selected('route', last - 1);
  await gallery.getByRole('button', { name: english ? 'Next sheet' : 'Próxima folha', exact: true }).click();
  await selected('route', last);
  await page.waitForTimeout(100);
  const current = await active('route'), box = await stage.boundingBox();
  await page.mouse.move(box.x + box.width * .8, box.y + box.height * .5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * .75, box.y + box.height * .5, { steps: 3 });
  await page.mouse.move(box.x + box.width * .2, box.y + box.height * .5, { steps: 14 });
  await page.mouse.up(); await changed('route', current);
  assert.equal(await page.getByRole('dialog').count(), 0, 'drag must not open a case');
  const trigger = gallery.getByRole('button', { name: english ? 'Open case' : 'Abrir case', exact: true });
  await trigger.click(); await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[role="dialog"]'));
  assert.equal(await trigger.evaluate(node => node === document.activeElement), true, 'restore connected trigger focus');
}
async function contact(english, viewport) {
  const ctx = await context({ viewport, hasTouch: viewport.width < 900 });
  try {
    await visit(english ? '/en/contact' : '/contato'); await step(1);
    await page.keyboard.press('Enter'); assert.ok((await page.locator('#contact-error').textContent()).trim());
    await page.locator('[data-answer-input]').fill('Synthetic interaction QA'); await page.keyboard.press('Enter'); await step(2);
    await page.keyboard.press('5');
    const custom = page.locator('[data-custom-answer-input="true"]');
    await custom.fill('Synthetic custom project'); await page.keyboard.press('Enter'); await step(3);
    await page.goBack(); await step(2); assert.equal(await custom.inputValue(), 'Synthetic custom project');
    await page.goForward(); await step(3);
    await page.keyboard.press('2'); await page.keyboard.press('Enter'); await step(4);
    await page.locator('textarea').fill('Synthetic multiline goal\nSecond line'); await page.keyboard.press('Enter'); await step(5);
    await page.keyboard.press('3'); await page.keyboard.press('Enter'); await step(6);
    await page.locator('input[type=email]').fill('bad'); await page.keyboard.press('Enter');
    assert.equal(await page.locator('input[type=email]').getAttribute('aria-invalid'), 'true');
    await page.locator('input[type=email]').fill('qa@example.invalid');
    const bounds = await page.locator('input[type=email], #contact-privacy, button[type=submit]').evaluateAll(nodes => nodes.map(node => {
      const r = node.getBoundingClientRect(); return { tag: node.tagName, id: node.id, x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: innerWidth, height: innerHeight };
    }));
    assert.ok(bounds.length >= 3 && bounds.every(r => r.x >= -1 && r.right <= r.width + 1 && r.y >= -1 && r.bottom <= r.height + 1), JSON.stringify(bounds));
    await page.screenshot({ path: path.join(out, `contact-${english ? 'en' : 'pt'}-${viewport.width}x${viewport.height}.png`) });
    const before = intercepted.length;
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => !!document.querySelector('#contact-error')?.textContent.trim());
    assert.equal(intercepted.length, before + 1);
    assert.equal(await page.locator('input[type=email]').inputValue(), 'qa@example.invalid');
    assert.equal(await page.locator('[data-success-title]').count(), 0);
    await page.locator('[data-contact-back]').click(); await step(5); await page.goForward(); await step(6);
    assert.equal(await page.locator('input[type=email]').inputValue(), 'qa@example.invalid');
  } finally { await finish(ctx); }
}
(async () => {
  browser = await engines[browserName].launch(browserName === 'chromium' ? { channel: 'msedge', headless: true } : { headless: true });
  try {
    for (const english of [false, true]) {
      const lang = english ? 'EN' : 'PT', work = english ? '/en/work' : '/trabalhos';
      await test(`Work keys arrows drag and focus ${lang}`, async () => { const ctx = await context(); try { await galleryKeys(english); } finally { await finish(ctx); } });
      for (const [index, slug] of projects.entries()) await test(`Work direct refresh history ${lang} ${slug}`, async () => {
        const ctx = await context();
        try {
          await visit(`${work}?case=${slug}`); const dialog = page.getByRole('dialog'); await dialog.waitFor();
          assert.ok((await dialog.getAttribute('aria-label')).includes(names[index]));
          await page.reload({ waitUntil: 'networkidle' }); await dialog.waitFor();
          await dialog.focus(); await page.keyboard.press('Shift+Tab');
          assert.ok(await page.evaluate(() => !!document.activeElement?.closest('[role=dialog]')));
          const destination = index < projects.length - 1 ? index + 1 : index - 1;
          await dialog.getByRole('button', { name: index < projects.length - 1 ? /Próximo case|Next case/ : /Case anterior|Previous case/ }).click();
          await page.waitForURL(url => url.searchParams.get('case') === projects[destination]);
          await page.goBack(); await page.waitForURL(url => url.searchParams.get('case') === slug);
          await page.goForward(); await page.waitForURL(url => url.searchParams.get('case') === projects[destination]);
          await page.waitForFunction(name => document.querySelector('[role=dialog]')?.getAttribute('aria-label')?.includes(name), names[destination]);
          await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.querySelector('[role=dialog]'));
          assert.equal(new URL(page.url()).searchParams.has('case'), false);
          assert.equal(await page.evaluate(() => document.body.style.overflow === 'hidden'), false);
          assert.equal(await page.locator('#work-main h1').evaluate(node => node === document.activeElement), true);
        } finally { await finish(ctx); }
      });
      for (const viewport of [{ width: 320, height: 640 }, { width: 844, height: 390 }])
        await test(`Contact keyboard custom history ${lang} ${viewport.width}x${viewport.height}`, () => contact(english, viewport));
      await test(`Services panels keyboard and contact link ${lang}`, async () => {
        const ctx = await context({ viewport: { width: english ? 390 : 1440, height: 900 } });
        try {
          await visit(english ? '/en/services' : '/servicos');
          const triggers = page.locator('[data-service-trigger]'); assert.ok(await triggers.count() >= 4);
          for (let i = 0; i < await triggers.count(); i++) {
            const trigger = triggers.nth(i); await trigger.focus();
            if (await trigger.getAttribute('aria-expanded') !== 'true') await page.keyboard.press('Enter');
            const panel = page.locator('#' + await trigger.getAttribute('aria-controls'));
            assert.equal(await trigger.getAttribute('aria-expanded'), 'true'); assert.equal(await panel.getAttribute('aria-hidden'), 'false');
            assert.equal(await page.locator('[data-service-trigger][aria-expanded=true]').count(), 1);
            assert.equal(await panel.evaluate(node => node.inert), false);
            await page.keyboard.press('Space'); assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
            assert.equal(await panel.evaluate(node => node.inert), true);
          }
          await page.getByRole('link', { name: english ? 'Contact' : 'Contato', exact: true }).first().click();
          await page.waitForURL('**/' + (english ? 'en/contact' : 'contato')); await step(1);
        } finally { await finish(ctx); }
      });
      await test(`Home dashboard controls and dialog ${lang}`, async () => {
        const ctx = await context();
        try {
          await visit(english ? '/en' : '/');
          const dashboard = page.locator('[data-dashboard]'); await dashboard.scrollIntoViewIfNeeded();
          const period = dashboard.locator('[aria-haspopup=listbox]'); await period.click();
          await page.locator('[data-period-option="7"]').click(); assert.match(await period.getAttribute('aria-label'), /7/);
          const slider = dashboard.getByRole('slider').first(); await slider.focus(); await page.keyboard.press('Home');
          assert.equal(await slider.getAttribute('aria-valuenow'), await slider.getAttribute('aria-valuemin'));
          await page.keyboard.press('End'); assert.equal(await slider.getAttribute('aria-valuenow'), await slider.getAttribute('aria-valuemax'));
          const explore = dashboard.locator('[aria-haspopup=dialog]'); await explore.click(); await page.getByRole('dialog').waitFor();
          await page.keyboard.press('Shift+Tab'); assert.ok(await page.evaluate(() => !!document.activeElement?.closest('dialog')));
          await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.querySelector('dialog'));
          assert.equal(await explore.evaluate(node => node === document.activeElement), true);
          assert.equal(await page.evaluate(() => document.documentElement.style.overflow === 'hidden'), false);
        } finally { await finish(ctx); }
      });
    }
    await test('Work explicit pause survives autoplay interval and stale trigger fallback', async () => {
      const ctx = await context({ reducedMotion: 'no-preference' });
      try {
        await visit('/trabalhos'); const gallery = page.locator('[data-project="route"]');
        await gallery.locator('[data-gallery-stage]').scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
        const pause = gallery.getByRole('button', { name: 'Pausar galeria', exact: true }); await pause.click();
        assert.equal(await pause.getAttribute('aria-pressed'), 'true');
        await page.locator('[data-work-nav] a[aria-label]').first().hover(); await page.evaluate(() => document.activeElement?.blur());
        const before = await active('route'); await page.waitForTimeout(8000); assert.equal(await active('route'), before);
        await pause.click(); await page.locator('[data-work-nav] a[aria-label]').first().hover(); await page.evaluate(() => document.activeElement?.blur());
        await changed('route', before, 12000);
        const trigger = gallery.locator('[data-active=true] button'); const original = await trigger.elementHandle();
        await trigger.click(); await page.getByRole('dialog').waitFor(); await page.mouse.move(0, 0);
        await page.waitForFunction(node => !node.isConnected, original, { timeout: 12000 });
        await page.keyboard.press('Escape'); await page.waitForFunction(() => !document.querySelector('[role=dialog]'));
        assert.equal(await page.locator('#work-main h1').evaluate(node => node === document.activeElement), true);
      } finally { await finish(ctx); }
    });
    if (browserName === 'chromium') await test('Work mobile touch swipe via CDP', async () => {
      const ctx = await context({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
      try {
        await visit('/trabalhos'); const stage = page.locator('[data-project="route"] [data-gallery-stage]');
        await stage.scrollIntoViewIfNeeded(); const box = await stage.boundingBox(), before = await active('route');
        const cdp = await ctx.newCDPSession(page), y = box.y + box.height / 2;
        const point = x => [{ x, y, id: 1, radiusX: 2, radiusY: 2, force: 1 }];
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: point(330) });
        for (let x = 310; x >= 50; x -= 20) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: point(x) }); await page.waitForTimeout(16); }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await changed('route', before);
        assert.equal(await page.getByRole('dialog').count(), 0); await cdp.detach();
      } finally { await finish(ctx); }
    }); else skipped.push('CDP touch swipe unavailable for ' + browserName);
    for (const english of [false, true]) await test(`Why Side reverse scroll and DOM cleanup ${english ? 'EN' : 'PT'}`, async () => {
      const ctx = await context({ reducedMotion: 'no-preference' });
      try {
        await visit(english ? '/en/why-side' : '/por-que-side');
        await page.waitForFunction(() => document.querySelector('[data-manifesto-opening]')?.getAttribute('data-motion') === 'ready');
        const opening = page.locator('[data-manifesto-opening]'), old = await opening.elementHandle();
        const snapshot = () => page.locator('[data-paper]').evaluate(node => getComputedStyle(node).clipPath);
        const before = await snapshot();
        await opening.evaluate(node => scrollTo(0, node.offsetTop + node.offsetHeight - innerHeight)); await page.waitForTimeout(1200);
        assert.notEqual(await snapshot(), before);
        await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200); assert.equal(await snapshot(), before);
        await page.locator(`a[href="${english ? '/en/services' : '/servicos'}"]`).first().click();
        await page.waitForURL('**/' + (english ? 'en/services' : 'servicos'));
        assert.equal(await old.evaluate(node => node.isConnected), false);
        assert.equal(await page.locator('[data-manifesto-opening]').count(), 0);
        assert.equal(await page.evaluate(() => document.body.style.overflow === 'hidden' || document.documentElement.style.overflow === 'hidden'), false);
        await page.goBack(); await page.locator('[data-manifesto-opening]').waitFor();
      } finally { await finish(ctx); }
    });
    await test('Fresh intro completes once and refresh retains final content', async () => {
      const ctx = await context({ reducedMotion: 'no-preference' });
      try {
        const start = Date.now(); await visit('/'); await page.getByRole('button', { name: 'Pular introdução', exact: true }).waitFor();
        await page.waitForFunction(() => document.querySelector('[data-final-hero]')?.getAttribute('data-visible') === 'true', null, { timeout: 40000 });
        assert.equal(await page.evaluate(() => sessionStorage.getItem('side:hero-complete:v1')), 'true');
        const elapsedMs = Date.now() - start; await page.screenshot({ path: path.join(out, 'fresh-intro-complete.png') });
        await page.reload({ waitUntil: 'networkidle' });
        assert.equal(await page.locator('[data-final-hero]').getAttribute('data-visible'), 'true');
        assert.equal(await page.locator('[data-error-surface]').count(), 0); return { elapsedMs };
      } finally { await finish(ctx); }
    });
    await test('Skipping an active intro restores body and reduced motion is immediate', async () => {
      let ctx = await context({ reducedMotion: 'no-preference' });
      try {
        await visit('/en'); await page.waitForFunction(() => document.querySelector('[data-hero-state]')?.getAttribute('data-hero-state') === 'triggered');
        await page.getByRole('button', { name: 'Skip intro', exact: true }).click();
        await page.waitForFunction(() => document.querySelector('[data-final-hero]')?.getAttribute('data-visible') === 'true');
        assert.equal(await page.locator('[data-black-field], [data-error-surface]').count(), 0);
        assert.equal(await page.evaluate(() => document.body.style.overflow === 'hidden'), false);
        await finish(ctx); ctx = await context(); await visit('/en');
        assert.equal(await page.locator('[data-final-hero]').getAttribute('data-visible'), 'true');
        assert.equal(await page.locator('[data-error-surface]').count(), 0);
      } finally { await finish(ctx); }
    });
    results.push({ name: 'No page JavaScript errors', ok: errors.length === 0, detail: errors });
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ base, browserName, results, errors, intercepted, skipped, limitations: ['Emulated viewports/touch; no physical device or virtual keyboard coverage.', 'DOM/scroll cleanup checked; heap and listener leak profiling not performed.', 'All API submissions intercepted locally with HTTP 502; no real email or newsletter request.'] }, null, 2));
    console.log(JSON.stringify({ passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok), skipped }, null, 2));
    if (results.some(r => !r.ok)) process.exitCode = 1;
  }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
