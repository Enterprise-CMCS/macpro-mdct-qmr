import { testingYear } from "../../../../support/constants";

describe("Measure 10: FUH-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
  });

  it("Ensure that warning appears if N=0, D>0, then R should be = 0 for user entered rates.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').type("5");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
  });

  it("Ensure that warning appears if N>0, D>0, then R should be >0 for user entered rates.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').should(
      "have.value",
      "100.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
  });

  //   If AHRQ is selected (measure specification) each age range for which there are n/d/r values entered are represented in:
  //   - Deviations for measure specifications
  //   - Optional Measure specification
  it("Age ranges are represented in DMS and OMS", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.1.numerator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.8w4t99.1.denominator"]').type(
      "40"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();

    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.8w4t99.FbBLHo.0.numerator"]'
    ).should("be.visible");
  });

  // if Other measure spec is selected each age range/ custom description for which there are n/d/r
  // values entered in other performance measure are presented in:
  //  - Optional Measure specification
  it("Age ranges are represented in OMS when other measure spec", () => {
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
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.OPM.OPM_example1.0.numerator"]'
    ).should("be.visible");
  });
});
