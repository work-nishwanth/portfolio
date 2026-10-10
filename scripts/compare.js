import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewports = [
  { width: 1916, height: 934 },
  { width: 1440, height: 900 }
];

const htmlUrl = 'file:///' + path.resolve(__dirname, '../portfolio_motion_v9.html').replace(/\\/g, '/');
const reactUrl = 'http://localhost:5173/';

async function getElementStyles(page) {
  return await page.evaluate(() => {
    function getProps(el, pseudo = null) {
      if (!el) return null;
      const s = window.getComputedStyle(el, pseudo);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        fontStyle: s.fontStyle,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        wordSpacing: s.wordSpacing,
        textTransform: s.textTransform,
        color: s.color
      };
    }

    const results = {};

    results['About ::before (ghost ABOUT)'] = getProps(document.querySelector('#about'), '::before');
    results['Journey ::before (ghost JOURNEY)'] = getProps(document.querySelector('#experience'), '::before');
    results['About heading (.spot)'] = getProps(document.querySelector('#about .spot'));
    results['About heading <em>'] = getProps(document.querySelector('#about .spot em'));
    results['About intro (.sub)'] = getProps(document.querySelector('#about .sub'));
    results['About intro <em>'] = getProps(document.querySelector('#about .sub em'));
    results['Skillgroup label'] = getProps(document.querySelector('#about .skillgroup .label'));
    results['Skillgroup p'] = getProps(document.querySelector('#about .skillgroup p'));
    results['Stats b (first stat)'] = getProps(document.querySelector('#about .stats b'));
    results['Journey heading (.spot)'] = getProps(document.querySelector('#experience .spot'));
    results['Journey heading <em>'] = getProps(document.querySelector('#experience .spot em'));

    const steps = document.querySelectorAll('#experience .step');
    steps.forEach((step, i) => {
      results[`Step ${i} .gy numeral`] = getProps(step.querySelector('.gy'));
      results[`Step ${i} h3`] = getProps(step.querySelector('h3'));
      results[`Step ${i} .company`] = getProps(step.querySelector('.company'));
      results[`Step ${i} p`] = getProps(step.querySelector('.sb p, p'));
    });

    results['Current focus p'] = getProps(document.querySelector('#experience .now p'));

    return results;
  });
}

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const diffs = [];

  for (const vp of viewports) {
    const vpKey = `${vp.width}x${vp.height}`;

    const pageHtml = await browser.newPage({ viewport: vp });
    await pageHtml.goto(htmlUrl, { waitUntil: 'networkidle' });
    await pageHtml.evaluate(() => document.fonts?.ready);
    await pageHtml.waitForTimeout(800);
    const htmlStyles = await getElementStyles(pageHtml);
    await pageHtml.close();

    const pageReact = await browser.newPage({ viewport: vp });
    await pageReact.goto(reactUrl, { waitUntil: 'networkidle' });
    await pageReact.evaluate(() => document.fonts?.ready);
    await pageReact.waitForTimeout(800);
    const reactStyles = await getElementStyles(pageReact);
    await pageReact.close();

    for (const key of Object.keys(htmlStyles)) {
      const h = htmlStyles[key];
      const r = reactStyles[key];
      if (!h || !r) {
        diffs.push({ viewport: vpKey, element: key, issue: 'missing element', h, r });
        continue;
      }
      for (const prop of Object.keys(h)) {
        if (h[prop] !== r[prop]) {
          diffs.push({
            viewport: vpKey,
            element: key,
            property: prop,
            html: h[prop],
            react: r[prop]
          });
        }
      }
    }
  }

  await browser.close();
  console.log('TOTAL MISMATCHES:', diffs.length);
  console.log(JSON.stringify(diffs, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
