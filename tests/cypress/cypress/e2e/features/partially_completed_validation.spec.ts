import { testingYear } from "../../../support/constants";

describe("OY2 16341 NDR set validation updates for all measures ", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
  });

  it("should throw validation error for partially completed ndr sets - just qualifiers", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
    cy.get(`[data-cy="MeasurementSpecification0"]`).click();

    // PM
    cy.get(`[data-cy="PerformanceMeasure.rates.cvc5jQ.0.numerator"]`)
      .clear()
      .type("7");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(`[data-cy="Performance Measure Error"]`).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets for Ages 21 to 24."]`
    ).should("exist");

    // OMS
    cy.get(`[data-cy="PerformanceMeasure.rates.cvc5jQ.0.denominator"]`)
      .clear()
      .type("8");
    cy.wait(500);
    cy.get(`[data-cy="OptionalMeasureStratification.options0"]`).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.cvc5jQ.eV26mN.0.numerator"]`
    )
      .clear()
      .type("8");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(
      `[data-cy="Optional Measure Stratification: Race - American Indian or Alaska Native Error"]`
    ).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets for Ages 21 to 24."]`
    ).should("exist");
  });

  it("should throw validation error for partially completed ndr sets - qualifiers and categories", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
    cy.get(`[data-cy="MeasurementSpecification0"]`).click();

    // PM
    cy.get(`[data-cy="PerformanceMeasure.rates.8w4t99.0.numerator"]`)
      .clear()
      .type("7");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(`[data-cy="Performance Measure Error"]`).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets for Ages 18 to 64, Follow-Up within 30 days after discharge."]`
    ).should("exist");

    // OMS
    cy.get(`[data-cy="PerformanceMeasure.rates.8w4t99.0.denominator"]`)
      .clear()
      .type("8");
    cy.wait(500);
    cy.get(`[data-cy="OptionalMeasureStratification.options0"]`).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.options0"]`
    ).click();
    cy.get(
      `[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.8w4t99.FbBLHo.0.numerator"]`
    )
      .clear()
      .type("8");
    cy.get(`[data-cy="Validate Measure"]`).click();
    cy.get(
      `[data-cy="Optional Measure Stratification: Race - American Indian or Alaska Native Error"]`
    ).should("exist");
    cy.get(
      `[data-cy="Should not have partially filled NDR sets for Ages 18 to 64, Follow-Up within 30 days after discharge."]`
    ).should("exist");
  });
});
