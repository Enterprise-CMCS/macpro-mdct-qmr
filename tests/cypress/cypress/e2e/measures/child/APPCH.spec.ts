describe("Measure: APP-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("APP-CH");
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
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "80.0"
    );

    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "83.3"
    );
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "33.3"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "66.7"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("12");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "10.0"
    );
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
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("12");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });

  describe("NDR sets", () => {
    beforeEach(() => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.enterValidDateRange();

      // Enter Performance Measures
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("2");

      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("2");

      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("2");

      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("2");

      // Make OMS selection
      cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options1"]'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options0"]'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.options1"]'
      ).click();

      // Enter data into first NDR set
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages1to11.singleCategory.0.numerator"]'
      ).type("12");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages1to11.singleCategory.0.denominator"]'
      ).type("23");
    });

    it("calculates totals if user only enters values of one NDR set", () => {
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.numerator"]'
      ).should("have.value", "12");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.denominator"]'
      ).should("have.value", "23");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.rate"]'
      ).should("have.value", "52.2");
    });

    it("calculates totals if user enters values into both NDR set", () => {
      // Enter data into second NDR set
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages12to17.singleCategory.0.numerator"]'
      ).type("34");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages12to17.singleCategory.0.denominator"]'
      ).type("45");

      // Check for expected updated totals
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.numerator"]'
      ).should("have.value", "46");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.denominator"]'
      ).should("have.value", "68");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.rate"]'
      ).should("have.value", "67.6");
    });

    it("allows user to manually override the Total NDR set", () => {
      // Enter data into second NDR set
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages12to17.singleCategory.0.numerator"]'
      ).type("34");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.Ages12to17.singleCategory.0.denominator"]'
      ).type("45");

      // Edit total numerator and denominator
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.numerator"]'
      ).type("7");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.denominator"]'
      ).type("8");

      // Check for new expected rate
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.BlackorAfricanAmerican.rateData.rates.TotalAges1to17.singleCategory.0.rate"]'
      ).should("have.value", "87.5");
    });
  });
});
