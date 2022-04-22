describe("Measure: CHL-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
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
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Ages 21 to 24"]').should("be.visible");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "100.0"
    );
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.attr",
      "readonly"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="OptionalMeasureStratification.options5"]').should(
      "have.text",
      "Adult Eligibility Group (ACA Expansion Group)"
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

  it("Rates calculate correctly", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "100.0"
    );
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "50"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
  });

  it("If rate is zero -> show warning", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
