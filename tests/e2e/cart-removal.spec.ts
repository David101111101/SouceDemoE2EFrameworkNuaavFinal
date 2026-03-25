import { test, expect } from '../../fixtures/base.fixture.ts';

test('user can remove item from cart', async ({ inventoryPage, cartPage }) => {

  await inventoryPage.goto();

  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  await inventoryPage.header.openCart();

  await cartPage.removeItem('Sauce Labs Backpack');

  const visible = await cartPage.isItemVisible('Sauce Labs Backpack');

  await expect(visible).toBeFalsy();
});