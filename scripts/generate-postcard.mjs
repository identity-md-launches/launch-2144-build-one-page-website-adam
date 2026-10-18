import { chromium } from 'playwright';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { serveDirectory } from './static-server.mjs';

// The final PNG is a delivered runtime asset; regeneration is optional, not part of build.
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;src:url('./fonts/fraunces-latin.woff2');font-weight:700}
@font-face{font-family:DM;src:url('./fonts/dm-sans-latin.woff2');font-weight:400 700}
*{box-sizing:border-box}body{margin:0;background:#f28b56;color:#273b2b;width:1200px;height:630px;overflow:hidden}
.circle{position:absolute;left:650px;top:64px;width:490px;height:490px;background:#f6f4e9;border-radius:50%}
.goat{position:absolute;left:490px;top:24px;width:830px;transform:rotate(-4deg)}
.copy{position:absolute;left:74px;top:105px;z-index:2}h1{font:700 120px/.97 Fraunces,Georgia,serif;letter-spacing:-6px;margin:0}h1 span{color:#f6f4e9}
p{font:400 23px/1.5 DM,Arial,sans-serif;margin:28px 0 0;max-width:370px}
.footer{position:absolute;left:78px;bottom:53px;font:600 16px DM,Arial,sans-serif}
.flower{position:absolute;top:64px;left:554px;transform:rotate(-15deg)}
</style></head><body><div class="circle"></div><img class="goat" src="./adam.webp" alt="Adam the goat"><div class="copy"><h1>Adam<br>the goat<span>.</span></h1><p>A little goat, a good day.</p></div><svg class="flower" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#273b2b" stroke-width="1.2" stroke-linecap="round"><path d="M12 7c-5-8-11 1-4 4-8 4-1 12 4 5 5 7 12-1 4-5 7-3 1-12-4-4Z"/><circle cx="12" cy="11.5" r="2"/><path d="M12 17v5"/></svg><div class="footer">A little digital escape.</div></body></html>`;

const filename = resolve('public/postcard-artwork.html');
let browser;
let preview;
try {
  await mkdir('public', { recursive: true });
  await writeFile(filename, html);
  preview = await serveDirectory('public');
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`${preview.url}postcard-artwork.html`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.goat').evaluate((image) => image.decode());
  await page.screenshot({ path: 'public/adam-postcard.png' });
  console.log('Created public/adam-postcard.png (1200 × 630)');
} finally {
  await browser?.close();
  await preview?.close();
  await rm(filename, { force: true });
}
