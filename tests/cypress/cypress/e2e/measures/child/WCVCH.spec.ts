import { testingYear } from "../../../../support/constants";

describe("Measure: oy2-9916 WCV-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("WCV-CH");
  });

  it("Ensure error message when not enter any data in the form and verify Data Source", () => {
    cy.get('[data-cy="Validate Measure"]').click();
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

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "shows an error if user not reporting and doesn't specify why not",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("displays the correct Measurement Specification options", () => {
    cy.get('[data-cy="measurement-specification-options"]')
      .should(
        "contain",
        "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
      )
      .and("contain", "Other");
  });

  it("displays the correct Data Source options", () => {
    cy.get('[data-cy="data-source-options"]')
      .should("contain", "Administrative Data")
      .and("contain", "Other Data Source");
  });

  it("calculates rates correctly", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').should(
      "have.value",
      "80.0"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.1.rate"]').should(
      "have.value",
      "83.3"
    );
  });

  it("calculates rates correctly - OPM", () => {
    cy.get('[data-cy="MeasurementSpecification1"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "80.0"
    );
    cy.get('[data-cy="+ Add Another"]').click();

    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "83.3"
    );

    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]')
      .clear()
      .type("17.4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "17.4"
    );
  });

  it("calculates rates correctly - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    // PM prep
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "5"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.1.denominator"]').type(
      "6"
    );

    // OMS prep
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();

    // OMS validation
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.YOFx9h.Total.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.YOFx9h.Total.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.YOFx9h.Total.0.rate"]'
    ).should("have.value", "80.0");
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.numerator"]').should(
      "have.value",
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.denominator"]').should(
      "have.value",
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.rate"]').should(
      "have.value",
      "80.0"
    );
  });

  it("checks that Total NDR should have a value if other NDRs have been filled", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.denominator"]').clear();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total (Ages 3 to 21) must contain values if other fields are filled."]'
    ).should("be.visible");
  });

  it("checks that Total NDR should have calculated numerator/denominator", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.3.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total (Ages 3 to 21) numerator field is not equal to the sum of other numerators."]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Total (Ages 3 to 21) denominator field is not equal to the sum of other denominators."]'
    ).should("be.visible");
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').should(
      "have.value",
      "33.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').should(
      "have.value",
      "66.7"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').type("10.0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Performance Measure/Other Performance Measure ErrorManually entered rate should be 0 if numerator is 0"
    );
  });

  it("displays a warning when N>0, D>0, and user enters a rate of 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YOFx9h.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
