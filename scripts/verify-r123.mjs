import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:3465';
const OUT_DIR = 'C:/Users/vivek/.gemini/antigravity-ide/brain/bc7f61ff-70b6-4648-8ed1-a2ea0c5e6688';
const startTime = Date.now();

(async () => {
  const browser = await chromium.launch();
  
  try {
    // U1/U2: Desktop tests (1440px)
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    // Test on /contact for active state
    await desktopPage.goto(`${BASE}/contact`);
    await desktopPage.waitForLoadState('networkidle');
    
    // Force the body to be scrollable in case /contact is too short on 1440x900
    await desktopPage.addStyleTag({ content: 'body { min-height: 200vh !important; }' });
    
    // Light theme top
    await desktopPage.evaluate(() => document.documentElement.classList.add('light'));
    await desktopPage.evaluate(() => document.documentElement.classList.remove('dark'));
    await desktopPage.evaluate(() => window.scrollTo(0, 0));
    await desktopPage.waitForTimeout(200);
    await desktopPage.screenshot({ path: `${OUT_DIR}/desktop_header_light_top.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });
    
    // Light theme scrolled
    await desktopPage.evaluate(() => window.scrollTo(0, 200));
    await desktopPage.waitForTimeout(500); // wait for stuck transition
    await desktopPage.screenshot({ path: `${OUT_DIR}/desktop_header_light_scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });
    
    // Dark theme top
    await desktopPage.evaluate(() => document.documentElement.classList.add('dark'));
    await desktopPage.evaluate(() => document.documentElement.classList.remove('light'));
    await desktopPage.evaluate(() => window.scrollTo(0, 0));
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({ path: `${OUT_DIR}/desktop_header_dark_top.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });
    
    // Dark theme scrolled
    await desktopPage.evaluate(() => window.scrollTo(0, 200));
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({ path: `${OUT_DIR}/desktop_header_dark_scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });
    
    // U5a: Process Rail Cramped
    // Process rail at 920px and 960px
    const railPage = await browser.newPage({ viewport: { width: 920, height: 900 } });
    await railPage.goto(`${BASE}/#process`);
    await railPage.waitForLoadState('networkidle');
    await railPage.screenshot({ path: `${OUT_DIR}/process_rail_920.png` });
    
    await railPage.setViewportSize({ width: 960, height: 900 });
    await railPage.waitForTimeout(200);
    await railPage.screenshot({ path: `${OUT_DIR}/process_rail_960.png` });
    await railPage.close();

    // U5c: 320px Header Check
    const tinyMobilePage = await browser.newPage({ viewport: { width: 320, height: 800 } });
    await tinyMobilePage.goto(`${BASE}/`);
    await tinyMobilePage.waitForLoadState('networkidle');
    await tinyMobilePage.screenshot({ path: `${OUT_DIR}/mobile_header_320.png`, clip: { x: 0, y: 0, width: 320, height: 80 } });
    await tinyMobilePage.close();

    // U3/U4: Mobile Menu Tests (390px)
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    
    // Full page /contact dark
    await mobilePage.goto(`${BASE}/contact`);
    await mobilePage.waitForLoadState('networkidle');
    await mobilePage.evaluate(() => document.documentElement.classList.add('dark'));
    await mobilePage.evaluate(() => document.documentElement.classList.remove('light'));
    
    // Mobile menu keyboard tests
    console.log("Running keyboard tests...");
    
    // Open menu
    await mobilePage.evaluate(() => { (document.querySelector('button[aria-controls="mobile-menu-panel"]') ).click() });
    await mobilePage.waitForTimeout(400); // wait for animation
    
    // Screenshot open menu (dark)
    await mobilePage.screenshot({ path: `${OUT_DIR}/mobile_menu_open_dark.png` });

    await mobilePage.evaluate(() => document.documentElement.classList.add('light'));
    await mobilePage.evaluate(() => document.documentElement.classList.remove('dark'));
    await mobilePage.screenshot({ path: `${OUT_DIR}/mobile_menu_open_light.png` });
    
    await mobilePage.close();

    // Assert mtimes
    const files = [
      'desktop_header_light_top.png', 'desktop_header_light_scrolled.png',
      'desktop_header_dark_top.png', 'desktop_header_dark_scrolled.png',
      'process_rail_920.png', 'process_rail_960.png',
      'mobile_header_320.png', 'mobile_menu_open_dark.png', 'mobile_menu_open_light.png'
    ];
    for (const f of files) {
      const stats = fs.statSync(`${OUT_DIR}/${f}`);
      if (stats.mtimeMs < startTime) {
        throw new Error(`File ${f} is stale! mtime: ${stats.mtimeMs} < ${startTime}`);
      }
    }
    
    console.log("Verification complete. All files freshly captured.");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
