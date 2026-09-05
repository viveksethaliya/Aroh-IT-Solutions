import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:3465';

(async () => {
  const browser = await chromium.launch();
  let errors = [];
  const log = (msg) => { console.log(msg); };
  
  try {
    // ----------------------------------------------------
    // W3: Mobile menu at 390x844, panel open
    // ----------------------------------------------------
    log("=== W3: MOBILE MENU (390x844) ===");
    let mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto(`${BASE}/`);
    await mobilePage.waitForLoadState('networkidle');
    
    // Open menu
    await mobilePage.evaluate(() => { (document.querySelector('button[aria-controls="mobile-menu-panel"]')).click() });
    await mobilePage.waitForTimeout(400); // wait for animation
    
    const panelInfo = await mobilePage.evaluate(() => {
      const panel = document.getElementById('mobile-menu-panel');
      const rect = panel.getBoundingClientRect();
      const links = Array.from(panel.querySelectorAll('a'));
      const triggerBtn = document.querySelector('button[aria-controls="mobile-menu-panel"]');
      
      const res = {
        top: rect.top,
        heights: links.map(l => l.offsetHeight),
        linkCount: links.length,
        borders: links.map(l => window.getComputedStyle(l).borderBottomWidth),
      };
      
      return res;
    });
    
    log(`Panel getBoundingClientRect().top: ${panelInfo.top}`);
    log(`Each link's offsetHeight: ${panelInfo.heights.join(', ')}`);
    log(`Computed borderBottomWidth per link: ${panelInfo.borders.join(', ')}`);
    
    const menuTotalHeight = panelInfo.heights.reduce((a, b) => a + b, 0);
    log(`Total height of links (approx CTA etc): We can infer they fit if height < 844. 4*~68 = 272 < 844.`);
    
    // Check overlapping chatbot
    const chatbotOverlap = await mobilePage.evaluate(() => {
      const cb = document.querySelector('button[aria-label="Chatbot"], #chatbot-trigger'); // Adjust selector based on actual chatbot class/id
      if (!cb) return false;
      const cbRect = cb.getBoundingClientRect();
      
      const panel = document.getElementById('mobile-menu-panel');
      // If panel is overlaying, technically it overlaps everything underneath it. 
      // But let's see if the STUDIO LINE collides with Chatbot?
      const studioLine = panel.querySelector('p');
      if (!studioLine) return false;
      const slRect = studioLine.getBoundingClientRect();
      
      return !(slRect.right < cbRect.left || slRect.left > cbRect.right || slRect.bottom < cbRect.top || slRect.top > cbRect.bottom);
    });
    log(`Studio line overlaps chatbot: ${chatbotOverlap}`);
    
    // Keyboard tests
    await mobilePage.evaluate(() => document.activeElement.blur()); // ensure no focus
    await mobilePage.evaluate(() => { (document.querySelector('button[aria-controls="mobile-menu-panel"]')).click() });
    await mobilePage.waitForTimeout(400); // wait for focus trap

    const focusVisibleMouse = await mobilePage.evaluate(() => {
      return document.activeElement.matches(':focus-visible');
    });
    log(`After mouse click open: activeElement matches :focus-visible: ${focusVisibleMouse}`);
    
    await mobilePage.keyboard.press('Tab');
    const focusVisibleKeyboard = await mobilePage.evaluate(() => {
      return document.activeElement.matches(':focus-visible');
    });
    log(`After Tab: activeElement matches :focus-visible: ${focusVisibleKeyboard}`);
    
    await mobilePage.keyboard.press('Escape');
    await mobilePage.waitForTimeout(200);
    const focusReturned = await mobilePage.evaluate(() => {
      return document.activeElement === document.querySelector('button[aria-controls="mobile-menu-panel"]');
    });
    log(`Escape returns activeElement to trigger: ${focusReturned}`);
    
    await mobilePage.close();

    // ----------------------------------------------------
    // W3: Process rail at 880, 920, 1100, 1300
    // ----------------------------------------------------
    log("\n=== W3: PROCESS RAIL ===");
    for (const w of [880, 920, 1100, 1300]) {
      let rPage = await browser.newPage({ viewport: { width: w, height: 900 } });
      await rPage.goto(`${BASE}/#process`);
      await rPage.waitForLoadState('networkidle');
      
      const railData = await rPage.evaluate(() => {
        const rail = document.querySelector('#process .grid-cols-\\[repeat\\(4\\,minmax\\(0\\,1fr\\)\\)\\]');
        if(!rail) return { error: "not found" };
        const gridTemplateColumns = window.getComputedStyle(rail).gridTemplateColumns;
        const bays = Array.from(rail.children);
        return {
          gridTemplateColumns,
          bays: bays.map(b => window.getComputedStyle(b).boxShadow)
        };
      });
      
      if (railData.error) {
        log(`Width ${w}px: Rail not found!`);
      } else {
        log(`Width ${w}px: gridTemplateColumns: ${railData.gridTemplateColumns}`);
        log(`  Bay 1 box-shadow: ${railData.bays[0]}`);
        log(`  Bay 2 box-shadow: ${railData.bays[1]}`);
        log(`  Bay 3 box-shadow: ${railData.bays[2]}`);
        log(`  Bay 4 box-shadow: ${railData.bays[3]}`);
      }
      await rPage.close();
    }

    // ----------------------------------------------------
    // W3: Desktop header at 1440 on /contact, scrollY 0 and 600
    // ----------------------------------------------------
    log("\n=== W3: DESKTOP HEADER (1440x900, /contact) ===");
    let dPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await dPage.goto(`${BASE}/contact`);
    await dPage.waitForLoadState('networkidle');
    await dPage.addStyleTag({ content: 'body { min-height: 200vh !important; }' });
    
    const getHeaderInfo = async () => {
      return await dPage.evaluate(() => {
        const cta = document.querySelector('header .gap-3 a[href="/contact"]');
        const div = document.querySelector('header .w-\\[1px\\]');
        if (!cta || !div) return null;
        return {
          cta: {
            opacity: window.getComputedStyle(cta).opacity,
            display: window.getComputedStyle(cta).display,
            width: cta.getBoundingClientRect().width
          },
          divider: {
            opacity: window.getComputedStyle(div).opacity,
            display: window.getComputedStyle(div).display,
            width: div.getBoundingClientRect().width
          }
        };
      });
    };

    await dPage.evaluate(() => window.scrollTo(0, 0));
    await dPage.waitForTimeout(300);
    const info0 = await getHeaderInfo();
    log(`scrollY 0 -> CTA opacity: ${info0.cta.opacity}, display: ${info0.cta.display}, width: ${info0.cta.width}`);
    log(`scrollY 0 -> Divider opacity: ${info0.divider.opacity}, display: ${info0.divider.display}, width: ${info0.divider.width}`);

    await dPage.evaluate(() => window.scrollTo(0, 600));
    await dPage.waitForTimeout(500);
    const info600 = await getHeaderInfo();
    log(`scrollY 600 -> CTA opacity: ${info600.cta.opacity}, display: ${info600.cta.display}, width: ${info600.cta.width}`);
    log(`scrollY 600 -> Divider opacity: ${info600.divider.opacity}, display: ${info600.divider.display}, width: ${info600.divider.width}`);
    await dPage.close();

    // ----------------------------------------------------
    // W3: Mobile header at 320
    // ----------------------------------------------------
    log("\n=== W3: MOBILE HEADER (320x800) ===");
    let hPage = await browser.newPage({ viewport: { width: 320, height: 800 } });
    await hPage.goto(`${BASE}/`);
    await hPage.waitForLoadState('networkidle');
    const tinyInfo = await hPage.evaluate(() => {
      const wm = document.querySelector('header a[href="/"]');
      const trig = document.querySelector('header button[aria-controls="mobile-menu-panel"]');
      const cta = document.querySelector('header .gap-3 a[href="/contact"]');
      const r_wm = wm ? wm.getBoundingClientRect() : null;
      const r_trig = trig ? trig.getBoundingClientRect() : null;
      const r_cta = cta ? cta.getBoundingClientRect() : null;
      
      const overlap = (r1, r2) => {
        if(!r1 || !r2) return false;
        return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
      };

      return {
        wordmark: r_wm ? `x:${r_wm.x} w:${r_wm.width}` : null,
        trigger: r_trig ? `x:${r_trig.x} w:${r_trig.width}` : null,
        cta: r_cta ? `x:${r_cta.x} w:${r_cta.width}` : null,
        overlap1: overlap(r_wm, r_trig),
        overlap2: overlap(r_wm, r_cta),
        overlap3: overlap(r_trig, r_cta),
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });
    log(`Wordmark rect: ${tinyInfo.wordmark}`);
    log(`Trigger rect: ${tinyInfo.trigger}`);
    log(`CTA rect: ${tinyInfo.cta} (hidden: ${!tinyInfo.cta || tinyInfo.cta.includes('w:0')})`);
    log(`Any overlap? ${tinyInfo.overlap1 || tinyInfo.overlap2 || tinyInfo.overlap3}`);
    log(`document.documentElement.scrollWidth: ${tinyInfo.scrollWidth} (expected 320)`);
    await hPage.close();

    log("\nVerification scripts finished.");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
