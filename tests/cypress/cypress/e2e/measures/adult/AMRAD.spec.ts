import { testingYear } from "../../../../support/constants";

describe("Measure: AMR-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
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
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').type(
      "6"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.HRsQ7F.Total.0.numerator"]'
    ).should("be.visible");
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it("should show the correct calculated rate amount in total", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.rate"]').should(
      "have.attr",
      "aria-readonly",
      "true"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.rate"]').should(
      "not.have.attr",
      "aria-readonly",
      "true"
    );
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.numerator"]').should(
      "have.value",
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.denominator"]').should(
      "have.value",
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.rate"]').should(
      "have.value",
      "100.0"
    );
  });

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("does calculate total rate if any numerator is greater than its denominator", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').type(
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.denominator"]').type(
      "7"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.1.numerator"]').type(
      "55"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.2.rate"]').should(
      "have.value",
      "50.0"
    );
  });

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

  it("does not treat the third OMS NDR set as a total set when using OPM", () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();

    cy.get('[data-cy="DateRange.startDate-month"').type("1");
    cy.get('[data-cy="DateRange.startDate-year"').type("2022");
    cy.get('[data-cy="DateRange.endDate-month"').type("12");
    cy.get('[data-cy="DateRange.endDate-year"').type("2022");

    // Enter OPM data
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "test 1"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "2"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "test 2"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "3"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("9");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.description"]').type(
      "test 3"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.numerator"]').type(
      "2"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.denominator"]'
    ).type("5");

    // Checkoff Datasource
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"]'
    ).click();

    // Checkoff Definition of Population
    cy.get('[data-cy="DefinitionOfDenominator0"]').click();

    // Checkoff Delivery Systems
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService0"]').click();

    // Enter OMS data
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.OPM.OPM_test1.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.6NrBa5.rateData.rates.OPM.OPM_test1.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="The measure has been validated successfully"] > .chakra-text'
    ).should("have.text", "The measure has been validated successfully");
    cy.get(".chakra-alert").should(
      "have.text",
      "SuccessThe measure has been validated successfully"
    );
  });
});
