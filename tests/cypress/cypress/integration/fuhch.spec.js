describe("Measure: FUH-CH", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.deleteChildCoreSets();
    cy.goToChildMeasures();
    cy.goToMeasure("FUH-CH");
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
    cy.get('[data-cy="Ages 6 to 17"]').should("be.visible");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.denominator"]'
    ).type("6");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.ageRangeRates.options0"] > .chakra-checkbox__label > .chakra-text'
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

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.rate"]').should(
      "have.attr",
      "aria-readonly",
      "true"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.rate"]').should(
      "not.have.attr",
      "aria-readonly",
      "true"
    );
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.7DayFollowUp.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="OptionalMeasureStratification.options6"]').should(
      "be.visible"
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
});
