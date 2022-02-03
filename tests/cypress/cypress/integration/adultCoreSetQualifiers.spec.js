const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("Adult Qualifiers", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Adult Core Set Qualifiers", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).type("1");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).type("2");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).type("3");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).type("4");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).type("5");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).type("6");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).type("7");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).type("8");
    cy.get(":nth-child(2) > .chakra-input__group > .chakra-input").should(
      "have.value",
      "16"
    );
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").should(
      "have.value",
      "20"
    );
    cy.get('[data-cy="complete-core-set-questions-button"]').click();
    cy.get('[data-cy="qualifier-status-text"]').should("have.text", "Complete");
    /* ==== End Cypress Studio ==== */
  });
});
