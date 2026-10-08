import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import dotenv from "dotenv";
dotenv.config();

export class LoginPage extends BasePage {
  // ELEMENTS
  
  private readonly usernameInput = "#user-name";
  private readonly passwordInput = "#password";
  private readonly loginButton = "#login-button";
  private readonly validationError = '[data-test="error"]';
  private readonly title = ".title";

  constructor(page: Page) {
    super(page);
  }

  // METHODS
  async goto(): Promise<void> {
    await this.page.goto(process.env.BASE_URL!);
  }

  async fillForm(username: string, password: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async fillFormFromEnv(): Promise<void> {
    await this.fillText("#user-name", process.env.SAUCE_USERNAME!);
    await this.fillText("#password", process.env.SAUCE_PASSWORD!);
    await this.click(this.loginButton);
  }

  async loginSuccessStandardUser(): Promise<void> {
    await this.goto();
    await this.fillUsername("standard_user");
    await this.fillPassword("secret_sauce");
    await this.clickLogin();
  }

  async loginValid(): Promise<void> {
    await this.fillForm(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  }

  async loginInvalidLockedOut(): Promise<void> {
    await this.fillForm("locked_out_user", "secret_sauce");
  }

  async loginInvalidProblem(): Promise<void> {
    await this.fillForm("problem_user", "secret_sauce");
  }

  async getValidationError(): Promise<string> {
    return await this.getText(this.validationError);
  }

  async fillUsername(username: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fillText(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  async getHomePageTitle(): Promise<string> {
    return (await this.getText(this.title)) || "returned empty";
  }
}
