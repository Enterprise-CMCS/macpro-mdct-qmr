describe("AdultMeasure Qualifiers", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
  });

  it("Should show adult qualifier options correctly", () => {
    cy.get('[data-cy="core-set-qualifiers-link"]').should(
      "have.text",
      "Adult Core Set Questions"
    );
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get("tr.css-0 > :nth-child(2) > .chakra-text").should(
      "have.text",
      "Ages 21 to 64"
    );
    cy.get("tr.css-0 > :nth-child(3) > .chakra-text").should(
      "have.text",
      "Age 65 and older"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.TwentyOneToSixtyFour"]'
    ).type("6");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFour"]'
    ).type("5");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.TwentyOneToSixtyFour"]'
    ).type("5");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.GreaterThanSixtyFour"]'
    ).type("7");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(":nth-child(2) > .chakra-input__group > .chakra-input").should(
      "have.value",
      "11.0"
    );
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").should(
      "have.value",
      "12.0"
    );
    cy.get('[data-cy="validate-core-set-questions-button"]').click();
    cy.get(
      ':nth-child(2) > div.css-0 > [data-cy="Delivery System Error"]'
    ).should("have.text", "Delivery System Error");
    cy.get(
      ':nth-child(3) > div.css-0 > [data-cy="Delivery System Error"]'
    ).should("have.text", "Delivery System Error");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.TwentyOneToSixtyFour"]'
    ).type("80");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.TwentyOneToSixtyFour"]'
    ).type("9");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.GreaterThanSixtyFour"]'
    ).type("9");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.GreaterThanSixtyFour"]'
    ).type("79");
    cy.get('[data-cy="validate-core-set-questions-button"]').click();
  });
});
