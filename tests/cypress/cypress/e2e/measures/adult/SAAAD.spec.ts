import { testingYear } from "../../../../support/constants";

describe("Measure: SAA-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("SAA-AD");
  });

  it("displays the correct calculated rate amount in total", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type(
      "123"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "456"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').should(
      "have.value",
      "27.0"
    );
  });

  it("rounds auto-calculated rate to one decimal", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type(
      "25"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "100"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').should(
      "have.value",
      "25.0"
    );
  });

  it("rounds auto-calculated rate up or down as expected", () => {
    // 3/9*100 = 3.333... -> 33.3
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').should(
      "have.value",
      "33.3"
    );

    // 6/9*100 = 66.666... -> 66.7
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').should(
      "have.value",
      "66.7"
    );
  });

  it("displays a warning if a user entered a rate with N = 0, D > 0, and R > 0", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "456"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').type("10");
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").uncheck();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Manually entered rate should be 0 if numerator is 0"]'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
  });

  it("displays a warning if a user entered a rate with N > 0, D > 0, and R = 0", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.numerator"]').type(
      "123"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.denominator"]').type(
      "456"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.bdI1f1.0.rate"]').type("0.0");
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").uncheck();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
