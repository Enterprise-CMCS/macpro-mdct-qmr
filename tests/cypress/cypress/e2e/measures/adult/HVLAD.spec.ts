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
});
