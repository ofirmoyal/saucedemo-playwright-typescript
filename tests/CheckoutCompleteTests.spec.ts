import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePageProducts } from "../pages/HomePageProducts";
import { CartPage } from "../pages/CartPage";
import { CheckoutInformation } from "../pages/CheckoutInformationPage";
import { CheckoutOverview } from "../pages/CheckoutOverviewPage";
import { CheckoutComplete } from "../pages/CheckoutCompletePage";


test.describe("verify confirmation info", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.loginSuccessStandardUser();
      });
    test("verify confirmation title", async ({ page }) => {
      const hp = new HomePageProducts(page);
      await hp.clickOnSauceLabsBackPackAddToCartBtn();
      await hp.clickCartBtn();

      const cp = new CartPage(page);
      await cp.clickOnCheckoutBtn();

      const coinfo = new CheckoutInformation(page);
      await coinfo.fillForm("ofir", "moyal", "12345");

      const cooview = new CheckoutOverview(page);
      await cooview.clickFinishBtn()

      const cocom = new CheckoutComplete(page);
      const infoTitle = await cocom.getconfirmationTitle();  
      await expect(infoTitle).toBe("Thank you for your order!");

    });
    test("verify confirmation text ", async ({ page }) => {
        const hp = new HomePageProducts(page);
        await hp.clickOnSauceLabsBackPackAddToCartBtn();
        await hp.clickCartBtn();
  
        const cp = new CartPage(page);
        await cp.clickOnCheckoutBtn();
  
        const coinfo = new CheckoutInformation(page);
        await coinfo.fillForm("ofir", "moyal", "12345");
  
        const cooview = new CheckoutOverview(page);
        await cooview.clickFinishBtn()
  
        const cocom = new CheckoutComplete(page);
        const infoText = await cocom.getconfirmationText();  
        await expect(infoText).toBe("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
  
      });
      test("check Back Home button ", async ({ page }) => {
        const hp = new HomePageProducts(page);
        await hp.clickOnSauceLabsBackPackAddToCartBtn();
        await hp.clickCartBtn();
  
        const cp = new CartPage(page);
        await cp.clickOnCheckoutBtn();
  
        const coinfo = new CheckoutInformation(page);
        await coinfo.fillForm("ofir", "moyal", "12345");

        const cooview = new CheckoutOverview(page);
        await cooview.clickFinishBtn()
  
        const cocom = new CheckoutComplete(page);
        await cocom.clickbackHomeBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  
      });
  });