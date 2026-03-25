import { test as base, Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page.ts';
import { LoginPage } from '../pages/login.page.ts';
import { CartPage } from '../pages/cart.page.ts';
import { CheckoutInfoPage } from '../pages/checkout-info.page.ts';;
import { CheckoutOverviewPage } from '../pages/checkout-overview.page.ts'

type Fixtures = {
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  CheckoutOverviewPage: CheckoutOverviewPage;
};

export const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }: { page: Page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }: { page: Page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }: { page: Page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
    CheckoutOverviewPage: async ({ page }: { page: Page }, use) => {
    await use(new CheckoutOverviewPage(page));
    }


});

export const expect = test.expect;