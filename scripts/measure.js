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

    // 1. Ghost backdrop words (pseudo-elements ::before)
    results['About ::before (ghost ABOUT)'] = getProps(document.querySelector('#about'), '::before');
    results['Journey ::before (ghost JOURNEY)'] = getProps(document.querySelector('#experience'), '::before');

    // 2. About heading (.spot) and its <em>
    results['About heading (.spot)'] = getProps(document.querySelector('#about .spot'));
    results['About heading <em>'] = getProps(document.querySelector('#about .spot em'));

    // 3. About intro .sub and its <em>
    results['About intro (.sub)'] = getProps(document.querySelector('#about .sub'));
    results['About intro <em>'] = getProps(document.querySelector('#about .sub em'));

    // 4. Skill group label and p (first group)
    results['Skillgroup label'] = getProps(document.querySelector('#about .skillgroup .label'));
    results['Skillgroup p'] = getProps(document.querySelector('#about .skillgroup p'));

    // 5. Stats <b>
    results['Stats b (first stat)'] = getProps(document.querySelector('#about .stats b'));

    // 6. Journey heading and <em>
    results['Journey heading (.spot)'] = getProps(document.querySelector('#experience .spot'));
    results['Journey heading <em>'] = getProps(document.querySelector('#experience .spot em'));

    // 7. Each step elements
    const steps = document.querySelectorAll('#experience .step');
    steps.forEach((step, i) => {
      results[`Step ${i} .gy numeral`] = getProps(step.querySelector('.gy'));
      results[`Step ${i} h3`] = getProps(step.querySelector('h3'));
      results[`Step ${i} .company`] = getProps(step.querySelector('.company'));
      results[`Step ${i} p`] = getProps(step.querySelector('.sb p, p'));
    });

    // 8. "Current focus" p
    results['Current focus p'] = getProps(document.querySelector('#experience .now p'));

    return results;
  });
}

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const report = {};

  for (const vp of viewports) {
    const vpKey = `${vp.width}x${vp.height}`;
    report[vpKey] = {};

    // HTML Reference
    const pageHtml = await browser.newPage({ viewport: vp });
    await pageHtml.goto(htmlUrl, { waitUntil: 'networkidle' });
    // wait for font loading and init
    await pageHtml.evaluate(() => document.fonts?.ready);
    await pageHtml.waitForTimeout(1000);
    const htmlStyles = await getElementStyles(pageHtml);
    await pageHtml.close();

    // React Build
    const pageReact = await browser.newPage({ viewport: vp });
    await pageReact.goto(reactUrl, { waitUntil: 'networkidle' });
    await pageReact.evaluate(() => document.fonts?.ready);
    await pageReact.waitForTimeout(1000);
    const reactStyles = await getElementStyles(pageReact);
    await pageReact.close();

    report[vpKey] = {
      html: htmlStyles,
      react: reactStyles
    };
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
