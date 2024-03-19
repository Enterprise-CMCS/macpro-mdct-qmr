import { testingYear } from "../../../../support/constants";

describe("Measure: CCP-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.rate"]').should(
      "have.attr",
      "readonly"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.JmD71i.0.rate"]').should(
      "have.value",
      "100.0"
    );
  });
});
