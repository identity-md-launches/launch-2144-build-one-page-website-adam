import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { serveDirectory } from './static-server.mjs';

const outIndex = process.argv.indexOf('--out');
const out = resolve(outIndex >= 0 ? process.argv[outIndex + 1] : 'test/scratch/interactions');
await mkdir(out, { recursive: true });
const result = { engines: [], assertions: [], limitations: [], errors: [] };
const check = (name, condition) => { assert.ok(condition, name); result.assertions.push(name); console.log(`PASS ${name}`); };
const dirIndex = process.argv.indexOf('--dir');
const preview = await serveDirectory(dirIndex >= 0 ? process.argv[dirIndex + 1] : 'dist');

async function inspect(engine, name) {
  let browser;
  try {
    browser = await engine.launch({ headless: true });
  } catch (error) {
    if (name === 'chromium') throw error;
    result.limitations.push(`${name} could not launch: ${error.message.split('\n').filter(Boolean).slice(0, 8).join(' ')}`);
    console.log(`LIMITATION ${result.limitations.at(-1)}`);
    return;
  }
  try {
    const context = await browser.newContext({ acceptDownloads: true });
    const external = [];
    const failed = [];
    const page = await context.newPage();
    page.on('pageerror', (error) => failed.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') failed.push(message.text()); });
    page.on('response', (response) => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
    await context.route('**/*', (route) => {
      if (!route.request().url().startsWith(preview.url)) { external.push(route.request().url()); return route.abort(); }
      return route.continue();
    });

    for (const width of [320, 390, 624, 720, 816, 1088, 1440]) {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 1000 });
      await page.goto(preview.url);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.adam-portrait').evaluate((image) => image.decode());
      check(`${name}: no horizontal overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if ([320, 390, 720, 1440].includes(width)) {
        await page.locator('.postcard-art img').scrollIntoViewIfNeeded();
        await page.locator('.postcard-art img').evaluate((image) => image.decode());
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: join(out, `${name}-${width}.png`), fullPage: true });
      }
      if (width === 390) {
        const product = await page.locator('.adam-portrait').boundingBox();
        const button = await page.getByRole('button', { name: 'Give Adam a carrot' }).boundingBox();
        check(`${name}: Adam and primary action fit first 390px screen`, product.y >= 0 && product.y + product.height <= 844 && button.y + button.height <= 844);
        await page.screenshot({ path: join(out, `${name}-390-first-screen.png`) });
      }
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(preview.url);
    check(`${name}: initial carrot count is zero`, await page.locator('.carrot-count').innerText() === '0 carrots this visit');
    await page.evaluate(() => document.fonts.ready);
    check(`${name}: both local typefaces are loaded`, await page.evaluate(() => [...document.fonts].filter((face) => /Fraunces|DM Sans/.test(face.family) && face.status === 'loaded').length === 2));
    await page.keyboard.press('Tab');
    check(`${name}: skip link is the first keyboard stop`, await page.getByRole('link', { name: 'Skip to content' }).evaluate((link) => link === document.activeElement));
    await page.keyboard.press('Enter');
    check(`${name}: skip link moves focus to main content`, await page.locator('main').evaluate((main) => main === document.activeElement));
    await page.keyboard.press('Tab');
    const feed = page.getByRole('button', { name: 'Give Adam a carrot' });
    check(`${name}: primary action follows main content in tab order`, await feed.evaluate((button) => button === document.activeElement));
    check(`${name}: primary button shows keyboard focus`, await feed.evaluate((button) => button.matches(':focus-visible') && getComputedStyle(button).outlineStyle !== 'none'));
    await page.screenshot({ path: join(out, `${name}-focus.png`) });
    await page.keyboard.press('Space');
    check(`${name}: feeding has a pending state`, await page.getByRole('button', { name: 'Adam is munching…' }).getAttribute('aria-busy') === 'true');
    await page.locator('.feed-button').evaluate((button) => { for (let i = 0; i < 20; i++) button.click(); });
    await page.locator('.carrot-count').filter({ hasText: '1 carrot this visit' }).waitFor();
    check(`${name}: rapid activation gives only one carrot`, await page.locator('.carrot-count').innerText() === '1 carrot this visit');
    check(`${name}: success is announced without moving focus`, await page.locator('.feed-status').innerText() === 'One carrot. One very happy goat.' && await feed.evaluate((button) => button === document.activeElement));
    await page.keyboard.press('Enter');
    await page.locator('.carrot-count').filter({ hasText: '2 carrots this visit' }).waitFor();
    check(`${name}: repeat feeding and pluralization work`, await page.locator('.feed-status').innerText() === 'He likes your taste in snacks.');

    await page.setViewportSize({ width: 320, height: 844 });
    const heroHeight = await page.locator('.hero').evaluate((hero) => hero.getBoundingClientRect().height);
    for (let count = 3; count <= 7; count++) {
      await feed.click();
      await page.locator('.carrot-count').filter({ hasText: `${count} carrots this visit` }).waitFor();
      check(`${name}: feedback ${count} keeps the hero stable at 320px`, Math.abs(await page.locator('.hero').evaluate((hero) => hero.getBoundingClientRect().height) - heroHeight) < 1);
    }
    await page.setViewportSize({ width: 390, height: 844 });

    await page.getByRole('link', { name: 'Meet Adam', exact: true }).click();
    await page.waitForURL('**/#about');
    check(`${name}: section navigation works at gateway subpath`, new URL(page.url()).pathname === '/preview/' && new URL(page.url()).hash === '#about');
    const summaries = page.locator('summary');
    for (let i = 0; i < 3; i++) {
      await summaries.nth(i).focus();
      await page.keyboard.press('Enter');
      check(`${name}: question ${i + 1} expands by keyboard`, await summaries.nth(i).evaluate((summary) => summary.parentElement.open));
      await page.keyboard.press('Space');
      check(`${name}: question ${i + 1} closes by keyboard`, !(await summaries.nth(i).evaluate((summary) => summary.parentElement.open)));
    }

    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download the postcard' }).click();
    const download = await downloadEvent;
    check(`${name}: postcard download has intended name`, download.suggestedFilename() === 'adam-the-goat-postcard.png');
    const downloadPath = join(out, `${name}-download.png`);
    await download.saveAs(downloadPath);
    const bytes = await readFile(downloadPath);
    check(`${name}: downloaded postcard is a real PNG`, bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) && bytes.length > 20000);
    await page.getByRole('button', { name: 'Give Adam another carrot' }).click();
    check(`${name}: return action focuses primary button`, await feed.evaluate((button) => button === document.activeElement));

    await page.reload();
    check(`${name}: visit count resets on reload as described`, await page.locator('.carrot-count').innerText() === '0 carrots this visit');
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await writeFile(join(out, `${name}-axe.json`), JSON.stringify(scan, null, 2));
    check(`${name}: axe WCAG A/AA scan has zero violations`, scan.violations.length === 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await feed.click();
    check(`${name}: reduced motion suppresses goat and carrot animations`, await page.evaluate(() => [document.querySelector('.adam-portrait'), document.querySelector('.flying-carrot')].every((node) => getComputedStyle(node).animationName === 'none')));
    await page.locator('.carrot-count').filter({ hasText: '1 carrot this visit' }).waitFor();
    await page.screenshot({ path: join(out, `${name}-reduced-motion.png`) });

    await page.goto(preview.url);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    check(`${name}: 200% text enlargement has no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.locator('.postcard-art img').scrollIntoViewIfNeeded();
    await page.locator('.postcard-art img').evaluate((image) => image.decode());
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: join(out, `${name}-text-200.png`), fullPage: true });
    check(`${name}: all runtime requests stay local`, external.length === 0);
    check(`${name}: no script, console, or resource failures`, failed.length === 0);
    result.engines.push(name);
    await context.close();
  } finally { await browser.close(); }
}

try {
  await inspect(chromium, 'chromium');
  await inspect(webkit, 'webkit');
  console.log(`Validated ${result.assertions.length} assertions in ${result.engines.join(', ')}.`);
} catch (error) {
  result.errors.push(error.stack || String(error));
  console.error(error);
  process.exitCode = 1;
} finally {
  await preview.close();
  await writeFile(join(out, 'results.json'), JSON.stringify(result, null, 2));
}
