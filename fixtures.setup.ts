import { Page } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';

/**
 * Main Fixtures Setup for playwright-bdd
 * 
 * This file defines the custom fixtures and world that can be used
 * across all step definitions
 */

// Define custom world interface
export interface World {
  page: Page;
  // Add any additional properties you need
}

// Extend base test with custom fixtures (if needed)
export const test = base.extend<{
  // Add custom fixtures here
  // Example: authenticatedPage, apiClient, etc.
}>({
  // Define your fixtures here
  // Example:
  // authenticatedPage: async ({ page }, use) => {
  //   // Login logic
  //   await use(page);
  // },
});

// Create BDD test structure
export const { Given, When, Then, Before, After, BeforeAll, AfterAll } = createBdd(test);
