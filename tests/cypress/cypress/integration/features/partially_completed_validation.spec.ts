describe("OY2 16341 NDR set validation updates for all measures ", () => {
  beforeEach(() => {
    cy.login("stateuser2");
  });

  it("should throw validation error for partially completed ndr sets - just qualifiers", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
    cy.get(`[data-cy="MeasurementSpecification0"]`).click();

    // PM
    cy.get(`[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]`)
      .clear()
      .type("7");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(`[data-cy="Performance Measure Error"]`).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets at Ages 21 to 24."]`
    ).should("exist");

    // OMS
    cy.get(`[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]`)
      .clear()
      .type("8");
    cy.get(`[data-cy="OptionalMeasureStratification.options0"]`).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages21to24.singleCategory.0.numerator"]`
    )
      .clear()
      .type("8");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(
      `[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White Error"]`
    ).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets at Ages 21 to 24."]`
    ).should("exist");
  });

  it("should throw validation error for partially completed ndr sets - qualifiers and categories", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
    cy.get(`[data-cy="MeasurementSpecification0"]`).click();

    // PM
    cy.get(
      `[data-cy="PerformanceMeasure.rates.FollowUpwithin30daysafterdischarge.0.numerator"]`
    )
      .clear()
      .type("7");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(`[data-cy="Performance Measure Error"]`).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets at Ages 18 to 64, Follow-Up within 30 days after discharge."]`
    ).should("exist");

    // OMS
    cy.get(
      `[data-cy="PerformanceMeasure.rates.FollowUpwithin30daysafterdischarge.0.denominator"]`
    )
      .clear()
      .type("8");
    cy.get(`[data-cy="OptionalMeasureStratification.options0"]`).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.FollowUpwithin30daysafterdischarge.0.numerator"]`
    )
      .clear()
      .type("8");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(
      `[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White Error"]`
    ).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets at Ages 18 to 64, Follow-Up within 30 days after discharge."]`
    ).should("exist");
  });
});
