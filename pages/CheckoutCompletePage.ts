import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutComplete extends BasePage {
  // ELEMENTS
  
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly confirmationTitle = '.complete-header';
  private readonly confirmationText = '.complete-text';
  private readonly backHomeBtn = '#back-to-products';


  constructor(page: Page) {
    super(page);
  }

  // METHODS
  async clickNavBarOpenBtn() {
    await this.click(this.NavBarOpenBtn);
  }

  async isNavBarVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarOpened).count()) > 0;
  }
  async getconfirmationTitle(): Promise<string> {
    return await this.getText(this.confirmationTitle);
  }
  async getconfirmationText(): Promise<string> {
    return await this.getText(this.confirmationText);
  }
  async clickbackHomeBtn() {
    await this.click(this.backHomeBtn);
  }
}
