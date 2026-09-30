// Run against a production build: MENU_TEST_URL=http://localhost:3208/portfolio node tests/menu-keyboard.cjs
// Requires Playwright and its Chromium browser installed in the test environment.
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
(async () => {
 const browser=await chromium.launch({executablePath:process.env.CHROME_BIN || undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.goto(process.env.MENU_TEST_URL || 'http://localhost:3208/portfolio');
 const open=page.getByRole('button',{name:'Open menu',exact:true});
 await open.click();
 await page.waitForFunction(()=>document.activeElement?.textContent==='Home');
 assert.equal(await page.locator('#page-content').evaluate(e=>e.inert),true);
 for(const text of ['Ethos','Work','Instagram','Github','LinkedIn','Close menu','Home']) {
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label') || document.activeElement.textContent),text);
 }
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Close menu');
 await page.keyboard.press('Shift+Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.textContent),'LinkedIn');
 await page.keyboard.press('Escape');
 assert.equal(await open.getAttribute('aria-expanded'),'false');
 assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Open menu');
 assert.equal(await page.locator('#page-content').evaluate(e=>e.inert),false);
 // Scroll-triggered parent render must not reset focused navigation.
 await open.click();await page.waitForFunction(()=>document.activeElement?.textContent==='Home');
 await page.keyboard.press('Tab');await page.evaluate(()=>window.dispatchEvent(new Event('scroll')));
 assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Ethos');
 await page.keyboard.press('Escape');
 console.log('menu focus entry/cycle/reverse/Escape/inert/return tests passed');
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
