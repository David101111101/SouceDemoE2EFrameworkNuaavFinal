import { Page } from '@playwright/test';
import { HeaderComponent } from './header.component.ts';

export class InventoryPage {
    readonly header: HeaderComponent;
    constructor(private page: Page) {
        this.header = new HeaderComponent(page);
    }
    async goto() {
        await this.page.goto('/inventory.html');
        await this.page.waitForSelector('[data-test="inventory-container"]');
    }
    async addItemToCart(itemName: string) {
        const slug = itemName.toLowerCase().replace(/ /g, '-');

        const button = this.page.locator(
        `[data-test="add-to-cart-${slug}"]`
        );
        await button.click();
  }
    async sortBy(optionValue: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(optionValue);
  }
}