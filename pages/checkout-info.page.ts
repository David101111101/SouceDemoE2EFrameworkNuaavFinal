import { Page } from '@playwright/test';

export class CheckoutInfoPage {

  constructor(private page: Page) {}

  async fillCustomerInfo(first: string, last: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', first);
    await this.page.fill('[data-test="lastName"]', last);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
  }
}