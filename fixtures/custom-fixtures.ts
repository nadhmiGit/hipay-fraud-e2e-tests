import { test as base, Page, APIRequestContext } from '@playwright/test';

/**
 * Custom test fixtures
 *
 * This file defines reusable fixtures for UI and API testing.
 * The current implementation is minimal for the exercise,
 * but the structure is designed to be easily extended.
 */

// ===== TYPES =====

type CustomFixtures = {
  page: Page;
  apiClient: APIClient;
};

/**
 * Generic test user model (example for future use)
 */
export type TestUser = {
  email: string;
  password: string;
  name: string;
  id?: string;
};

/**
 * Generic API client abstraction
 * Can be extended for authentication, headers, etc.
 */
export type APIClient = {
  get: (url: string) => Promise<any>;
  post: (url: string, options?: any) => Promise<any>;
  put: (url: string, options?: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
};

// ===== FIXTURES =====

export const test = base.extend<CustomFixtures>({
  /**
   * API Client fixture
   *
   * ⚠️ Not used in this exercise because the tested feature
   * relies on an external service (HubSpot form).
   *
   *   However, this fixture shows how the framework can support:
   * - API testing
   * - Authenticated requests
   * - Backend validation
   */
  apiClient: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || process.env.BASE_URL || 'https://api.example.com'; // generic placeholder

    const client: APIClient = {
      get: async (url: string) => {
        return request.get(`${baseURL}${url}`);
      },

      post: async (url: string, options?: any) => {
        return request.post(`${baseURL}${url}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });
      },

      put: async (url: string, options?: any) => {
        return request.put(`${baseURL}${url}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });
      },

      delete: async (url: string) => {
        return request.delete(`${baseURL}${url}`);
      },
    };

    await use(client);
  },

  /**
   * Example (commented): authenticated page fixture
   *
   *  Can be enabled in real projects
   *  Demonstrates how login/session handling would be centralized
   */

  /*
  authenticatedPage: async ({ page }, use) => {
    // Example only - not used in this exercise

    // await page.goto('/login');
    // await page.fill('input[name="email"]', process.env.TEST_USERNAME!);
    // await page.fill('input[name="password"]', process.env.TEST_PASSWORD!);
    // await page.click('button[type="submit"]');
    // await page.waitForURL(/dashboard/);

    await use(page);
  },
  */
});

export { expect } from '@playwright/test';
