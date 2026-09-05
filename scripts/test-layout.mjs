import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const measure = async (path) => {
    await page.goto(`http://localhost:3465${path}`);
    await page.waitForTimeout(1000); // let things settle
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Performance.enable');
    // We should reload to get metrics from start!
    await page.goto(`http://localhost:3465${path}`);
    await page.waitForTimeout(500);
    const { metrics } = await cdp.send('Performance.getMetrics');
    
    console.log(`\n=== Metrics for ${path} ===`);
    metrics.filter(m => /Layout|RecalcStyle|Style/.test(m.name)).forEach(m => {
      console.log(`${m.name}: ${m.value}`);
    });
  };

  await measure('/');
  await measure('/contact');
  
  await browser.close();
})();
