describe("Measure: FUA-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("FUA-AD");
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
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it("should show the correct calculated rate amount in total", () => {});

  it("if only admin data cannot override, if anything else, rate is editable", () => {});

  it(
    "at least one ndr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("does not calculate total rate if any numerator is greater than its denominator", () => {});

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
});
