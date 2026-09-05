import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 390, height: 844}});
  await page.goto('http://localhost:3465/');
  await page.click('button[aria-controls="mobile-menu-panel"]');
  await page.waitForTimeout(500);
  
  // Force focus-visible state
  await page.evaluate(() => {
    const p = document.getElementById('mobile-menu-panel');
    p.focus({ focusVisible: true });
  });

  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root: { nodeId } } = await cdp.send('DOM.getDocument');
  const { nodeId: elNodeId } = await cdp.send('DOM.querySelector', { nodeId, selector: '#mobile-menu-panel' });
  const { matchedCSSRules } = await cdp.send('CSS.getMatchedStylesForNode', { nodeId: elNodeId });
  
  console.log("Matched CSS Rules:");
  matchedCSSRules.forEach(r => {
    console.log(`Selector: ${r.rule.selectorList.text}`);
    console.log(`Style:\n${r.rule.style.cssText}`);
    console.log('---');
  });
  
  await browser.close();
})();
