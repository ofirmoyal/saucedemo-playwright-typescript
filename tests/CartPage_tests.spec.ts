import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePageProducts } from "../pages/HomePageProducts";
import { CartPage } from "../pages/CartPage";
import { ProductPage } from "../pages/ProductPage";

test.describe("cart tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });

  test("verify product title ", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnAddToCartBtn();
    await pp.clickOnCartBtn();

    const cp = new CartPage(page);
    const productTitle= await cp.getProductTitle();
    await expect(productTitle).toBe("Sauce Labs Backpack");
  });

  test("verify product text ", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnAddToCartBtn();
    await pp.clickOnCartBtn();

    const cp = new CartPage(page);
    const productText= await cp.getProductText();
    await expect(productText).toBe("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
  });

  test("verify product price ", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnAddToCartBtn();
    await pp.clickOnCartBtn();

    const cp = new CartPage(page);
    const productPrice= await cp.getProductPrice();
    await expect(productPrice).toBe("$29.99");
  });

  test("test checkout", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnAddToCartBtn();
    await pp.clickOnCartBtn();

    const cp = new CartPage(page);
    await cp.clickOnCheckoutBtn();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
});
