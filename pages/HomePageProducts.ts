import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePageProducts extends BasePage {
  // ELEMENTS

  private readonly title = ".title";
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly NavBarAllItems = "#inventory_sidebar_link";
  private readonly NavBarAbout = "#about_sidebar_link";
  private readonly NavBarLogOut = "#logout_sidebar_link";
  private readonly NavBarReset = "#reset_sidebar_link";
  private readonly NavBarCloseBtn = "#react-burger-cross-btn";
  private readonly SauceLabsBackPackBtn = "#item_4_title_link";
  private readonly SauceLabsBackPackTitle = "#item_4_title_link";
  private readonly SauceLabsBackPackAddToCartBtn =
    "#add-to-cart-sauce-labs-backpack";
  private readonly SauceLabsBackPackRemoveFromCartBtn =
    "#remove-sauce-labs-backpack";
  private readonly HomePageCartBtn = "#shopping_cart_container";
  private readonly HomePageCartBtnNumber = ".shopping_cart_badge";
  private readonly footerXBtn = ".social_x a";
  private readonly footeFacebookBtn = ".social_facebook a";
  private readonly footerLinkedinBtn = ".social_linkedin a";
  private readonly footer = "footer";

  private readonly FilterBtn = ".select_container";
  private readonly FilterDD = ".product_sort_container";
  private readonly firstItemPrice = ".inventory_item_price";
  private readonly FirstItemTitle = ".inventory_item_name ";
  private readonly FilterValue = ".active_option";
  private readonly Footer = "footer";

  constructor(page: Page) {
    super(page);
  }

  // METHODS

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async clickFilterBtn() {
    await this.click(this.FilterBtn);
  }

  async FilterSelectAtoZ() {
    await this.selectByValue(this.FilterDD, "az");
  }
  async FilterSelectZtoA() {
    await this.selectByValue(this.FilterDD, "za");
  }
  async FilterSelectLowtoHigh() {
    await this.selectByValue(this.FilterDD, "lohi");
  }
  async FilterSelectHiToLow() {
    await this.selectByValue(this.FilterDD, "hilo");
  }

  async getFirstItemPrice(): Promise<string> {
    const firstPrice = await this.page
      .locator(this.firstItemPrice)
      .first()
      .textContent();
    return firstPrice ?? "null";
  }

  async getFirstItemTitle(): Promise<string> {
    const firstTitle = await this.page
      .locator(this.FirstItemTitle)
      .first()
      .textContent();
    return firstTitle ?? "null";
  }

  async getFilterValue(): Promise<string> {
    return this.getText(this.FilterValue);
  }

  async clickNavBarOpenBtn() {
    await this.click(this.NavBarOpenBtn);
  }

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

  async clickNavBarCloseBtn() {
    await this.click(this.NavBarCloseBtn);
  }

  async isNavBarVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarOpened).count()) > 0;
  }

  async isAllItemsVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarAllItems).count()) > 0;
  }
  async isAboutVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarAbout).count()) > 0;
  }
  async isLogoutVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarLogOut).count()) > 0;
  }
  async isResetVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarReset).count()) > 0;
  }

  async clickOnSauceLabsBackPackAddToCartBtn(): Promise<void> {
    await this.click(this.SauceLabsBackPackAddToCartBtn);
  }

  async clickOnSauceLabsBackPackBtn(): Promise<void> {
    await this.click(this.SauceLabsBackPackBtn);
  }

  async clickSauceLabsBackPackAddToCartBtn() {
    await this.click(this.SauceLabsBackPackAddToCartBtn);
  }
  async clickSauceLabsBackPackRemoveFromCartBtn() {
    await this.click(this.SauceLabsBackPackRemoveFromCartBtn);
  }
  async clickCartBtn() {
    await this.click(this.HomePageCartBtn);
  }
  async getBackpackTitle(): Promise<string> {
    return await this.getText(this.SauceLabsBackPackTitle);
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return (await this.page.locator(this.HomePageCartBtnNumber).count()) > 0;
  }

  async getPageTitle(): Promise<string> {
    return await this.getText(this.title);
  }

  async clickSauceLabsBackPackBtn() {
    await this.click(this.SauceLabsBackPackBtn);
  }

  async clickFooterXBtn() {
    await this.click(this.footerXBtn);
  }

  async clickFooterFacebookBtn() {
    await this.click(this.footeFacebookBtn);
  }

  async clickFooterLinkedinBtn() {
    await this.click(this.footerLinkedinBtn);
  }

  async scrollToFooter(): Promise<void> {
    await this.scrollIntoView(this.footer);
  }
}
