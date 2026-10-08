import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  // ELEMENTS
  private readonly title = ".title";
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly NavBarAllItems = "#inventory_sidebar_link";
  private readonly NavBarAbout = "#about_sidebar_link";
  private readonly NavBarLogOut = "#logout_sidebar_link";
  private readonly NavBarReset = "#reset_sidebar_link";
  private readonly CheckOutBtn = "#checkout";
  private readonly CartItemNumber = ".shopping_cart_badge";
  private readonly checkOutBtn = ".btn.btn_action.btn_medium.checkout_button ";
  private readonly removeBtn = "#remove-sauce-labs-backpack";
  private readonly addToCartBtn = ".btn.btn_primary.btn_small.btn_inventory";
  private readonly productPrice = ".inventory_item_price";
  private readonly productTitle = "[data-test='inventory-item-name']";
  private readonly productText = "[data-test='inventory-item-desc']";

  constructor(page: Page) {
    super(page);
  }

    // METHODS

  async clickNavBarAllItems() {
    await this.click(this.NavBarAllItems);
  }

  async clickNavBarAbout() {
    await this.click(this.NavBarAbout);
  }

  async clickNavBarLogOut() {
    await this.click(this.NavBarLogOut);
  }

  async clickNavBarReset() {
    await this.click(this.NavBarReset);
  }

  async clickNavBarOpenBtn() {
    await this.click(this.NavBarOpenBtn);
  }


  async clickCheckoutBtn(): Promise<void> {
    await this.click(this.CheckOutBtn);
  }
  async isCartEmpty(): Promise<boolean> {
    const count = await this.page.locator(this.CartItemNumber).count();
    return count === 0;
  }

  async isItemkAdded(): Promise<boolean> {
    const count = await this.page.locator(this.CartItemNumber).count();
    return count === 1;
  }

  async getPageTitle(): Promise<string> {
    return await this.getText(this.title);
  }

  async isNavBarVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarOpened).count()) > 0;
  }
  async clickOnRmoveBtn(): Promise<void> {
    await this.click(this.removeBtn);
  }

  async clickOnCheckoutBtn(): Promise<void> {
    await this.click(this.checkOutBtn);
  }

  async clickOnAddToCartBtn(): Promise<void> {
    await this.click(this.addToCartBtn);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  async getProductText(): Promise<string> {
    return await this.getText(this.productText);
  }
}
