import { testingYear } from "../../../support/constants";

describe("Data source/ Rate to auto calculate in OPM", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUA-AD");
  });

  it("Check Auto Calculation with Administrative Data", () => {
    cy.get('[data-cy="DataSource0"]').click();
    cy.get("#MeasurementSpecification-Other").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.attr",
      "readonly"
    );
  });

  it("Check Auto Calculation with Other", () => {
    cy.get("#MeasurementSpecification-Other").click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
  });

  it("Check Auto Calculation with Administrative Data and Other", () => {
    cy.get("#MeasurementSpecification-Other").click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
  });
});
