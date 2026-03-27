import { Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

/**
 * BDD Fixtures Setup
 * 
 * This file sets up fixtures that can be used in step definitions
 * Similar to custom fixtures but configured for playwright-bdd
 */

// Define custom world/context interface
interface CustomWorld {
  page: Page;
  testUser: TestUser;
  // Add any custom properties you need across steps
}

// Test user type
export type TestUser = {
  email: string;
  password: string;
  name: string;
  role?: string;
};

// Create BDD test with custom fixtures
export const { Given, When, Then, Before, After } = createBdd<CustomWorld>();

/**
 * Before hook - runs before each scenario
 */
Before(async function ({ page }) {
  // Optional: Add any setup needed before each scenario
  // For example: clear cookies, set viewport, etc.
  // await page.context().clearCookies();
});

/**
 * After hook - runs after each scenario
 */
After(async function ({ page }) {
  // Optional: Add any cleanup needed after each scenario
  // For example: take screenshot on failure
  // const scenario = this; // Access scenario info if needed
});

/**
 * Helper function to get test user data
 */
export function getTestUser(email?: string): TestUser {
  return {
    email: email || process.env.TEST_USERNAME || 'test.user@example.com',
    password: process.env.TEST_PASSWORD || 'SecurePassword123',
    name: 'Test User',
    role: 'user',
  };
}
