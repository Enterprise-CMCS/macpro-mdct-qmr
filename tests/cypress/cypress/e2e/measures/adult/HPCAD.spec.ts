describe("Measure: HPC-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("HPC-AD");
  });

  // if Other measure spec is selected each age range/ custom description for which there are n/d/r
  // values entered in other performance measure are presented in:
  //  - Optional Measure specification
  it("Age ranges are represented in OMS when other measure spec", () => {
    cy.wait(2000);
    // cy.get('[data-cy="DidReport0"]').click({ force: true });
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[id="DataSource0-checkbox"]').check({ force: true });
    cy.get('[id="DataSource1-checkbox"]').uncheck({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "example 1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "5"
    );
    //nothing//
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("10");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "50.0"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "example 1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.example1.OPM.0.numerator"]'
    ).type("3");
  });
});
