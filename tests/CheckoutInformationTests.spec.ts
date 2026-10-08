import { Locator, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePageProducts } from "../pages/HomePageProducts";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutInformation } from "../pages/CheckoutInformationPage";

test.describe("form failed validation", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });

  test("failed validation - empty fields", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnCartBtn();

    const crt = new CartPage(page);
    await crt.clickOnCheckoutBtn();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });

  test.describe("invalid checkout", () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.loginSuccessStandardUser();
    });

    test("invalid checkout - all fields empty", async ({ page }) => {
      const hp = new HomePageProducts(page);
      await hp.clickOnSauceLabsBackPackAddToCartBtn();
      await hp.clickCartBtn();

      const cp = new CartPage(page);
      await cp.clickOnCheckoutBtn();

      const coinfo = new CheckoutInformation(page);
      await coinfo.fillForm("", "", "");
      const err = await coinfo.getErrorMsg();
      await expect(err).toContain("Error: First Name is required");
    });
  });
  test.describe("valid checkout", () => {
    test("valid checkout filled fields", async ({ page }) => {
      const hp = new HomePageProducts(page);
      await hp.clickOnSauceLabsBackPackAddToCartBtn();
      await hp.clickCartBtn();

      const cp = new CartPage(page);
      await cp.clickOnCheckoutBtn();

      const coinfo = new CheckoutInformation(page);
      await coinfo.fillForm("ofir", "moyal", "12345");
      await expect(page).toHaveURL(
        "https://www.saucedemo.com/checkout-step-two.html"
      );
    });
  });
});
