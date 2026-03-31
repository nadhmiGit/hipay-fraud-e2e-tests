Feature: Contact form - Fraud Management
  As a potential client
  I want to submit the contact form
  So that I can get information about HiPay anti-fraud solution

  @smoke
  @regression
  Scenario: Successfully submit the contact form with valid data
    Given I am on the Fraud Management contact page
    When I fill in the contact form with valid data
      | lastName | firstName | email                 | phone      | website          | revenue             | business            | message                     |
      | Doe      | John      | john.doe123@gmail.com | 0612345678 | https://test.com | Less than 500 0000€ | Online and in store | Interested in your solution |
    And I submit the form
    Then the form should be successfully submitted

  @regression
  Scenario: Display error when required fields are missing
    Given I am on the Fraud Management contact page
    When I submit the form without filling required fields
    Then error messages should be displayed for required fields
