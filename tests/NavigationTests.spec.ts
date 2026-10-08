import { test, expect } from "@playwright/test";
import { HomePageProducts } from "../pages/HomePageProducts";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutInformation } from "../pages/CheckoutInformationPage";
import { CheckoutOverview } from "../pages/CheckoutOverviewPage";
import { CheckoutComplete } from "../pages/CheckoutCompletePage";

test.describe("NavBar  tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });

  test("nav bar is opened", async ({ page }) => {
    const hpp = new HomePageProducts(page);

    await hpp.clickNavBarOpenBtn();
    const isVisible = await hpp.isNavBarVisible();
    expect(isVisible).toBeTruthy();
  });

  test("nav bar line items are found", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickNavBarOpenBtn();
    expect(await hpp.isAllItemsVisible()).toBe(true);
    expect(await hpp.isAboutVisible()).toBe(true);
    expect(await hpp.isLogoutVisible()).toBe(true);
    expect(await hpp.isAllItemsVisible()).toBe(true);
  });

  test("nav bar check ALL ITEMS link", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickSauceLabsBackPackAddToCartBtn();
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickNavBarOpenBtn();
    await crt.clickNavBarAllItems();

    await expect(page).toHaveURL("/inventory.html");
  });

  test("nav bar check ABOUT link", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickNavBarOpenBtn();
    await hpp.clickNavBarAbout();
    await expect(page).toHaveURL("https://saucelabs.com/");
  });

  test("nav bar check LOG OUT link", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickSauceLabsBackPackAddToCartBtn();
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickNavBarOpenBtn();
    await crt.clickNavBarLogOut();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(page.locator("#user-name")).toHaveValue("");
    await expect(page.locator("#password")).toHaveValue("");
  });

  test("nav bar check RESET APP STATE ", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickSauceLabsBackPackAddToCartBtn();
    const badgeValue = await hpp.isCartBadgeVisible();
    expect(await hpp.isCartBadgeVisible()).toBe(true);
    await hpp.clickNavBarOpenBtn();
    await hpp.clickNavBarReset();
    expect(await hpp.isCartBadgeVisible()).toBeFalsy();
  });

  test("nav bar is opened in PRODUCT page", async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
    const hpp = new HomePageProducts(page);
    await hpp.clickSauceLabsBackPackBtn();
    const pp = new ProductPage(page);
    await pp.clickNavBarOpenBtn();
    const isVisible = await pp.isNavBarVisible();
    expect(isVisible).toBeTruthy;
  });

  test("nav bar is opened in CART page", async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
    const hpp = new HomePageProducts(page);
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickNavBarOpenBtn();
    const isVisible = await crt.isNavBarVisible();
    expect(isVisible).toBeTruthy();
  });

  test("nav bar is opened in CHECKOUT INFORMATION page", async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
    const hpp = new HomePageProducts(page);
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickCheckoutBtn();
    const coinfo = new CheckoutInformation(page);
    await coinfo.clickNavBarOpenBtn();
    const isVisible = await coinfo.isNavBarVisible();
    expect(isVisible).toBeTruthy();
  });

  test("nav bar is opened in CHECKOUT OVERVIEW page", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickCheckoutBtn();
    const coinfo = new CheckoutInformation(page);
    await coinfo.fillFormSuccess("Ofir", "Moyal", 12345);
    const cooview = new CheckoutOverview(page);
    await cooview.clickNavBarOpenBtn();
    const isVisible = await cooview.isNavBarVisible();
    expect(isVisible).toBeTruthy();
  });

  test("nav bar is opened in CHECKOUT COMPLETE page", async ({ page }) => {
    const hpp = new HomePageProducts(page);
    await hpp.clickCartBtn();
    const crt = new CartPage(page);
    await crt.clickCheckoutBtn();
    const coinfo = new CheckoutInformation(page);
    await coinfo.fillFormSuccess("Ofir", "Moyal", 12345);
    const cooview = new CheckoutOverview(page);
    await cooview.clickNavBarOpenBtn();
    await cooview.clickFinishBtn();
    const coocomp = new CheckoutComplete(page);
    const isVisible = await coocomp.isNavBarVisible();
    expect(isVisible).toBeTruthy();
  });
});
