describe("Measure: SSD-AD", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("SSD-AD");
  });

  it("displays correct sections when user is or is not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "displays error if user is not reporting and provides no reason why",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("displays the expected Data Source options", () => {
    cy.get('[data-cy="data-source-options"]').contains("Administrative Data");
    cy.get('[data-cy="data-source-options"]').contains("Other Data Source");
  });

  it("displays the correct calculated rate amount in total", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("123");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("456");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "27.0"
    );
  });

  it("rounds auto-calculated rate to one decimal", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("25");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("100");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "25.0"
    );
  });

  it("rounds auto-calculated rate up or down as expected", () => {
    // 3/9*100 = 3.333... -> 33.3
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("9");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "33.3"
    );

    // 6/9*100 = 66.666... -> 66.7
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("9");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "66.7"
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
    cy.get(".chakra-alert").should(
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
    cy.get(".chakra-alert").should(
      "have.text",
      "Performance Measure/Other Performance Measure ErrorManually entered rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
