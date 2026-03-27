# BDD Quick Reference

## 🥒 Gherkin Syntax

### Feature File Structure
```gherkin
Feature: Feature name
  Feature description (optional)

  Background:
    Given common setup step

  @tag1 @tag2
  Scenario: Scenario name
    Given precondition
    When action
    Then expected result
    And additional assertion

  Scenario Outline: Parameterized scenario
    When I do "<action>"
    Then I see "<result>"

    Examples:
      | action | result |
      | click  | page   |
      | hover  | tooltip|
```

### Keywords
- **Feature**: Describes the feature being tested
- **Background**: Common steps for all scenarios
- **Scenario**: Single test case
- **Scenario Outline**: Data-driven test
- **Given**: Preconditions/setup
- **When**: Actions
- **Then**: Assertions
- **And/But**: Additional steps

## 📝 Step Definition Patterns

### Import BDD functions
```typescript
import { Given, When, Then } from './fixtures';
import { expect } from '@playwright/test';
```

### String parameter
```gherkin
When I enter email "test@example.com"
```
```typescript
When('I enter email {string}', async ({ page }, email: string) => {
  await page.getByLabel('Email').fill(email);
});
```

### Number parameter
```gherkin
Then I should see 5 results
```
```typescript
Then('I should see {int} results', async ({ page }, count: number) => {
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(count);
});
```

### Multiple parameters
```gherkin
When I login as "user@test.com" with password "pass123"
```
```typescript
When('I login as {string} with password {string}', 
  async ({ page }, email: string, password: string) => {
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: /login/i }).click();
});
```

### Optional text
```gherkin
Then I should see an? error message
```
```typescript
Then('I should see an? error message', async ({ page }) => {
  await expect(page.getByRole('alert')).toBeVisible();
});
```

## 🏷️ Tags

```gherkin
@smoke              # Critical tests
@regression         # Full regression suite
@wip                # Work in progress
@authentication     # Feature-specific
@slow               # Long-running tests
```

### Run by tags
```bash
npx playwright test --grep @smoke
npx playwright test --grep "@smoke|@regression"
npx playwright test --grep-invert @wip
```

## 📊 Scenario Outline

```gherkin
Scenario Outline: Login with different users
  When I login as "<username>"
  Then I should see "<message>"

  Examples:
    | username       | message        |
    | admin@test.com | Admin Dashboard|
    | user@test.com  | User Dashboard |
```

## 🎭 Hooks

```typescript
import { Before, After, BeforeAll, AfterAll } from 'playwright-bdd';

Before(async ({ page }) => {
  // Runs before each scenario
  await page.goto('/');
});

After(async ({ page }) => {
  // Runs after each scenario
  await page.screenshot({ path: 'screenshot.png' });
});

BeforeAll(async () => {
  // Runs once before all scenarios
});

AfterAll(async () => {
  // Runs once after all scenarios
});
```

## 💾 Data Tables

```gherkin
When I create a user with:
  | Field    | Value              |
  | Name     | John Doe           |
  | Email    | john@example.com   |
  | Role     | Admin              |
```

```typescript
When('I create a user with:', async ({ page }, dataTable) => {
  const data = dataTable.rowsHash();
  await page.getByLabel('Name').fill(data.Name);
  await page.getByLabel('Email').fill(data.Email);
  await page.getByLabel('Role').selectOption(data.Role);
});
```

## 🚀 NPM Scripts

```bash
npm run gen:tests          # Generate tests from .feature files
npm test                   # Run all tests (headless)
npm run test:headed        # Run with browser visible
npm run test:ui            # Interactive UI + watch mode
npm run test:debug         # Debug mode
npm run test:smoke         # Run @smoke tests
npm run test:chromium      # Run on Chromium only
npm run report             # View HTML report
npm run report:cucumber    # Generate Allure report
```

## 🔧 Configuration

### playwright.config.ts
```typescript
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

export default defineConfig({
  testDir: defineBddConfig({
    features: './features/**/*.feature',
    steps: ['./steps/**/*.step.ts', './fixtures.setup.ts'],
  }),
  reporter: [
    ['html'],
    cucumberReporter('json', {
      outputFile: 'cucumber-report/report.json',
    }),
  ],
});
```

## 📦 Page Objects

```typescript
// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  
  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = page.getByLabel('Email');
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    // ...
  }
}

// In step definition:
import { LoginPage } from '../../pages/login.page';

When('I login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@test.com', 'pass');
});
```

## ✅ Common Assertions

```typescript
// Visibility
await expect(element).toBeVisible()
await expect(element).toBeHidden()

// Text
await expect(element).toHaveText('text')
await expect(element).toContainText('partial')

// Count
await expect(elements).toHaveCount(5)

// URL
await expect(page).toHaveURL(/dashboard/)

// Attribute
await expect(element).toHaveAttribute('href', '/link')
```

## 🎯 Best Practices

### Feature Files
✅ User-focused language
✅ One behavior per scenario
✅ Descriptive scenario names
✅ Use Background for common setup
✅ Tag appropriately

❌ Technical implementation details
❌ UI-specific steps
❌ Multiple assertions in one step

### Step Definitions
✅ Reusable across scenarios
✅ Use Page Objects
✅ Declarative style
✅ Clear parameter types

❌ Business logic in steps
❌ Too specific/rigid steps
❌ Direct locator manipulation

## 🐛 Debugging

```bash
# Debug specific scenario
npx playwright test --grep "Scenario name" --debug

# Headed mode
npm run test:headed

# UI mode (best for debugging)
npm run test:ui

# Playwright Inspector
npx playwright test --debug
```

## 📁 Project Structure

```
features/          # .feature files
steps/             # .step.ts files
pages/             # Page Objects
utils/             # Helpers
test-data/         # Test data
fixtures.setup.ts  # BDD fixtures
.features-gen/     # Generated (don't edit!)
```

## 💡 Tips

- Run `npm run gen:tests` after editing .feature files
- Use `npm run test:ui` for development (auto-reload!)
- Tag WIP scenarios with `@wip`
- Keep steps simple and reusable
- Combine BDD with Page Objects
- Use Scenario Outline for data-driven tests

---

**Need more? Check [README.md](README.md)**
