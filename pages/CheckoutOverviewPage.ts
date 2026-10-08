import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverview extends BasePage {
  // ELEMENTS
  
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly FinishBtn = "#finish";
  private readonly Title = ".title";
  private readonly PayamenInformation ='.summary_value_label[data-test="payment-info-value"]';
  private readonly PriceTotal = '.summary_total_label[data-test="total-label"]';
  private readonly continueBtn = "#continue";
  private readonly cancelBtn = "#cancel";


  constructor(page: Page) {
    super(page);
  }

  // METHODS

  async clickContinueBtn() {
    await this.click(this.continueBtn);
  }

  async clickCancelBtn() {
    await this.click(this.cancelBtn);
  }
  async clickFinishBtn() {
    await this.click(this.FinishBtn);
  }

  async clickNavBarOpenBtn() {
    await this.click(this.NavBarOpenBtn);
  }

  async isNavBarVisible(): Promise<boolean> {
    return this.page.locator(this.NavBarOpened).isVisible();
  }

  async getTitleText(): Promise<string> {
    return (await this.page.locator(this.Title).textContent()) ?? "";
  }

  async getPaymentInformationValue(): Promise<string> {
    return await this.getText(this.PayamenInformation);
  }

  async getTotalValue(): Promise<string> {
    return await this.getText(this.PriceTotal);
  }
}
