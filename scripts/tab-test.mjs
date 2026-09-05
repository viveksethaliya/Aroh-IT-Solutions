import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3465/contact');
  await page.waitForTimeout(500);

  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const data = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        tagName: el.tagName,
        textContent: el.textContent.substring(0, 50).trim().replace(/\s+/g, ' '),
        rect: `x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height}`,
        visibility: style.visibility
      };
    });
    console.log(`[Tab ${i+1}] ${data.tagName} "${data.textContent}" | Rect: ${data.rect} | Vis: ${data.visibility}`);
  }

  const audit = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex]'));
    const offscreen = els.filter(el => {
      const rect = el.getBoundingClientRect();
      return (rect.bottom < 0 || rect.top > 900 || rect.right < 0 || rect.left > 1440) && rect.width > 0 && rect.height > 0;
    });
    return offscreen.map(el => {
      const style = getComputedStyle(el);
      return {
        tagName: el.tagName,
        className: el.className,
        rect: `x:${el.getBoundingClientRect().x} y:${el.getBoundingClientRect().y}`,
        visibility: style.visibility,
        inert: el.closest('[inert]') !== null
      };
    });
  });
  console.log('\n=== Off-screen Focusable Audit ===');
  audit.forEach(a => console.log(`${a.tagName} | Rect: ${a.rect} | Vis: ${a.visibility} | Inert: ${a.inert}`));

  await browser.close();
})();
