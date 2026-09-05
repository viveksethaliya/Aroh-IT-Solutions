import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3465/#process');
  
  const output = await page.evaluate(() => {
    const bays = document.querySelectorAll('#process .grid-cols-\\[repeat\\(4\\,minmax\\(0\\,1fr\\)\\)\\] > div');
    const b = bays[0];
    return JSON.stringify({
      bayCount: bays.length,
      isFirstChild: b.matches(':first-child'),
      parentFirstElementChild: b.parentElement.firstElementChild.tagName,
      previousElementSibling: b.previousElementSibling?.tagName ?? 'none',
      bay1ClassList: b.className,
      bay2ClassList: bays[1].className,
      classListsIdentical: b.className === bays[1].className,
      computedBoxShadow: getComputedStyle(b).boxShadow
    }, null, 2);
  });
  
  console.log(output);
  await browser.close();
})();
