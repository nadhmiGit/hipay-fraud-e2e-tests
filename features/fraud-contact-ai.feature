gherkin
Feature: Fraud Contact Form

  Scenario: Successfully submit fraud contact form with valid data
    Given I am on the Fraud Management contact page
    When I fill in the contact form with valid data
    And I submit the form
    Then the form should be successfully submitted

  Scenario: Submit fraud contact form with invalid email
    Given I am on the Fraud Management contact page
    When I fill in the contact form with valid data
    And I submit the form
    Then error messages should be displayed for required fields

  Scenario: Submit fraud contact form with missing required fields
    Given I am on the Fraud Management contact page
    When I submit the form
    Then error messages should be displayed for required fields