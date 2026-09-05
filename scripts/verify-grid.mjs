import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3467/');
  
  const cols = await page.evaluate(() => {
    const rail = document.querySelector('#process-rail');
    if (!rail) return null;
    const style = window.getComputedStyle(rail);
    const gridCols = style.gridTemplateColumns;
    return gridCols.split(' ').length;
  });
  
  console.log('CHECK: Process rail columns at 1440px');
  console.log('EXPECTED: 4');
  console.log(`ACTUAL:   ${cols}`);
  console.log(`RESULT:   ${cols === 4 ? 'PASS' : 'FAIL'}`);
  
  await browser.close();
})();
