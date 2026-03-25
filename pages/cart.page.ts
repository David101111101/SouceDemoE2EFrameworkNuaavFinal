import { Page } from '@playwright/test';
import { HeaderComponent } from './header.component.ts';

export class CartPage {

  readonly header: HeaderComponent;

  constructor(private page: Page) {
    this.header = new HeaderComponent(page);
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]', { hasText: itemName });
    await item.locator('button').click();
  }

  async isItemVisible(itemName: string) {
    return this.page.locator('[data-test="inventory-item"]', { hasText: itemName }).isVisible();
  }
}