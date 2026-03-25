import { test, expect } from '../../fixtures/base.fixture.ts';
import { USERS } from '../../test-data/users.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test('problem user catalogue still displays items', async ({ loginPage, page }) => {

  await loginPage.goto();
  await loginPage.login(USERS.PROBLEM.username, USERS.PROBLEM.password);

  await page.waitForURL('**/inventory.html');
  await page.waitForSelector('[data-test="inventory-container"]');

  const items = page.locator('[data-test="inventory-item"]');

  await expect(items).toHaveCount(6);
});