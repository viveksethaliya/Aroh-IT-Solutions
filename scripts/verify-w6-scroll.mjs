import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const routes = ['/', '/about', '/services', '/portfolio', '/contact'];
  const widths = [320, 390, 768, 1024, 1440, 1920];
  
  let hasFailures = false;
  
  for (const route of routes) {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(`http://localhost:3465${route}`);
      await page.waitForTimeout(1000); // Allow fonts/layout to settle
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      
      const isPass = scrollWidth <= width;
      if (!isPass) hasFailures = true;
      
      console.log(`CHECK: Route ${route} at ${width}px`);
      console.log(`EXPECTED: <= ${width}`);
      console.log(`ACTUAL:   ${scrollWidth}`);
      console.log(`RESULT:   ${isPass ? 'PASS' : 'FAIL'}\n`);
      
      await page.close();
    }
  }
  
  await browser.close();
  process.exit(hasFailures ? 1 : 0);
})();
