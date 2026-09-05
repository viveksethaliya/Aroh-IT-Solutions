import { chromium } from 'playwright';

const BASE = 'http://localhost:3465';
const routes = ['/', '/about', '/contact', '/portfolio', '/services'];
const widths = [320, 390, 768, 1024, 1440, 1920];

(async () => {
  const browser = await chromium.launch();
  try {
    console.log("=== W4: SCROLLWIDTH SWEEP ===");
    const page = await browser.newPage();
    
    // Create a plain text table
    console.log(`Route\t\t` + widths.map(w => w.toString().padEnd(8)).join(''));
    console.log(`-`.repeat(80));

    for (const route of routes) {
      let row = `${route.padEnd(16)}`;
      await page.goto(`${BASE}${route}`);
      await page.waitForLoadState('networkidle');
      
      for (const w of widths) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.waitForTimeout(100);
        const { scrollWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        }));
        
        let val = `${scrollWidth}/${innerWidth}`;
        if (scrollWidth > innerWidth) {
          val = `[FAIL] ${val}`;
        }
        row += val.padEnd(8);
      }
      console.log(row);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
