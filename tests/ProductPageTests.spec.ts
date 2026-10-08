import { Locator, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePageProducts } from "../pages/HomePageProducts";
import { ProductPage } from "../pages/ProductPage";

test.describe("product page test", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });
  test("add product to cart", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.addBackPackToCart();

    await expect(pp.isCartFull).toBeTruthy();
  });

  test("Sauce Labs Backpack page - verify price", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    const SauceLabsBackpackPrice= await pp.getSauceLabsBackpackPrice();
    await expect(SauceLabsBackpackPrice).toBe("$29.99");
  });

  test("Sauce Labs Backpack page - verify Title", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    const SauceLabsBackpackTitle= await pp.getSauceLabsBackpackTitle();
    await expect(SauceLabsBackpackTitle).toBe("Sauce Labs Backpack");
  });

  test("Sauce Labs Backpack page - verify Text", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    const SauceLabsBackpackText= await pp.getSauceLabsBackpackText();
    await expect(SauceLabsBackpackText).toBe("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
  });


  test("move to checkout page", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.clickOnSauceLabsBackPackBtn();

    const pp = new ProductPage(page);
    await pp.clickOnCartBtn();
    
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });
});
