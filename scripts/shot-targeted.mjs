import { chromium } from 'playwright';

const BASE = 'http://localhost:3456';

async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.obs').forEach(e => e.classList.add('in'));
    document.documentElement.classList.add('js-reveal');
  });
  await page.waitForTimeout(800);
}

const b = await chromium.launch();

// 1. Scrolled header in light mode (mid-page and footer)
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await p.evaluate(() => document.documentElement.classList.add('light'));
  await p.waitForTimeout(400);
  await revealAll(p);
  
  // Mid page
  await p.evaluate(() => window.scrollTo(0, 1500));
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'shots/G1_light_scrolled_mid.png' });
  
  // Footer
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: 'shots/G1_light_scrolled_footer.png' });
  await p.close();
}

// 2. Dark homepage hero showing the heat sink (G2)
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await revealAll(p);
  await p.screenshot({ path: 'shots/G2_dark_home_hero.png' });
  await p.close();
}

// 3. /portfolio and /services full page, both themes (G3)
for (const route of ['/portfolio', '/services']) {
  for (const theme of ['dark', 'light']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + route);
    await p.waitForTimeout(2000);
    if (theme === 'light') {
      await p.evaluate(() => document.documentElement.classList.add('light'));
      await p.waitForTimeout(400);
    }
    await revealAll(p);
    const filename = route === '/portfolio' ? 'portfolio' : 'services';
    await p.screenshot({ path: `shots/G3_${theme}_${filename}_full.png`, fullPage: true });
    await p.close();
  }
}

// 4. Hero at 900px and 1200px (G5)
for (const width of [900, 1200]) {
  const p = await b.newPage({ viewport: { width, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await revealAll(p);
  await p.screenshot({ path: `shots/G5_hero_${width}px.png` });
  await p.close();
}

// 5. 390px homepage (G6)
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await revealAll(p);
  await p.screenshot({ path: 'shots/G6_dark_mobile_390.png' });
  await p.close();
}

// 6. Dark accordion with one slab open (G7)
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await revealAll(p);
  await p.evaluate(() => {
    const el = document.getElementById('capabilities') || document.querySelector('[class*="ServicesOverview"]');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo(0, 1500);
  });
  await p.waitForTimeout(600);
  const btns = await p.$$('article button[aria-expanded]');
  if (btns[1]) {
    await btns[1].click();
    await p.waitForTimeout(700);
  }
  await p.screenshot({ path: 'shots/G7_dark_accordion.png' });
  await p.close();
}

await b.close();
console.log('Targeted shots complete.');
