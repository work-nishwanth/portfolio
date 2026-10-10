import { chromium } from 'playwright';

const viewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 390, height: 844 }
];

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  let hasErrors = false;

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: vp });
    const consoleMessages = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
      }
    });

    page.on('pageerror', err => {
      consoleMessages.push(`[pageerror] ${err.message}`);
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(500);

    // Check overflow and fitting
    const layout = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const isPaged = document.documentElement.classList.contains('paged');
      return {
        hasHorizontalOverflow: docWidth > winWidth + 1,
        docWidth,
        winWidth,
        isPaged
      };
    });

    console.log(`Viewport ${vp.width}x${vp.height}:`, {
      ...layout,
      consoleIssues: consoleMessages.length
    });

    if (consoleMessages.length > 0) {
      console.error(`Issues at ${vp.width}x${vp.height}:`, consoleMessages);
      hasErrors = true;
    }

    if (layout.hasHorizontalOverflow) {
      console.error(`Horizontal overflow detected at ${vp.width}x${vp.height}! docWidth: ${layout.docWidth}, winWidth: ${layout.winWidth}`);
      hasErrors = true;
    }

    // Test deep link behavior
    if (vp.width === 1440) {
      // Test direct #case-twiller deep link
      const deepPage = await browser.newPage({ viewport: vp });
      await deepPage.goto('http://localhost:5173/#case-twiller', { waitUntil: 'networkidle' });
      const dialogOpen = await deepPage.evaluate(() => {
        const d = document.querySelector('dialog#case');
        return d && d.open;
      });
      console.log('Deep link #case-twiller opens modal lazily on load:', dialogOpen);

      // Close modal and verify history replaceState didn't navigate back/away
      await deepPage.evaluate(() => {
        document.querySelector('#close-case')?.click();
      });
      const hashAfterClose = await deepPage.evaluate(() => window.location.hash);
      console.log('Hash after closing direct deep link:', hashAfterClose);
      await deepPage.close();
    }

    await page.close();
  }

  await browser.close();

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('ALL VIEWPORTS PASSED WITH CLEAN CONSOLE AND ZERO OVERFLOW.');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
