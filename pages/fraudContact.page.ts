import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Fraud Contact Page Object
 *
 * Represents the Fraud Management contact page and encapsulates
 * all interactions with the contact form
 */
export class FraudContactPage extends BasePage {
  // Locators
  readonly lastName: Locator;
  readonly firstName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly website: Locator;
  readonly revenue: Locator;
  readonly businessModel: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;
  readonly globalErrorMessage: Locator;
  readonly fieldErrors: Locator;

  constructor(page: Page) {
    super(page, 'fraud-management/#contact');

    const form = page.locator('[data-test-id*="form-step-second"]');

    this.lastName = form.getByRole('textbox', { name: 'Last name*' });
    this.firstName = form.getByRole('textbox', { name: 'First name*' });
    this.email = form.getByRole('textbox', { name: 'Email*' });
    this.phone = form.getByRole('textbox', { name: 'Phone number*' });
    this.website = form.getByRole('textbox', { name: 'Website URL*' });
    this.revenue = form.getByLabel('Annual Revenue');
    this.businessModel = form.getByLabel('Business model');
    this.message = form.getByLabel('Message');
    this.submitButton = form.getByRole('button', { name: 'Submit' });
    this.globalErrorMessage = page.getByText('Sorry, there must have been an error.');
    this.fieldErrors = page.locator('text=Please complete this required field');
  }
}
