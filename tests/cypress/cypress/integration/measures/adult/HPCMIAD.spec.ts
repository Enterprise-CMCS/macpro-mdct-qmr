describe("Measure: HPCMI-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("HPCMI-AD");
  });

  it("displays the correct sections if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    'displays a warning if "not reporting" selected with no reason provided',
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("displays the correct measurement specification options", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("displays the correct data source options", () => {
    cy.get('[data-cy="DataSource0"]').should(
      "include.text",
      "Administrative Data"
    );
    cy.get('[data-cy="DataSource1"]').should(
      "include.text",
      "Hybrid (Administrative and Medical Records Data)"
    );
    cy.get('[data-cy="DataSource2"]').should(
      "include.text",
      "Other Data Source"
    );
  });

  it("displays performance measures if primary measurement spec is selected", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("6");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
  });

  it("displays other performance measures if other measurement spec is selected", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it('displays no warning when user enters 0 for numerator and rate while "hybrid" is selected', () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "1.0"
    );
    cy.get('[data-cy="Validate Measure"').click();
    cy.get(".chakra-alert").should(
      "not.include.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
    cy.get(".chakra-alert").should(
      "have.text",
      "SuccessThe measure has been validated successfully"
    );
  });

  it("should calculate the rate correctly", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("211");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("9543");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "2.2"
    );

    // Whole numbers should end with .0
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]')
      .clear()
      .type("42");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]')
      .clear()
      .type("100");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "42.0"
    );
  });

  it("displays a warning if a user entered a rate with N = 0, D > 0, and R > 0", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("456");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "10"
    );
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").uncheck();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(".chakra-alert:nth-of-type(2)").should(
      "have.text",
      "Performance Measure/Other Performance Measure ErrorManually entered rate should be 0 if numerator is 0"
    );
  });

  it("displays a warning if a user entered a rate with N > 0, D > 0, and R = 0", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("123");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("456");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0.0"
    );
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").uncheck();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(".chakra-alert:nth-of-type(2)").should(
      "have.text",
      "Performance Measure/Other Performance Measure ErrorRate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });

  it(
    "displays a warning if reporting and measurement spec are selected without an NDR set",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    'displays a warning if "Yes" is chosen for Combined Rates without an additional selection',
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );
});
