describe("Measure: APM-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("APM-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("Ensure error message when not enter any data in the form and verify Data Source", () => {
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range Error"]').should(
      "have.text",
      "Date Range Error"
    );
    cy.get('[data-cy="Date Range must be completed"] > .chakra-text').should(
      "have.text",
      "Date Range must be completed"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
    ).should(
      "have.text",
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });

  it("at least one NDR set if reporting and measurement spec or error.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
  });

  it("if yes for combined rates → and no additional selection → show warning", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."]'
    ).should(
      "have.text",
      "You must select at least one option for Combined Rate(s) Details if Yes is selected."
    );
  });

  it("Ensure that numerical value after decimal is rounded up/down for auto calculated rate.", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.numerator"]'
    ).type("555");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.denominator"]'
    ).type("10000");
    cy.get('[data-cy="PerformanceMeasure.rates.BloodGlucose.0.rate"]').should(
      "have.value",
      "5.6"
    );
  });

  it("Ensure that “Total” NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.denominator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.2.numerator"]'
    ).should("have.value", "6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.2.denominator"]'
    ).should("have.value", "6");
    cy.get('[data-cy="PerformanceMeasure.rates.BloodGlucose.2.rate"]').should(
      "have.value",
      "100.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.1.numerator"]'
    ).type("8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.1.denominator"]'
    ).type("16");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.2.denominator"]'
    ).should("have.value", "22");
    cy.get('[data-cy="PerformanceMeasure.rates.BloodGlucose.2.rate"]').should(
      "have.value",
      "63.6"
    );
  });

  it("Validate Equal Qualifier Denominators", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get('[data-cy="DataSource1"]').click();

    // PM
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.1.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.BloodGlucose.1.denominator"]'
    ).type("3");

    cy.get('[data-cy="PerformanceMeasure.rates.Cholesterol.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Cholesterol.0.denominator"]'
    ).type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.Cholesterol.1.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Cholesterol.1.denominator"]'
    ).type("3");

    // PM Validations
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="The Ages 1 to 11 denominator must be the same for each indicator."] > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="Total (Ages 1 to 17) denominator must be the same for each indicator."] > .chakra-text'
    ).should("be.visible");

    // Clear PM Validations
    cy.get('[data-cy="PerformanceMeasure.rates.Cholesterol.0.denominator"]')
      .clear()
      .type("2");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="The Ages 1 to 11 denominator must be the same for each indicator."] > .chakra-text'
    ).should("not.exist");
    cy.get(
      '[data-cy="Total (Ages 1 to 17) denominator must be the same for each indicator."] > .chakra-text'
    ).should("not.exist");

    // OMS
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages1to11.BloodGlucose.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages1to11.BloodGlucose.0.denominator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages1to11.Cholesterol.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages1to11.Cholesterol.0.denominator"]'
    ).type("2");

    // OMS Validations
    cy.get('[data-cy="Validate Measure"]').click();
    cy.contains(
      ".chakra-alert",
      "Optional Measure Stratification: Race (Non-Hispanic) - White - Ages 1 to 11 Error"
    ).within(() => {
      cy.get(
        '[data-cy="Denominators must be the same for each category."] > .chakra-text'
      ).should("be.visible");
    });

    cy.get('[data-cy="Clear Data"]').click();
  });
});
