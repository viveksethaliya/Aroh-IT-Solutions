import { chromium } from 'playwright';

const BASE = 'http://localhost:3456';

async function run() {
  const b = await chromium.launch();
  
  // Create a context with javaScriptEnabled: false
  const ctx = await b.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false
  });
  
  const p = await ctx.newPage();
  
  // 1. Home
  await p.goto(BASE + '/');
  await p.waitForTimeout(2000);
  await p.screenshot({ path: 'shots/nojs_home.png', fullPage: true });
  
  // 2. Services
  await p.goto(BASE + '/services');
  await p.waitForTimeout(2000);
  await p.screenshot({ path: 'shots/nojs_services.png', fullPage: true });

  await b.close();
  console.log('No-JS shots complete.');
}

run();
