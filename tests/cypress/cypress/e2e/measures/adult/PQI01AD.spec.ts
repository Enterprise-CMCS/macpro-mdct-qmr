import { testingYear } from "../../../../support/constants";

describe("Measure: PQI01-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
  });

  // If AHRQ is selected (measure specification) each age range for which there are n/d/r values entered are represented in:
  // - Optional Measure specification
  it("Age ranges are represented in OMS", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.Gp9GRU.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.Gp9GRU.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.Gp9GRU.1.numerator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.Gp9GRU.1.denominator"]').type(
      "40"
    );

    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.Gp9GRU.8N7tKQ.0.numerator"]'
    ).type("3");
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
      "50000.0"
    );
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "example 1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.OPM.OPM_example1.0.numerator"]'
    ).type("3");
  });
});
