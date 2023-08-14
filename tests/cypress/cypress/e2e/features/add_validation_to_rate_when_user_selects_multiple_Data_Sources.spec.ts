import { testingYear } from "../../../support/constants";

describe("Add Validation to Rate when user selects multiple Data Sources.", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("Checks for one sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="Enter a number for the numerator and the denominator"]'
    ).should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will\n          auto-calculate:"
    );
  });
  it("Checks for two sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get(
      '[data-cy="Enter a number for the numerator and the denominator"]'
    ).should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will\n          auto-calculate:"
    );
  });
  it("Checks for race section for two sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"]'
    ).click();
  });
});
