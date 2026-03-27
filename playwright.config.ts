import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const targetEnv = dotenv.config();
dotenvExpand.expand(targetEnv);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Maximum time one test can run for
  timeout: 120 * 1000,

  // Test directory configured for BDD
  testDir: defineBddConfig({
    features: './features/**/*.feature',
    steps: ['./steps/**/*.step.ts', './fixtures.setup.ts'],
  }),

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.RETRIES ? Number(process.env.RETRIES) : process.env.CI ? 0 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : process.env.CI ? 3 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    cucumberReporter('json', {
      outputFile: 'cucumber-report/report.json',
      skipAttachments: true,
    }),
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'], // Console output
  ],

  // Timeout for expect assertions
  expect: {
    timeout: 20 * 1000,
  },

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL || 'https://hipay.com/en/our-solutions/',
    headless: process.env.HEADLESS === 'true',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Default timeout for actions (click, fill, etc.)
    actionTimeout: 20 * 1000,

    // Default navigation timeout
    navigationTimeout: 30 * 1000,

    // Custom test ID attribute (e.g., data-testid, data-e2e)
    testIdAttribute: 'data-testid',

    // Ignore HTTPS errors (useful for dev environments)
    ignoreHTTPSErrors: true,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test against mobile viewports (uncomment if needed)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Run your local dev server before starting the tests (uncomment if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
