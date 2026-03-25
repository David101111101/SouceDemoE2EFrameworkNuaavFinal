import { Page } from '@playwright/test';

export class CheckoutOverviewPage {

  constructor(private page: Page) {}

  async finishOrder() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async isConfirmationVisible() {
    return this.page.locator('[data-test="complete-header"]').isVisible();
  }
}