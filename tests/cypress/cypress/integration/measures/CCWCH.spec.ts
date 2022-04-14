describe("Measure: CCW-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCW-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it('displays an upload component for the "Other" Measurement Specification section', () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="measurement-specification-options"]')
      .should(
        "contain",
        "If you need additional space to describe your state's methodology, please attach further documentation below"
      )
      .and("contain", "Drag & drop or browse")
      .and("contain", "Maximum file size of 80MB.");
  });

  it("should show correct Measurement Specification options", () => {
    cy.get('[data-cy="measurement-specification-options"]')
      .should("contain", "HHS Office of Population Affairs (OPA)")
      .and("contain", "Other");
  });

  it("should show correct Data Source options", () => {
    cy.get('[data-cy="DataSource0"]').contains("Administrative Data");
    cy.get('[data-cy="DataSource1"]').contains("Other Data Source");
  });

  it("calculates rates correctly", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
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
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.attr",
      "aria-readonly",
      "true"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "50"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "not.have.attr",
      "aria-readonly",
      "true"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
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

  it("displays a warning if the denominators are not the same in both NDR sets", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("23");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("34");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').contains(
      "Performance Measure ErrorThe following categories must have the same denominator:Most effective or moderately effective method of contraceptionLong-acting reversible method of contraception (LARC)"
    );
  });

  it('displays the expected warning if the LARC rate is greater than the "Most effective or moderately effective method of contraception" rate', () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("23");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("34");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate"]'
    ).contains(
      "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate"
    );
  });
});
