import { execSync } from 'child_process';
import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:3459';

(async () => {
  try {
    // 1. Save actual OG image binary
    console.log("Fetching OG image...");
    const ogRes = await fetch(`${BASE}/opengraph-image`);
    const ogBuffer = await ogRes.arrayBuffer();
    fs.writeFileSync('C:/Users/vivek/.gemini/antigravity-ide/brain/bc7f61ff-70b6-4648-8ed1-a2ea0c5e6688/actual-opengraph-image.png', Buffer.from(ogBuffer));
    console.log("Saved actual-opengraph-image.png");

    // 2. Fetch HEAD via Playwright
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.goto(BASE + '/');
    let head = await page.evaluate(() => {
      const clone = document.head.cloneNode(true);
      clone.querySelectorAll('style, script').forEach(el => el.remove());
      return clone.innerHTML;
    });
    console.log("\n=== HEAD: / ===");
    console.log(head.replace(/></g, '>\n<'));
    
    await browser.close();
    
    // 3. Run Lighthouse Mobile
    console.log("\nRunning Lighthouse mobile...");
    execSync(`npx lighthouse ${BASE}/ --output json --output-path ./lh-mobile-final.json --chrome-flags="--headless" --form-factor=mobile --preset=perf`, { stdio: 'inherit' });
    
    const lhData = JSON.parse(fs.readFileSync('./lh-mobile-final.json', 'utf8'));
    console.log("Lighthouse Perf Score:", lhData.categories.performance.score * 100);
    console.log("Lighthouse Accessibility Score:", lhData.categories.accessibility?.score ? lhData.categories.accessibility.score * 100 : 'N/A');
    console.log("Lighthouse Best Practices Score:", lhData.categories['best-practices']?.score ? lhData.categories['best-practices'].score * 100 : 'N/A');
    console.log("Lighthouse SEO Score:", lhData.categories.seo?.score ? lhData.categories.seo.score * 100 : 'N/A');
    
    // Check audits
    const lcp = lhData.audits['largest-contentful-paint'].displayValue;
    const tbt = lhData.audits['total-blocking-time'].displayValue;
    console.log(`LCP: ${lcp}`);
    console.log(`TBT: ${tbt}`);
    
  } catch (e) {
    console.error("Verification failed:", e);
  }
})();
