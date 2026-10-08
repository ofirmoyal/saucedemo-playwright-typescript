import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("login test cookies", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginSuccessStandardUser();
  });

  test("cookies after login", async ({ page, context }) => {
    const cookies = await context.cookies();
    console.log(cookies); // print cookies

    const cookie = cookies.find((c) => c.name === "session-username");
    // check: cookie found,veriy username,verify expiration, is https?, is unreadable for js (protect from cookie theft)
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe("standard_user");
    expect(cookie?.domain).toBe("www.saucedemo.com");
    expect(cookie?.path).toBe("/");
    expect(cookie?.expires).toBeGreaterThan(Date.now() / 1000);
    expect(cookie?.httpOnly).toBe(false);
    expect(cookie?.secure).toBe(false);
    expect(cookie?.sameSite).toBe("Lax");
  });
});
