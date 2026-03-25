import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  await page.click('#login-button');

  // critical stability wait
  await page.waitForURL('**/inventory.html');
  await page.waitForSelector('[data-test="inventory-container"]');

  await context.storageState({
    path: 'storage/storageState.json'
  });

  await browser.close();
}

export default globalSetup;