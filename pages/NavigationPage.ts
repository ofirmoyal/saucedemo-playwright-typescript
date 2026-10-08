import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NavigationPage extends BasePage {
  // ELEMENTS

  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly NavBarAllItems = "#inventory_sidebar_link";
  private readonly NavBarAbout = "#about_sidebar_link";
  private readonly NavBarLogOut = "#logout_sidebar_link";
  private readonly NavBarReset = "#reset_sidebar_link";
  private readonly NavBarCloseBtn = "#react-burger-cross-btn";

  constructor(page: Page) {
    super(page);
  }

  // METHODS
  
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
}
