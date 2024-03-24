import { testingYear } from "../../../../support/constants";

describe("Measure: HVL-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("HVL-AD");
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get("#MeasurementSpecification-HRSA").click();
    cy.get('[data-cy="PerformanceMeasure.rates.iAT7Xc.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.iAT7Xc.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="DataSource2"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.iAT7Xc.0.rate"]').should(
      "not.have.attr",
      "aria-readonly"
    );
  });

  it("at least one dnr set if reporting and measurement spec or error.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
  });

  it("if yes for combined rates → and no additional selection → show warning", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."]'
    ).should(
      "have.text",
      "You must select at least one option for Combined Rate(s) Details if Yes is selected."
    );
  });
});
