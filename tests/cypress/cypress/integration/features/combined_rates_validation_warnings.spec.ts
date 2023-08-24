import { testingYear } from "../../../support/constants";

describe("Combined rates validation testing", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("OUD-AD");
  });

  it("displays the correct warning if no NDR sets has been entered", () => {
    cy.get(`[data-cy="Validate Measure"]`).should("be.visible").click();
    cy.get(".chakra-alert")
      .should("be.visible")
      .should(
        "include.text",
        "Performance Measure/Other Performance Measure Error"
      )
      .should(
        "include.text",
        "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
      );
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
  cy.get('[data-cy="MeasurementSpecification0"]').click();
  cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.numerator"]').type("1");
  cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.denominator"]').type("2");
};
