const exp = require("constants");

const emailForCognito = `//input[@name='email']`;
const passwordForCognito = `//input[@name='password']`;

describe("OY2 16297 Combined rates validation testing", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser2@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get("[data-cy=login-with-cognito-button]").click();

    // Navagate to OUD-AD measure
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=OUD-AD]").should("be.visible").click();

    // Clear potential stale data and re-open measure
    cy.get(`[data-cy="Clear Data"]`).should("be.visible").click();
    cy.get("[data-cy=OUD-AD]").should("be.visible").click();

    // Ensure the form has reloaded
    cy.get(`[data-cy="Validate Measure"]`).should("be.visible");
  });

  it("displays the correct warning if no NDR sets has been entered", () => {
    cy.get(`[data-cy="Validate Measure"]`).should("be.visible").click();
    cy.get(".chakra-alert")
      .should("be.visible", { timeout: 5000 })
      .should("include.text", "Performance Measure Error")
      .should("include.text", "At least one NDR Set must be completed");
  });

  it("displays the correct warning if no combined rate detail option selected", () => {
    enterNDR();
    cy.get("[data-cy=CombinedRates0]").should("be.visible").click();
    cy.get('[data-cy="Validate Measure"]').should("be.visible").click();

    cy.get(".chakra-alert")
      .should("be.visible")
      .should("include.text", "Combined Rate(s) Error")
      .should(
        "include.text",
        "You must select at least one option for Combined Rate(s) Details if Yes is selected."
      );
  });

  it("displays the Validation Error warning modal when there are errors on the measure", () => {
    enterNDR();
    cy.get("[data-cy=CombinedRates0]").click();
    cy.get(`[data-cy="Complete Measure"]`).click();

    cy.get("#yes-no-header")
      .should("be.visible")
      .should("include.text", "Validation Error");

    cy.get("#yes-no-body")
      .should("be.visible")
      .should(
        "include.text",
        "There are still errors on this measure, would you still like to complete?"
      );
  });
});

const enterNDR = () => {
  cy.get("[data-cy=MeasurementSpecification0]").click();
  cy.get(`[data-cy="PerformanceMeasure-Rates.0.numerator"]`).type("1");
  cy.get(`[data-cy="PerformanceMeasure-Rates.0.denominator"]`).type("2");
};
