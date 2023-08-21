import { testingYear } from "../../../../support/constants";

describe("Measure 19: AMB-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("AMB-HH");
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
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').should(
      "have.value",
      "800.0"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.rate"]').should(
      "have.value",
      "833.3"
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
      "800.0"
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
      "833.3"
    );

    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]')
      .clear()
      .type("177.4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "177.4"
    );
  });

  it("calculates rates correctly - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="Performance Measure"]').click();
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').should(
      "have.value",
      "500.0"
    );
    cy.get(".css-0 > :nth-child(2) > .chakra-stack").click();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').type(
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.rate"]').should(
      "have.value",
      "500.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.2.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.2.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.2.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.2.denominator"]').type(
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.2.rate"]').should(
      "have.value",
      "750.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.denominator"]').type(
      "7"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.numerator"]').type(
      "55"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.3.rate"]').should(
      "have.value",
      "7857.1"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.Race\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.rate"]'
    ).should("have.value", "500.0");
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.numerator"]').should(
      "have.value",
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.denominator"]').should(
      "have.value",
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.rate"]').should(
      "have.value",
      "800.0"
    );
  });

  it("checks that Total NDR should have a value if other NDRs have been filled", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.denominator"]').clear();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total (All Ages) must contain values if other fields are filled."]'
    ).should("be.visible");
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.Race\\.options0-checkbox"
    ).check();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).type("6");
    //cy.get(":nth-child(2) > .css-0 > .css-1wlqfwj > .chakra-stack").click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).type("8");
    cy.get('[data-cy="Validate Measure"]').click();
  });

  it("checks that Total NDR should have calculated numerator/denominator", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Total (All Ages) numerator field is not equal to the sum of other numerators."]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Total (All Ages) denominator field is not equal to the sum of other denominators."]'
    ).should("be.visible");
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').should(
      "have.value",
      "333.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').should(
      "have.value",
      "666.7"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').type("10.0");
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
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
