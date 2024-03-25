describe("Measure: PC01-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("PC01-AD");
  });

  it("should have adult eligibility group in OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("3");
    cy.get(
      '[data-cy="Numerator: 4 cannot be greater than Denominator: 3"] > .chakra-text'
    ).should("have.text", "Numerator: 4 cannot be greater than Denominator: 3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Adult Eligibility Group (ACA Expansion Group)");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Numerators must be less than Denominators for all applicable performance measures"] > .chakra-text'
    ).should(
      "have.text",
      "Numerators must be less than Denominators for all applicable performance measures"
    );
  });
});
