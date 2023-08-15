describe("Measure: AMR-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
  });

  // it("Ensure correct sections display if user is/not reporting", () => {
  //   cy.displaysSectionsWhenUserNotReporting();
  //   cy.displaysSectionsWhenUserIsReporting();
  // });

  // it(
  //   "If not reporting and not why not -> show error",
  //   cy.showErrorIfNotReportingAndNotWhy
  // );

  // it("should show correct data source options", () => {
  //   cy.get("#MeasurementSpecification-NCQAHEDIS").should(
  //     "have.text",
  //     "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
  //   );
  //   cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  // });

  // it("if primary measurement spec is selected -> show performance measures", () => {
  //   cy.get('[data-cy="DidReport0"]').click();
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get('[data-cy="Performance Measure"]').should("be.visible");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
  //   ).type("6");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
  //   ).type("6");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
  //   ).should("be.visible");
  // });

  // it("if other measurement spec is selected -> show other performance measures", () => {
  //   cy.get('[data-cy="DidReport0"]').click();
  //   cy.get('[data-cy="MeasurementSpecification1"]').click();
  //   cy.get(
  //     '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
  //   ).should("be.visible");
  //   cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  // });

  // it("should show the correct calculated rate amount in total", () => {
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
  //   ).type("5");
  //   cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
  //     "have.attr",
  //     "aria-readonly",
  //     "true"
  //   );
  //   cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
  //   cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
  //     "not.have.attr",
  //     "aria-readonly",
  //     "true"
  //   );
  // });

  // it("if only admin data cannot override, if anything else, rate is editable", () => {
  //   cy.get('[data-cy="DidReport0"]').click();
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.2.numerator"]'
  //   ).should("have.value", "10");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
  //   ).should("have.value", "10");
  //   cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.2.rate"]').should(
  //     "have.value",
  //     "100.0"
  //   );
  // });

  // it(
  //   "at least one dnr set if reporting and measurement spec or error.",
  //   cy.showErrorIfReportingAndNoNdrSet
  // );

  // it(
  //   "if yes for combined rates → and no additional selection → show warning",
  //   cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  // );

  // it("does calculate total rate if any numerator is greater than its denominator", () => {
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
  //   ).type("2");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
  //   ).type("4");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
  //   ).type("5");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
  //   ).type("7");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
  //   ).type("55");
  //   cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.2.rate"]').should(
  //     "have.value",
  //     "50.0"
  //   );
  // });

  // it("should display validation errors when PR (non-OPM) OMS numerator/denominator totals don't match actual sum", () => {
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
  //   ).type("1");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
  //   ).type("2");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
  //   ).type("3");
  //   cy.get(
  //     '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
  //   ).type("4");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options1"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options0"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options1"] > .chakra-checkbox__control'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages19to50.singleCategory.0.numerator"]'
  //   ).type("1");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages19to50.singleCategory.0.denominator"]'
  //   ).type("2");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages51to64.singleCategory.0.numerator"]'
  //   ).type("3");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages51to64.singleCategory.0.denominator"]'
  //   ).type("4");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges19to64.singleCategory.0.denominator"]'
  //   ).type("10");
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges19to64.singleCategory.0.numerator"]'
  //   ).click();
  //   cy.get(
  //     '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges19to64.singleCategory.0.numerator"]'
  //   ).type("8");
  //   cy.get('[data-cy="Validate Measure"]').click();
  //   cy.get(".chakra-alert").should(
  //     "include.text",
  //     "field is not equal to the sum"
  //   );
  // });

  // it("displays validation warnings when a user selects Yes for Deviation and/or Combined Rates without making any sub-selections", () => {
  //   cy.get('[data-cy="MeasurementSpecification0"]').click();
  //   cy.get('[data-cy="DidCalculationsDeviate0"]').click();
  //   cy.get('[data-cy="CombinedRates0"]').click();
  //   cy.get('[data-cy="Validate Measure"]').click();
  //   cy.get('[data-testid="measure-wrapper-form"]').should(
  //     "include.text",
  //     "Combined Rate(s) ErrorYou must select at least one option for Combined Rate(s) Details if Yes is selected."
  //   );
  //   cy.get('[data-testid="measure-wrapper-form"]').should(
  //     "include.text",
  //     "Performance Measure/Other Performance Measure ErrorAt least one Performance Measure Numerator, Denominator, and Rate must be completed"
  //   );
  // });

  it("does not treat the third OMS NDR set as a total set when using OPM", () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click();

    cy.get('[data-cy="DateRange.startDate-month"').type("1");
    cy.get('[data-cy="DateRange.startDate-year"').type("2021");
    cy.get('[data-cy="DateRange.endDate-month"').type("12");
    cy.get('[data-cy="DateRange.endDate-year"').type("2021");

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

    //Checkoff Datasource
    cy.get('[data-cy="DataSource0"]').click();

    // Enter OMS data
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test1.OPM.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test1.OPM.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test2.OPM.0.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test2.OPM.0.denominator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test3.OPM.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.test3.OPM.0.denominator"]'
    ).type("6");
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
