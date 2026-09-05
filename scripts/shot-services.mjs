import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:3456';

async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.obs').forEach(e => e.classList.add('in'));
    document.documentElement.classList.add('js-reveal');
  });
  await page.waitForTimeout(800);
}

async function run() {
  const b = await chromium.launch();
  
  for (const theme of ['dark', 'light']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + '/services');
    await p.waitForTimeout(2000);
    if (theme === 'light') {
      await p.evaluate(() => document.documentElement.classList.add('light'));
      await p.waitForTimeout(400);
    }
    await revealAll(p);

    const bad = await p.evaluate(() =>
      document.body.innerText.includes('Build Error') ||
      document.body.innerText.includes('Unhandled Runtime Error') ||
      document.querySelector('nextjs-portal') !== null
    );
    if (bad) throw new Error('BUILD ERROR ON ' + p.url() + ' — not capturing');
    
    // Check if we are doing H4
    const isH4 = fs.readFileSync('src/app/services/service-image.tsx', 'utf8').includes('repeating-linear-gradient');
    const prefix = isH4 ? 'H4' : 'H13';
    
    await p.screenshot({ path: `shots/${prefix}_${theme}_services_full.png`, fullPage: true });
    await p.close();
  }
  
  await b.close();
  console.log('Shots complete.');
}

run();
