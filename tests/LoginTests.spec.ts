import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login validation tests fails", () => {
  test("validation - empty fields", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("", "");
    await lp.clickLogin();
    expect(await lp.getValidationError()).toBe(
      "Epic sadface: Username is required"
    );
  });

  test("validation - missing password", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("#user-name", "");
    expect(await lp.getValidationError()).toBe(
      "Epic sadface: Password is required"
    );
  });

  test("validation - missing user name", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("", "secret_sauce");
    expect(await lp.getValidationError()).toBe(
      "Epic sadface: Username is required"
    );
  });

  test("validation - wrong user name", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("ofirmoyal", "secret_sauce");
    expect(await lp.getValidationError()).toBe(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("validation - wrong password", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("standard_user", "secretsauce");
    expect(await lp.getValidationError()).toBe(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });


});

// SUCCESSFULL LOGIN USING FILL FORM
test.describe("Login validation tests success", () => {
  test("validation - correct credentials DDT test", async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.fillForm("standard_user", "secret_sauce");
    await expect(page.locator(".title")).toHaveText("Products");
  });
});
