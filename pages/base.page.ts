import { Locator, Page } from '@playwright/test';

/**
 * Base Page Object class
 * 
 * All page objects should extend this class to inherit common functionality
 * This provides a foundation for consistent page object implementation
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Wait for page to be loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for a specific element
   */
  async waitForElement(locator: Locator, options?: { timeout?: number }): Promise<void> {
    await locator.waitFor({ state: 'visible', ...options });
  }

  /**
   * Scroll to an element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Check if element exists
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}
