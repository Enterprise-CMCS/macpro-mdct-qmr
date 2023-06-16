describe("Confirm Validate Measure Errors", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
  });

  it("Date range - combined rates - one ndr set - errors visible", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Combined Rate(s) Error"]').should(
      "have.text",
      "Combined Rate(s) Error"
    );
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="Date Range Error"]').should(
      "have.text",
      "Date Range Error"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
  });
});
