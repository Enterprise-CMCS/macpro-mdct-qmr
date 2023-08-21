import { testingYear } from "../../../../support/constants";

describe("Measure: FUM-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUM-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("Rate calculation should be correct", () => {
    // select is reporting
    cy.get('[data-cy="DidReport0"]').click();

    // select AHRQ for measurement specification
    cy.get('[data-cy="MeasurementSpecification0"]').click();

    cy.get('[data-cy="DataSource0"]').click();

    // Rate calculation should be = (N/D*100)
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "50.0"
    );

    // Ensure that auto calculate rate displays 1 decimal (even if the value is zero)
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.numerator"]').type("8");
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "80.0"
    );

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (up)
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "88.9"
    );

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (down)
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').type(
      "18"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "44.4"
    );

    // Ensure that user cannot manually enter rates if admin data is selected - (already selected)
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.attr",
      "readonly"
    );
  });

  it("User can manually adjust rate if other data source is selected", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();

    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.denominator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "50.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').type(
      "4869568.1"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.biXkZF.0.rate"]').should(
      "have.value",
      "48.1"
    );
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
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.rates.OPM.example1.0.numerator"]'
    ).should("be.visible");
  });
});
