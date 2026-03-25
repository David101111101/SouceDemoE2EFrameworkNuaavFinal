import { test, expect } from '../../fixtures/base.fixture.ts';
import { USERS } from '../../test-data/users.ts';

test.use({ storageState: { cookies: [], origins: [] } });

test('performance user inventory loads within acceptable threshold', async ({ loginPage, page }) => {

  const start = Date.now();

  await loginPage.goto();
  await loginPage.login(USERS.PERFORMANCE.username, USERS.PERFORMANCE.password);

  await page.waitForURL('**/inventory.html');
  await page.waitForSelector('[data-test="inventory-container"]');

  const duration = Date.now() - start;
  console.log(`Performance user inventory load time: ${duration}ms`);

  // threshold
  await expect(duration).toBeLessThan(10000);
});