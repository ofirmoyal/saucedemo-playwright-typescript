import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Highlight element
  async highlight(locator: string): Promise<void> {
    await this.page.locator(locator).highlight();
  }

  async click(locator: string): Promise<void> {
    await this.highlight(locator);
    await this.page.locator(locator).click();
  }

  async fillText(locator: string, txt: string): Promise<void> {
    await this.highlight(locator);
    await this.page.locator(locator).fill(txt);
  }

  async fillNumber(locator: string, number: number): Promise<void> {
    await this.highlight(locator);
    await this.page.locator(locator).fill(String(number));
  }

  async getText(locator: string): Promise<string> {
    await this.highlight(locator);
    return await this.page.locator(locator).innerText();
  }

  async selectOption(selector: string, value: string): Promise<void> {
    await this.highlight(selector);
    await this.page.locator(selector).selectOption({ label: value });
  }

  async selectByValue(locator: string, value: string): Promise<void> {
    await this.highlight(locator);
    await this.page.locator(locator).selectOption({ value });
  }

async scrollIntoView(locator: string): Promise<void> {
  await this.page.locator(locator).scrollIntoViewIfNeeded();
}

}