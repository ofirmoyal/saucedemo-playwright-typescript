import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "./users_DDT";

test.describe("DDT login test", () => {
  for (const user of users) {
    test(`Login test with user: ${user.username || "empty username"} — ${user.valid ? "valid" : "invalid"}`, async ({
      page,
    }) => {
      const lp = new LoginPage(page);
      await lp.goto();
      await lp.fillForm(user.username, user.password);

      if (user.valid) {
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      } else {
        const err = await lp.getValidationError();
        await expect(err).toContain("Epic sadface");
      }
    });
  }
});
