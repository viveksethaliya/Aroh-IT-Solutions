import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('shots', { recursive: true });

const BASE = 'http://localhost:3456';

// Force all .obs elements visible — needed because fullPage:true skips IntersectionObserver
async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.obs').forEach(e => {
      e.classList.add('in');
    });
    // Also force .js-reveal so the CSS gate engages properly for screenshot
    document.documentElement.classList.add('js-reveal');
  });
  await page.waitForTimeout(800);
}

const b = await chromium.launch();

// ── 8 route × theme combinations ─────────────────────────────────────
const routes = ['/', '/services', '/portfolio', '/contact'];

for (const theme of ['dark', 'light']) {
  for (const r of routes) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + r);
    await p.waitForTimeout(2500);

    if (theme === 'light') {
      // classList.add preserves font variable class; never wipe className
      await p.evaluate(() => document.documentElement.classList.add('light'));
      await p.waitForTimeout(400);
    }

    await revealAll(p);

    const slug = r === '/' ? '_home' : r.replace(/\//g, '_');
    const file = `shots/${theme}${slug}.png`;
    await p.screenshot({ path: file, fullPage: true });
    console.log('Shot:', file);
    await p.close();
  }
}

// ── Mobile 390px homepage dark ────────────────────────────────────────
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  await revealAll(p);
  await p.screenshot({ path: 'shots/dark_mobile_390.png', fullPage: false });
  console.log('Shot: shots/dark_mobile_390.png');
  await p.close();
}

// ── Heat sink — dark & light ──────────────────────────────────────────
for (const theme of ['dark', 'light']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2500);
  if (theme === 'light') {
    await p.evaluate(() => document.documentElement.classList.add('light'));
    await p.waitForTimeout(400);
  }
  // Scroll to heatsink
  await p.evaluate(() => {
    const el = document.querySelector('.sink') || document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `shots/${theme}_heatsink.png`, fullPage: false });
  console.log(`Shot: shots/${theme}_heatsink.png`);
  await p.close();
}

// ── Accordion open — dark & light ─────────────────────────────────────
for (const theme of ['dark', 'light']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2500);
  if (theme === 'light') {
    await p.evaluate(() => document.documentElement.classList.add('light'));
    await p.waitForTimeout(400);
  }
  await revealAll(p);
  // Scroll to ServicesOverview / accordion
  await p.evaluate(() => {
    const el = document.getElementById('capabilities') || document.querySelector('[class*="ServicesOverview"]') || document.querySelector('article');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo(0, document.body.scrollHeight * 0.55);
  });
  await p.waitForTimeout(600);
  // Click second accordion item to open it
  const btns = await p.$$('article button[aria-expanded]');
  if (btns[1]) {
    await btns[1].click();
    await p.waitForTimeout(700);
  }
  await p.screenshot({ path: `shots/${theme}_accordion.png`, fullPage: false });
  console.log(`Shot: shots/${theme}_accordion.png`);
  await p.close();
}

// ── Process rail — dark & light ───────────────────────────────────────
for (const theme of ['dark', 'light']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2500);
  if (theme === 'light') {
    await p.evaluate(() => document.documentElement.classList.add('light'));
    await p.waitForTimeout(400);
  }
  await revealAll(p);
  await p.evaluate(() => {
    const el = document.getElementById('process') || document.querySelector('[class*="ProcessRail"]') || document.querySelector('.rail');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    else window.scrollTo(0, document.body.scrollHeight * 0.72);
  });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `shots/${theme}_processrail.png`, fullPage: false });
  console.log(`Shot: shots/${theme}_processrail.png`);
  await p.close();
}

// ── Contact resting & error — dark & light ────────────────────────────
for (const theme of ['dark', 'light']) {
  // Resting state
  {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + '/contact');
    await p.waitForTimeout(2000);
    if (theme === 'light') {
      await p.evaluate(() => document.documentElement.classList.add('light'));
      await p.waitForTimeout(400);
    }
    await revealAll(p);
    await p.screenshot({ path: `shots/${theme}_contact_resting.png`, fullPage: true });
    console.log(`Shot: shots/${theme}_contact_resting.png`);
    await p.close();
  }
  // Error state — submit empty form
  {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + '/contact');
    await p.waitForTimeout(2000);
    if (theme === 'light') {
      await p.evaluate(() => document.documentElement.classList.add('light'));
      await p.waitForTimeout(400);
    }
    await revealAll(p);
    await p.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });
    await p.waitForTimeout(1000);
    await p.screenshot({ path: `shots/${theme}_contact_error.png`, fullPage: true });
    console.log(`Shot: shots/${theme}_contact_error.png`);
    await p.close();
  }
}

// ── Footer ────────────────────────────────────────────────────────────
for (const theme of ['dark', 'light']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE);
  await p.waitForTimeout(2000);
  if (theme === 'light') {
    await p.evaluate(() => document.documentElement.classList.add('light'));
    await p.waitForTimeout(400);
  }
  await revealAll(p);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: `shots/${theme}_footer.png`, fullPage: false });
  console.log(`Shot: shots/${theme}_footer.png`);
  await p.close();
}

await b.close();
console.log('All shots complete.');
