describe("Measure: FUH-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("FUH-HH");
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

  it("should include correct Definition of Population options", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("be.visible");
    cy.get('[data-cy="DefinitionOfDenominator0"]').should(
      "include.text",
      "Denominator includes Medicaid population"
    );
    cy.get('[data-cy="DefinitionOfDenominator2"]').should(
      "include.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get('[data-cy="DefinitionOfDenominator3"]').should(
      "include.text",
      "Other"
    );
    cy.get('[data-cy="DefinitionOfDenominator1"]').should("not.exist");
  });

  it("should include 'Are all Health Home Providers represented in the denominator?' question", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get(
      '[data-cy="Are all Health Home Providers represented in the denominator?"]'
    ).should("be.visible");
    cy.get("#DenominatorDefineHealthHome-yes").should("be.visible");
    cy.get("#DenominatorDefineHealthHome-no").should("be.visible");
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

  it(
    "at least one ndr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

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

  it("calculates correct rate totals for both PM and OMS", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();

    // PM
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.0.numerator"]'
    )
      .clear()
      .type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.0.denominator"]'
    )
      .clear()
      .type("7");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.1.numerator"]'
    )
      .clear()
      .type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.1.denominator"]'
    )
      .clear()
      .type("1");

    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin7daysafterdischarge.2.numerator"]'
    )
      .clear()
      .type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin7daysafterdischarge.2.denominator"]'
    )
      .clear()
      .type("1");

    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.0.rate"]'
    ).should("have.value", "42.9");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.1.rate"]'
    ).should("have.value", "100.0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.3.numerator"]'
    ).should("have.value", "4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin30daysafterdischarge.3.denominator"]'
    ).should("have.value", "8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin7daysafterdischarge.3.numerator"]'
    ).should("have.value", "1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Followupwithin7daysafterdischarge.3.denominator"]'
    ).should("have.value", "1");

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
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages6to17.Followupwithin30daysafterdischarge.0.numerator"]'
    )
      .clear()
      .type("11");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages6to17.Followupwithin30daysafterdischarge.0.denominator"]'
    )
      .clear()
      .type("12");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.Followupwithin30daysafterdischarge.0.numerator"]'
    )
      .clear()
      .type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.Followupwithin30daysafterdischarge.0.denominator"]'
    )
      .clear()
      .type("1");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAge6andolder.Followupwithin30daysafterdischarge.0.numerator"]'
    ).should("have.value", "12");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAge6andolder.Followupwithin30daysafterdischarge.0.denominator"]'
    ).should("have.value", "13");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.TotalAge6andolder.Followupwithin30daysafterdischarge.0.rate"]'
    ).should("have.value", "92.3");

    // validation errors
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing"]'
    ).should("exist");
    cy.get(
      '[data-cy="You must select at least one Data Source option"]'
    ).should("exist");
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="Date Range Error"]').should("exist");
    cy.get(
      '[data-cy="Denominators must be the same for each category of performance measures for Total (Age 6 and older)"]'
    ).should("exist");
    cy.get(
      '[data-cy="Follow-up within 7 days after discharge Rate should not be higher than Follow-up within 30 days after discharge Rate for Total (Age 6 and older) Rates."]'
    ).should("exist");
  });
});
