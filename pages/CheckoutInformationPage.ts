import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutInformation extends BasePage {
  private readonly erroMsg: Locator;

  // ELEMENTS
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly firstName = "#first-name";
  private readonly lastName = "#last-name";
  private readonly zipCode = "#postal-code";
  private readonly continueBtn = "#continue";
  private readonly cancelBtn = "#cancel";

  constructor(page: Page) {
    super(page);
    this.erroMsg = page.locator(".error-message-container.error h3");
  }

  // METHODS

  async clickContinueBtn() {
    await this.click(this.cancelBtn);
  }

  async clickCancelBarOpenBtn() {
    await this.click(this.continueBtn);
  }
  async clickNavBarOpenBtn() {
    await this.click(this.NavBarOpenBtn);
  }

  async isNavBarVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarOpened).count()) > 0;
  }

  async fillFormSuccess(
    firstname: string,
    lastname: string,
    zipcode: number
  ): Promise<void> {
    await this.fillText(this.firstName, firstname);
    await this.fillText(this.lastName, lastname);
    await this.fillNumber(this.zipCode, zipcode);
    await this.click(this.continueBtn);
  }

  async fillForm(
    firstname: string,
    lastname: string,
    zipcode: string
  ): Promise<void> {
    await this.fillText(this.firstName, firstname);
    await this.fillText(this.lastName, lastname);
    await this.fillText(this.zipCode, zipcode);
    await this.click(this.continueBtn);
  }
  async getErrorMsg(): Promise<string> {
    return (await this.erroMsg.textContent()) || "";
  }
}
