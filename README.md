# SauceDemo Automation — TypeScript & Playwright

A browser automation portfolio project by **Ofir Moyal**, built with TypeScript, Playwright Test, and Page Object Model (POM).

The suite tests [SauceDemo](https://www.saucedemo.com/) through authentication, product browsing, sorting, cart actions, checkout, navigation, and cookie inspection. Supporting documents demonstrate bug reporting and a separate manual QA exercise involving subscription renewal, API scenarios, and SQL.

## Technology and architecture

- **TypeScript** and **Playwright Test** for browser automation.
- **Page Object Model** to centralize selectors and page interactions.
- A shared **BasePage** for clicking, filling, reading text, selecting options, scrolling, and highlighting elements.
- **Data-driven testing** with five login datasets in `tests/users_DDT.ts`.
- **dotenv** for local settings and environment-based login helpers.
- **Playwright HTML reports**, parallel execution, and CI-aware retries.

## Test coverage

| Test file | Focus |
| --- | --- |
| `LoginTests.spec.ts` | Required fields, invalid credentials, successful login |
| `LoginTestsDDT.spec.ts` | Parameterized valid and invalid login scenarios |
| `LoginCookiesTest.spec.ts` | Cookie value, domain, path, expiry, and flags |
| `HomePageProductsTests_Filter_Footer.spec.ts` | Sorting and social-link popups |
| `ProductPageTests.spec.ts` | Product details, cart actions, checkout navigation |
| `CartPage_tests.spec.ts` | Cart product information and checkout entry |
| `CheckoutInformationTests.spec.ts` | Checkout entry, form validation, valid details |
| `CheckoutCompleteTests.spec.ts` | Purchase journey, confirmation, return to inventory |
| `NavigationTests.spec.ts` | Menu visibility, links, logout, reset state, navigation across pages |

## Repository structure

```text
SauceDemoAutomationProject/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── NavigationPage.ts
│   ├── HomePageProducts.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
├── tests/
│   ├── *.spec.ts
│   └── users_DDT.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── docs/
    ├── Bugs & Improvements.docx
    ├── STD.docx
    └── Users_info_and_SQL_Queries.docx
```

`.env` is a local file excluded from Git. Supporting documents reside in `docs/`. Include `.env.example` with sample settings.

## Installation

Use Node.js and npm compatible with the locked dependencies. Run commands from the directory containing `package.json`:

```bash
npm ci
npx playwright install
```

The project is already initialized. Do not run 
pm init playwright@latest` to install this existing suite. `dotenv` is already declared as a dependency.

### Environment settings

Create `.env` in the project root:

```dotenv
BASE_URL=https://www.saucedemo.com/
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
HEADLESS=true
```

These are public SauceDemo demonstration credentials. A committed `.env.example` can contain these sample settings; keep the actual `.env` local. Updated environment-based login helpers read `SAUCE_USERNAME` and `SAUCE_PASSWORD`, avoiding Windows' `USERNAME` variable. Several specs also use explicit public demo credentials.

`HEADLESS=true` runs without visible windows. Other values start headed browsers under the current configuration.

### Loading environment settings

The configuration loads `.env` from the same directory as `playwright.config.ts`, so settings do not depend on the terminal working directory:

```ts
import dotenv from "dotenv";
import * as path from "node:path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});
```

The current configuration does not use `storageState`. **No `auth.json` file is required.** Tests that require authentication perform their own login.

## Running tests

```bash
# Discover tests without running browser actions
npx playwright test --list --project=chromium

# Run Chromium or the complete configured matrix
npx playwright test --project=chromium
npx playwright test

# Run a specific suite
npx playwright test tests/LoginTestsDDT.spec.ts --project=chromium
npx playwright test tests/CheckoutCompleteTests.spec.ts --project=chromium

# Run one named scenario
npx playwright test --project=chromium --grep "verify confirmation title"

# Run mobile browser emulation
npx playwright test --project="iPhone 12"
npx playwright test --project="Pixel 7"

# Interactive UI and debugging
npx playwright test --ui
npx playwright test tests/LoginTestsDDT.spec.ts --project=chromium --debug
```

`package.json` has no npm scripts; use the 
px` commands above.

## Browsers and devices

| Project | Configuration |
| --- | --- |
| `chromium` | Desktop Chrome preset; `slowMo: 1000` for demo pacing |
| `firefox` | Desktop Firefox preset |
| `webkit` | Desktop Safari preset |
| `iPhone 12` | Built-in iPhone 12 browser emulation |
| `Pixel 7` | Built-in Pixel 7 browser emulation |

Mobile projects emulate browsers; they are not runs on physical phones.

## Reports and diagnostics

The configured HTML reporter writes to **`test-results/`**, with automatic opening disabled:

```bash
npx playwright show-report test-results
```

- Tests are configured with `fullyParallel: true`.
- When `CI` is set, retries are **2** and workers are **1**.
- Local retries are **0**.
- Traces use `on-first-retry`, so they normally are not recorded on local runs without retries.

No Allure reporter or CI workflow is included. CI-aware settings do not themselves create a pipeline. Archived reports are not evidence of a new passing run.

## Manual QA findings

[Bugs & Improvements.docx](docs/Bugs%20%26%20Improvements.docx) contains reproduction steps, screenshots, and UX/framework proposals.

| Finding | Recorded observation |
| --- | --- |
| Quantity editing | Quantity is not editable in cart and checkout overview |
| Checkout validation | Only the first missing-field error is displayed |
| Reset App State | Previously selected sorting is retained |

These findings use the author's expected behavior. Confirm requirements and reproduce current behavior before treating each as an accepted defect; some may be enhancement requests. The document also proposes logout confirmation, clearer menu presentation, and accessibility improvements. A dedicated accessibility audit is not implemented.

## Separate subscription-renewal exercise: API and SQL

- [STD.docx](docs/STD.docx): 59 numbered manual scenarios covering annual renewal, dates, payment outcomes, invoices, email, compatibility, and API responses.
- [Users_info_and_SQL_Queries.docx](docs/Users_info_and_SQL_Queries.docx): test-data examples and SQL joins across `USERS`, `PAYMENTS`, and `REGISTRATIONS`, filtering status and expiry dates using `CURRENT_DATE`.

These documents cover a different system from SauceDemo. They demonstrate manual test design and database validation reasoning, not automated SauceDemo API or database tests. No database connection, schema provisioning, or executable API suite is included. No database is needed for the browser suite.

Endpoint names in the STD vary between `/api/renew_subscription` and `/api/renew_subscriptions`; confirm them against an actual API specification. Historical status entries in the STD are not Playwright execution results.

## Publishing

Commit source code, dependency manifests, README, and reviewed QA documents. Include `.env.example` as a setup template.

Exclude dependencies, generated reports, `.env`, `auth.json`, and Office lock files. Review document data before publication and use synthetic personal/payment examples only. `.gitignore` does not remove already tracked files or their earlier Git history.

**Author:** Ofir Moyal — Manual QA & Test Automation


