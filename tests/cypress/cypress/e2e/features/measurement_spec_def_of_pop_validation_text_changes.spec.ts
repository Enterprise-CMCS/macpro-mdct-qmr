import { testingYear } from "../../../support/constants";

describe("Measurement Specification/Definition of Population/Validation text changes (#85, #87, #93)", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
  });

  it("Ensure that What number of your measure-eligible population are included in the measure? is changed to What is the size of the measure-eligible population?", () => {
    cy.goToMeasure("CBP-AD");
    cy.get("#DidReport-yes").click();
    cy.get("#DataStatus-ReportingProvisionalData").click();
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get(
      '[data-cy="What is the size of the measure-eligible population?"]'
    ).should(
      "have.text",
      "What is the size of the measure-eligible population?"
    );
  });

  it("Ensure Validation text is updated to Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.", () => {
    cy.goToMeasure("HBD-AD");
    cy.get("#DidReport-yes").click();
    cy.get("#DataStatus-ReportingProvisionalData").click();
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.rate"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.0.rate"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.F9V8xD.1.denominator"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
