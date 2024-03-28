import { testingYear } from "../../../../support/constants";

describe("Measure: PQI92-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("PQI92-HH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("should show correct data source options", () => {
    cy.get("#MeasurementSpecification-AHRQ").should(
      "have.text",
      "Agency for Healthcare Research and Quality (AHRQ)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("should include correct Definition of Population options", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("be.visible");
    cy.get('[data-cy="DefinitionOfDenominator0"]').should(
      "include.text",
      "Denominator includes Medicaid population"
    );
    cy.get('[data-cy="DefinitionOfDenominator1"]').should(
      "include.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get('[data-cy="DefinitionOfDenominator2"]').should(
      "include.text",
      "Other"
    );
  });

  it("should include 'Are all Health Home Providers represented in the denominator?' question", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get(
      '[data-cy="Are all Health Home Providers represented in the denominator?"]'
    ).should("be.visible");
    cy.get("#DenominatorDefineHealthHome-yes").should("be.visible");
    cy.get("#DenominatorDefineHealthHome-no").should("be.visible");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it(
    "at least one ndr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("displays validation warnings when a user selects Yes for Deviation and/or Combined Rates without making any sub-selections", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Combined Rate(s) ErrorYou must select at least one option for Combined Rate(s) Details if Yes is selected."
    );
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Performance Measure/Other Performance Measure ErrorAt least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });

  it("calculates correct rate Total for both PM and OMS", () => {
    cy.get("#MeasurementSpecification-AHRQ").click();

    // PM
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.1.denominator"]').type(
      "1"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.0.rate"]').should(
      "have.value",
      "133333.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.1.rate"]').should(
      "have.value",
      "100000.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.2.numerator"]').should(
      "have.value",
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.2.denominator"]').should(
      "have.value",
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.mIBZOk.2.rate"]').should(
      "have.value",
      "125000.0"
    );

    // OMS
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.denominator"]'
    ).type("3");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.rate"]'
    ).should("have.value", "133333.3");

    // validation errors
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Numerators must be less than Denominators for all applicable performance measures"]'
    ).should("not.exist");
    cy.get(
      '[data-cy="Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing"]'
    ).should("exist");
  });
});
