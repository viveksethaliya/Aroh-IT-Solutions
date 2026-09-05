import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let gtmRequests = 0;
  page.on('request', request => {
    if (request.url().includes('googletagmanager.com')) {
      gtmRequests++;
      console.log(`Intercepted GTM request: ${request.url()}`);
    }
  });

  await page.goto('http://localhost:3465/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // give it a moment just in case
  
  console.log(`Total googletagmanager.com requests: ${gtmRequests}`);
  
  await browser.close();
})();
