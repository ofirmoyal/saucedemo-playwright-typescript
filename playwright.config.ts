import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import * as path from "node:path";

// Load .env from the same folder as playwright.config.ts
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "test-results", open: "never" }]],
use: {
  baseURL: process.env.BASE_URL,
  headless: process.env.HEADLESS === "true",
  trace: "on-first-retry",
},

  projects: [
    // Browsers
{
  name: "chromium",
  use: {
    ...devices["Desktop Chrome"],
    launchOptions: {
      slowMo: 1000,
    },
  },
  },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobiles
    {
      name: "iPhone 12",
      use: {
        ...devices["iPhone 12"],
      },
    },
    {
      name: "Pixel 7",
      use: {
        ...devices["Pixel 7"],
      },
    },
  ],
});
