import { chromium } from 'playwright';

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3467/');
    
    // Wait for the button
    const btn = await page.waitForSelector('button[aria-controls="mobile-menu-panel"]', { state: 'visible' });
    await page.waitForTimeout(2000); // Wait for React hydration
    
    await page.waitForTimeout(1000); // Wait for render
    await page.waitForTimeout(1000);
    
    const panel = await page.$('#mobile-menu-panel');
    const hasInert = await panel.evaluate(el => el.hasAttribute('inert'));
    console.log(`Panel inert: ${hasInert}`);
    
    // Focus first link and tab through
    await page.keyboard.press('Tab');
    
    for (let i = 0; i < 5; i++) {
      const data = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tagName: el.tagName,
          textContent: el.textContent.trim().replace(/\n/g, ' '),
          rect: `x:${Math.round(el.getBoundingClientRect().x)} y:${Math.round(el.getBoundingClientRect().y)} w:${Math.round(el.getBoundingClientRect().width)} h:${Math.round(el.getBoundingClientRect().height)}`,
        };
      });
      console.log(`[Tab ${i+1}] ${data.tagName} "${data.textContent.substring(0, 30)}" | Rect: ${data.rect}`);
      await page.keyboard.press('Tab');
    }
  } catch(e) {
    console.error(e);
  } finally {
    if (browser) await browser.close();
  }
})();
