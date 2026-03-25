import { test, expect } from '../../fixtures/base.fixture.ts';

test('standard user can complete checkout', async ({
  inventoryPage,
  cartPage,
  checkoutInfoPage,
  CheckoutOverviewPage
}) => {

  await inventoryPage.goto();

  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  await inventoryPage.header.openCart();

  await cartPage.startCheckout();

  await checkoutInfoPage.fillCustomerInfo('John', 'Doe', '10001');

  await checkoutInfoPage.continue();

  await CheckoutOverviewPage.finishOrder();

  const confirmation = await CheckoutOverviewPage.isConfirmationVisible();

  await expect(confirmation).toBeTruthy();
});