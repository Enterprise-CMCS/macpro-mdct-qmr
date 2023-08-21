import { testingYear } from "../../../../support/constants";
describe("Measure CCP-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCP-CH");
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
      .should("contain", "HHS Office of Population Affairs (OPA)")
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
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').should(
      "have.value",
      "80.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.rate"]').should(
      "have.value",
      "83.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.denominator"]').type(
      "7"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.rate"]').should(
      "have.value",
      "85.7"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.numerator"]').type(
      "70"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.denominator"]').type(
      "80"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.rate"]').should(
      "have.value",
      "87.5"
    );
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').should(
      "have.value",
      "33.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').should(
      "have.value",
      "66.7"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').type("10.0");
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
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });

  it("displays a warning if the denomiator for NDR sets aren't equal", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "2"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.denominator"]').type(
      "2"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.denominator"]').type(
      "2"
    );

    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.denominator"]').type(
      "2"
    );

    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options2"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.options1"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.041gNX.CeTZzq.0.numerator"]'
    ).type("12");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.041gNX.CeTZzq.0.denominator"]'
    ).type("23");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.r7b2vH.CeTZzq.0.numerator"]'
    ).type("34");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.r7b2vH.CeTZzq.0.denominator"]'
    ).type("45");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.041gNX.XiBACI.0.numerator"]'
    ).type("56");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.041gNX.XiBACI.0.denominator"]'
    ).type("67");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.r7b2vH.XiBACI.0.numerator"]'
    ).type("67");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.r7b2vH.XiBACI.0.denominator"]'
    ).type("78");

    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "contain",
      "Optional Measure Stratification: Race - Black or African American ErrorThe following categories must have the same denominator:Most effective or moderately effective method of contraceptionLong-acting reversible method of contraception (LARC)"
    );
  });

  it("shows a warning if Three Days Postpartum rate is less than Three Days Postpartum (LARC) rate", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "contain",
      "Performance Measure ErrorLong-acting reversible method of contraception (LARC) Rate should not be higher than Most effective or moderately effective method of contraception Rate for Three Days Postpartum Rate Rates"
    );
  });

  it("shows a warning if Ninety Days Postpartum rate is less than Ninety Days Postpartum (LARC) rate", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "contain",
      "Performance Measure ErrorLong-acting reversible method of contraception (LARC) Rate should not be higher than Most effective or moderately effective method of contraception Rate for Ninety Days Postpartum Rate Rates"
    );
  });

  it("shows a warning if Three Days Postpartum rate is greater than Ninety Days Postpartum rate", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "contain",
      "Three Days Postpartum Rate rate must be less than or equal to Ninety Days Postpartum Rate rate within Most effective or moderately effective method of contraception."
    );

    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.041gNX.1.denominator"]').clear();

    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.0.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.r7b2vH.1.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "contain",
      "Three Days Postpartum Rate rate must be less than or equal to Ninety Days Postpartum Rate rate within Long-acting reversible method of contraception (LARC)."
    );
  });
});
