describe("Data source/ Rate to auto calculate in OPM", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("FUA-AD");
  });

  it("Check Auto Calculation with Administrative Data", () => {
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.attr",
      "readonly"
    );
  });

  it("Check Auto Calculation with Other", () => {
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
  });

  it("Check Auto Calculation with Administrative Data and Other", () => {
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear({ force: true });
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
  });
});
