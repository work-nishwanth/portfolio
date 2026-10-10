import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artifactDir = 'C:\\Users\\nishw\\.gemini\\antigravity-ide\\brain\\e217d6b6-cb1a-4190-a64e-665a7f94483c';
const htmlUrl = 'file:///' + path.resolve(__dirname, '../portfolio_motion_v9.html').replace(/\\/g, '/');
const reactUrl = 'http://localhost:5173/';

async function capture() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1916, height: 934 } });

  // 1. React build screenshots
  await page.goto(reactUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1000);

  // Scroll to About
  await page.evaluate(() => {
    document.querySelector('#about')?.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'react_about_1916x934.png'),
    clip: { x: 0, y: 0, width: 1916, height: 934 }
  });

  // Scroll to Journey / Experience
  await page.evaluate(() => {
    document.querySelector('#experience')?.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'react_journey_1916x934.png'),
    clip: { x: 0, y: 0, width: 1916, height: 934 }
  });

  // 2. HTML Reference screenshots
  await page.goto(htmlUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1000);

  // Scroll to About in HTML
  await page.evaluate(() => {
    document.querySelector('#about')?.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'html_about_1916x934.png'),
    clip: { x: 0, y: 0, width: 1916, height: 934 }
  });

  // Scroll to Journey in HTML
  await page.evaluate(() => {
    document.querySelector('#experience')?.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, 'html_journey_1916x934.png'),
    clip: { x: 0, y: 0, width: 1916, height: 934 }
  });

  await browser.close();
  console.log('Screenshots captured successfully.');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
