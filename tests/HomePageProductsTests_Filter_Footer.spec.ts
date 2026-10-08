import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePageProducts } from "../pages/HomePageProducts";
test.describe("Filter feature tests", ()=>{
  test("Verify default filter = Name A to Z", async ({page})=>{
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser(); 

    const hp = new HomePageProducts(page);
    const filterValue = await hp.getFilterValue();
    const FirstItemTitle = await hp.getFirstItemTitle();
    await expect(filterValue).toBe("Name (A to Z)");
    await expect(FirstItemTitle).toBe("Sauce Labs Backpack");

  })

  test("Check filter Name Z to A", async ({page})=>{
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser(); 

    const hp = new HomePageProducts(page);

    await hp.FilterSelectZtoA();

    const filterValue = await hp.getFilterValue();
    const FirstItemTitle = await hp.getFirstItemTitle();

    await expect(filterValue).toBe("Name (Z to A)");
    await expect(FirstItemTitle).toBe("Test.allTheThings() T-Shirt (Red)");

  })

  test("Check filter Price Low to High ", async ({page})=>{
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser(); 

    const hp = new HomePageProducts(page);

    await hp.FilterSelectLowtoHigh();

    const filterValue = await hp.getFilterValue();
    const firstItemPrice = await hp.getFirstItemPrice();

    await expect(filterValue).toBe("Price (low to high)");
    await expect(firstItemPrice).toBe("$7.99");

  })

  test("Check filter Price High to Low ", async ({page})=>{
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser(); 

    const hp = new HomePageProducts(page);

    await hp.FilterSelectHiToLow();

    const filterValue = await hp.getFilterValue();
    const firstItemPrice = await hp.getFirstItemPrice();

    await expect(filterValue).toBe("Price (high to low)");
    await expect(firstItemPrice).toBe("$49.99");

  })
})

test.describe("footer links tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });

  test("test X link", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.scrollToFooter();

    const [XPage] = await Promise.all([
      page.waitForEvent("popup"),
      hp.clickFooterXBtn(),
    ]);

    await expect(XPage).toHaveURL("https://x.com/saucelabs");
  });

  test("test facebook link", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.scrollToFooter();
    const [facebookPage] = await Promise.all([
      page.waitForEvent("popup"),
      hp.clickFooterFacebookBtn(),
    ]);

    await expect(facebookPage).toHaveURL("https://www.facebook.com/saucelabs");
  });

  test("test linkedin link", async ({ page }) => {
    const hp = new HomePageProducts(page);
    await hp.scrollToFooter();

    const [linkedinPage] = await Promise.all([
      page.waitForEvent("popup"),
      hp.clickFooterLinkedinBtn(),
    ]);

await expect(linkedinPage).toHaveURL(/linkedin\.com/);
  });
});
