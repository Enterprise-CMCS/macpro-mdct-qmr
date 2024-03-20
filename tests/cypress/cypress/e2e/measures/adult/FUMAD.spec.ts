import { testingYear } from "../../../../support/constants";

describe("Measure: FUM-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUM-AD");
  });

  it("Age ranges are represented in DMS and OMS", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();

    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').type(
      "10"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.1.numerator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.1.denominator"]').type(
      "40"
    );

    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.biXkZF.xO0lQK.0.numerator"]'
    ).should("be.visible");
  });

  // if Other measure spec is selected each age range/ custom description for which there are n/d/r
  // values entered in other performance measure are presented in:
  //  - Optional Measure specification
  it("Age ranges are represented in OMS when other measure spec", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource0"]').click();

    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "example 1"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("10");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "50.0"
    );

    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "example 2"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "10"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("20");

    cy.get('[data-cy="OptionalMeasureStratification.options1"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.elakUl.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.elakUl.selections.51ZZEh.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.elakUl.selections.51ZZEh.rateData.rates.OPM.OPM_example1.0.numerator"]'
    ).should("be.visible");
  });
});
