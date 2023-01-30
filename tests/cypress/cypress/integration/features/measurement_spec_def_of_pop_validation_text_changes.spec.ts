describe("Measurement Specification/Definition of Population/Validation text changes (#85, #87, #93)", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
  });

  it("Ensure that highlighted word changes from Above to Below", () => {
    cy.goToMeasure("AMR-AD");
    cy.get("#MeasurementSpecification-NCQAHEDIS").click({ force: true });
    cy.get("body").should(
      "include.text",
      "NCQA, the measure steward, changed its naming convention. HEDIS MY 2020 refers to a different federal fiscal year (FFY) than HEDIS 2020. Please note the FFY Core Set specification below."
    );
  });

  it("Ensure that What number of your measure-eligible population are included in the measure? is changed to What is the size of the measure-eligible population?", () => {
    cy.goToMeasure("CBP-AD");
    cy.get("#DidReport-yes").click({ force: true });
    cy.get("#DataStatus-ReportingProvisionalData").click({ force: true });
    cy.get("#MeasurementSpecification-NCQAHEDIS").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="What is the size of the measure-eligible population?"]'
    ).should(
      "have.text",
      "What is the size of the measure-eligible population?"
    );
  });

  it("Ensure Validation text is updated to Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation.", () => {
    cy.goToMeasure("HPC-AD");
    cy.get("#DidReport-yes").click({ force: true });
    cy.get("#DataStatus-ReportingProvisionalData").click({ force: true });
    cy.get("#MeasurementSpecification-NCQAHEDIS").click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
