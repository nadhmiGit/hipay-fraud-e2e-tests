import { expect } from '@playwright/test';
import { FraudContactPage } from '../pages/fraudContact.page';
import { Given, When, Then } from './authentication/fixtures';
import { generateRandomUser } from '../test-data/test-data';

let fraudContactPage: FraudContactPage;

Given('I am on the Fraud Management contact page', async ({ page }) => {
  fraudContactPage = new FraudContactPage(page);
  await fraudContactPage.goto();
});

// When('I fill in the contact form with valid data', async ({}, dataTable) => {
//   const [data] = dataTable.hashes();

//   await fraudContactPage.lastName.fill(data.lastName);
//   await fraudContactPage.firstName.fill(data.firstName);
//   await fraudContactPage.email.fill(data.email);
//   await fraudContactPage.phone.fill(data.phone);
//   await fraudContactPage.website.fill(data.website);
//   await fraudContactPage.revenue.selectOption({ label: data.revenue });
//   await fraudContactPage.businessModel.selectOption({ label: data.business });
//   await fraudContactPage.message.fill(data.message);
// });

When('I fill in the contact form with valid data', async ({}, dataTable) => {
  const [data] = dataTable.hashes();

  const randomUser = generateRandomUser();

  await fraudContactPage.lastName.fill(data.lastName);
  await fraudContactPage.firstName.fill(data.firstName);

  // email dynamique pour éviter les conflits de données lors de tests répétés
  await fraudContactPage.email.fill(randomUser.email);

  await fraudContactPage.phone.fill(data.phone);
  await fraudContactPage.website.fill(data.website);
  await fraudContactPage.revenue.selectOption({ label: data.revenue });
  await fraudContactPage.businessModel.selectOption({ label: data.business });
  await fraudContactPage.message.fill(data.message);
});

When('I submit the form', async () => {
  await fraudContactPage.submitButton.click();
});

Then('the form should be successfully submitted', async ({ page }) => {
  await expect(page.getByText('Thank you for your request.')).toBeVisible();
});

When('I submit the form without filling required fields', async () => {
  await fraudContactPage.submitButton.click();
});

Then('error messages should be displayed for required fields', async () => {
  await expect(fraudContactPage.globalErrorMessage).toBeVisible();
});
