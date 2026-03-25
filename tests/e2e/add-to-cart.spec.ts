import { test, expect } from '../../fixtures/base.fixture.ts';

test('standard user can add item to cart', async ({ inventoryPage }) => {

  await inventoryPage.goto();

  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  const badgeCount = await inventoryPage.header.getCartBadgeCount();

  await expect(badgeCount).toBe(1);
});