describe("Measure: FUM-AD", () => {
  before(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("FUM-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("Ensure Data Source question includes Administrative Data, and Other Data Source selections.", () => {
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
  });

  it("Rate calculation should be correct", () => {
    // select is reporting
    cy.get('[data-cy="DidReport0"]').click({ force: true });

    // select AHRQ for measurement specification
    cy.get('[data-cy="MeasurementSpecification0"]').click();

    cy.get('[id="DataSource0-checkbox"]').check({ force: true });
    cy.get('[id="DataSource1-checkbox"]').uncheck({ force: true });

    // Rate calculation should be = (N/D*100)
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "50.0");

    // Ensure that auto calculate rate displays 1 decimal (even if the value is zero)
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).type("8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "80.0");

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (up)
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).type("9");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "88.9");

    // PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (down)
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).type("18");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "44.4");

    // Ensure that user cannot manually enter rates if admin data is selected - (already selected)
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.attr", "readonly");
  });

  it("User can manually adjust rate if other data source is selected", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "50.0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("not.have.attr", "readonly");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).type("4869568.1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.rate"]'
    ).should("have.value", "48.1");
  });

  it("Age ranges are represented in DMS and OMS", () => {
    cy.wait(1000);
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[id="DataSource0-checkbox"]').check({ force: true });
    cy.get('[id="DataSource1-checkbox"]').uncheck({ force: true });
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.0.denominator"]'
    ).type("10");

    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.1.numerator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.30dayfollowupafterEDvisitformentalillness.1.denominator"]'
    ).type("40");
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();

    cy.get(
      '[data-cy="DeviationOptions0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");

    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="Deviations.30dayfollowupafterEDvisitformentalillness.SelectedOptions0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="Deviations.30dayfollowupafterEDvisitformentalillness.SelectedOptions1"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="Deviations.30dayfollowupafterEDvisitformentalillness.SelectedOptions0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="Deviations.30dayfollowupafterEDvisitformentalillness.Ages18to64.RateDeviationsSelected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.30dayfollowupafterEDvisitformentalillness.0.numerator"]'
    ).should("be.visible");
  });

  // if Other measure spec is selected each age range/ custom description for which there are n/d/r
  // values entered in other performance measure are presented in:
  //  - Optional Measure specification
  it("Age ranges are represented in OMS when other measure spec", () => {
    cy.wait(1000);
    cy.get('[data-cy="DidReport0"]').click();
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
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "example 2"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "10"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.rates.example1.OPM.0.numerator"]'
    ).should("be.visible");
  });
});
