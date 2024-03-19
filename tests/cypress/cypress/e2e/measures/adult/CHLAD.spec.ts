import { testingYear } from "../../../../support/constants";

describe("Measure: CHL-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
  });

  it("If rate is zero -> show warning", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.cvc5jQ.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.cvc5jQ.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.cvc5jQ.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.cvc5jQ.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
