/* eslint-disable @typescript-eslint/no-require-imports -- Standalone axe audit uses existing temporary browser tooling. */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const engines = require(process.env.SIDE_PLAYWRIGHT_PATH || path.join(os.tmpdir(), 'side-landing-qa/node_modules/playwright'));
const axeModule = require(process.env.SIDE_AXE_PATH || path.join(os.tmpdir(), 'side-launch-audit/node_modules/@axe-core/playwright'));
const AxeBuilder = axeModule.default || axeModule;
const base = process.env.SIDE_QA_URL || 'http://localhost:3100';
const browserName = process.env.SIDE_QA_BROWSER || 'chromium';
const out = path.join('artifacts/launch/a11y', browserName);
const routes = ['/', '/en', '/trabalhos', '/en/work', '/servicos', '/en/services', '/por-que-side', '/en/why-side', '/contato', '/en/contact'];
const results = [];
fs.mkdirSync(out, { recursive: true });
function violation(item) {
  return { id: item.id, impact: item.impact, help: item.help, helpUrl: item.helpUrl, nodes: item.nodes.map(node => ({ target: node.target, html: node.html.slice(0, 500), failureSummary: node.failureSummary })) };
}
async function visibleState(page, selector, file) {
  const scope = page.locator(selector);
  await scope.evaluate(node => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(800);
  const styles = await scope.evaluate(node => [...node.querySelectorAll('h3, p, small, [data-why-word], [data-why-description]')].map(element => {
    let opacity = 1, background = 'transparent';
    for (let parent = element; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent); opacity *= Number(style.opacity);
      if (background === 'transparent' && style.backgroundColor !== 'rgba(0, 0, 0, 0)') background = style.backgroundColor;
    }
    return { text: element.textContent.trim().slice(0, 80), color: getComputedStyle(element).color, background, effectiveOpacity: opacity };
  }));
  const audit = await new AxeBuilder({ page }).include(selector).withRules(['color-contrast']).analyze();
  const violations = audit.violations.map(violation), incomplete = audit.incomplete.map(violation);
  await page.screenshot({ path: file });
  return { selector, styles, violations, incomplete, screenshot: file, ok: violations.length === 0 };
}
(async () => {
  const browser = await engines[browserName].launch(browserName === 'chromium' ? { channel: 'msedge', headless: true } : { headless: true });
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin !== new URL(base).origin || /^\/api\/(contact|newsletter)$/.test(url.pathname)) return route.abort('blockedbyclient');
        return route.continue();
      });
      for (const route of routes) {
        const page = await context.newPage();
        const result = { route, width, violations: [], incomplete: [], pageErrors: [] };
        page.on('pageerror', error => result.pageErrors.push(error.message));
        try {
          const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 35000 });
          if (response.status() !== 200) throw new Error('HTTP ' + response.status());
          await page.evaluate(() => document.fonts.ready);
          if (route === '/' || route === '/en') await page.waitForFunction(() => document.querySelector('[data-final-hero]')?.getAttribute('data-visible') === 'true');
          // Trigger lazy content while retaining the whole DOM for axe's page scan.
          for (const fraction of [.25, .5, .75, 1, 0]) { await page.evaluate(f => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), fraction); await page.waitForTimeout(100); }
          const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
          result.violations = audit.violations.map(violation); result.incomplete = audit.incomplete.map(violation);
          result.passes = audit.passes.length; result.ok = result.violations.length === 0 && result.pageErrors.length === 0;
          await page.screenshot({ path: path.join(out, `${width}-${route.replaceAll('/', '_') || 'home'}.png`) });
          if (route === '/' || route === '/en') {
            // Preserve the unfiltered page result; verify scroll-dependent contrast separately.
            result.visibleStates = [];
            for (const [label, selector] of [
              ['integrations', '#services-integrations [data-service-title-stage]'],
              ...['agility', 'precision', 'support', 'excellence', 'side'].map(id => [id, `[data-why-value="${id}"]`]),
            ]) result.visibleStates.push(await visibleState(page, selector, path.join(out, `${width}-${route === '/' ? 'pt' : 'en'}-visible-${label}.png`)));
          }
        } catch (error) { result.ok = false; result.error = error.stack; }
        finally {
          results.push(result);
          fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ base, browserName, partial: true, results }, null, 2));
          await page.close();
        }
        console.log(JSON.stringify({ route, width, ok: result.ok, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), error: result.error }));
      }
      await context.close();
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ base, browserName, tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'], results, limitations: ['Automated reduced-motion DOM audit; no claim of full WCAG conformity.', 'Keyboard/modal and contact-step interactions are covered separately by qa-interactions.cjs.', 'Axe incomplete results require manual review; no rules or nodes excluded.'] }, null, 2));
    console.log(JSON.stringify({ passed: results.filter(r => r.ok).length, failed: results.filter(r => !r.ok).length, incompleteChecks: results.reduce((n, r) => n + r.incomplete.length, 0), visibleStateFailures: results.flatMap(r => (r.visibleStates || []).filter(s => !s.ok).map(s => ({ route: r.route, width: r.width, ...s }))) }));
    if (results.some(r => !r.ok) || results.length !== routes.length * 2) process.exitCode = 1;
  }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
