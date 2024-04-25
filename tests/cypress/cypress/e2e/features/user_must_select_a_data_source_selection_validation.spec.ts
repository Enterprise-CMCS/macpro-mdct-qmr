import { testingYear } from "../../../support/constants";

describe("User must select a data source selection validation", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
  });
  it("verify error message when no data entered and click on validate button", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="AMM-AD"]').click();
    cy.wait(2000);
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Data Source Error"]').should(
      "have.text",
      "Data Source Error"
    );
    cy.get(
      '[data-cy="You must select at least one Data Source option"] > .chakra-text'
    ).should("have.text", "You must select at least one Data Source option");
    cy.get('[data-cy="Date Range Error"]').should(
      "have.text",
      "Date Range Error"
    );
    cy.get(
      '[data-cy="Date Range answer must be selected"] > .chakra-text'
    ).should("have.text", "Date Range answer must be selected");
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
    ).should(
      "have.text",
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });

  it("Verify user can manually change rate in PM and OMS section without click data source option", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2021"
    );
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').click();
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2022");
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator0-checkbox").check();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.rate"]').type("12.3");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').type("8");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').type(
      "50"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.rate"]').type("42.3");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.rate"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.rate"]').type("13.5");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.denominator"]'
    ).type("50");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.rate"]'
    ).type("12.3");
  });

  it("Verify user can manually change rate in OPM section without click data source option", function () {
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
    cy.get('[data-cy="DidReport0"]').click();
    cy.get(
      "#DataStatus_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio"
    ).click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("40");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "12.3"
    );
  });
});
