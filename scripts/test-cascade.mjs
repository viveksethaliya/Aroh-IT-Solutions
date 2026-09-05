import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3466/');
  
  await page.evaluate(() => {
    const cta = document.querySelector('header a[href="/contact"]');
    if (cta) cta.focus({ focusVisible: true });
  });
  await page.waitForTimeout(100);
  
  const data = await page.evaluate(() => {
    const cta = document.querySelector('header a[href="/contact"]');
    const style = getComputedStyle(cta);
    return `outlineOffset: ${style.outlineOffset}, outlineStyle: ${style.outlineStyle}`;
  });
  console.log(`CTA: ${data}`);
  
  await browser.close();
})();
