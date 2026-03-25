import { test, expect } from '../../fixtures/base.fixture.ts';

test('standard user can sort products by price low to high', async ({ inventoryPage, page }) => {

  await inventoryPage.goto();

  await inventoryPage.sortBy('lohi');
  const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();

  const numeric = prices.map(p => Number(p.replace('$', '')));

  const sorted = [...numeric].sort((a, b) => a - b);

  await expect(numeric).toEqual(sorted);
});