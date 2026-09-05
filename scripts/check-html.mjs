import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3466/');
  await page.waitForSelector('button[aria-label="Open menu"]', { state: 'visible' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.querySelector('button[aria-label="Open menu"]').click());
  await page.waitForTimeout(1000);
  const html = await page.$eval('#mobile-menu-panel', el => el.outerHTML);
  console.log(html);
  await browser.close();
})();
