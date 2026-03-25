import { Page, Locator } from '@playwright/test';

export class HeaderComponent {

  private cartBadge: Locator;
  private cartLink: Locator;
  private burgerMenu: Locator;
  private logoutLink: Locator;

  constructor(private page: Page) {
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return Number(text);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}