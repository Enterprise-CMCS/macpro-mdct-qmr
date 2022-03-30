describe("CCS-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCS-AD");
  });

  it("Fill out form oy2-9939 CCS-AD", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();

    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__control'
    ).click();

    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected0"]'
    ).click();

    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected1"] > .chakra-checkbox__control'
    ).click();

    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0-Other.description"]'
    ).click();
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected0"] > .chakra-checkbox__control'
    ).click();

    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Record (EHR) Data");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected1"] > .chakra-checkbox__control'
    ).click();

    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSource2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Records");
    cy.get(
      '[data-cy="DataSourceSelections.ElectronicHealthRecords.description"]'
    ).click();
    cy.get('[data-cy="DataSource3"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click();
    cy.get('[data-cy="DataSourceDescription"]').click();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Denominator includes Medicaid population");
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Denominator includes CHIP population (e.g. pregnant women)"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get('[data-cy="DefinitionOfDenominator-Other"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="HybridMeasurePopulationIncluded"]').type("12");
    cy.get('[data-cy="HybridMeasureSampleSize"]').type("2");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get(".chakra-container > :nth-child(9)").click();
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="PerformanceMeasure.hybridExplanation"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "10.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "23.9"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="Deviations.Percentageofwomenages21to64screened.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="Deviations.Percentageofwomenages21to64screened.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="Deviations.Percentageofwomenages21to64screened.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Percentage of women ages 21 to 64 screened");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.numerator"]'
    ).type("2");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.rate"]'
    ).should("have.value", "10.0");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofwomenages21to64screened.singleCategory.0.rate"]'
    ).type("12.3");
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .css-0"
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options3"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.aggregate1"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Asian Indian");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Chinese");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Filipino");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Japanese");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Korean");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Vietnamese");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.Asian.options6"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Asian");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Not of Hispanic, Latino/a, or Spanish origin");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Hispanic or Latino");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Primary Language (including sign language)");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.PrimaryLanguageincludingsignlanguage.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "English");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.PrimaryLanguageincludingsignlanguage.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Spanish");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options3"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.DisabilityStatus.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "SSI");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.DisabilityStatus.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Non-SSI");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Geography.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Urban");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Geography.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Rural");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Adult Eligibility Group (ACA Expansion Group)");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.AdultEligibilityGroupACAExpansionGroup.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Percentage of women ages 21 to 64 screened");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Deviations from Measure Specifications Error"]').should(
      "have.text",
      "Deviations from Measure Specifications Error"
    );
    cy.get(
      '[data-cy="Optional Measure Stratification: Adult Eligibility Group (ACA Expansion Group) Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Adult Eligibility Group (ACA Expansion Group) Error"
    );
    cy.get(
      '[data-cy="Optional Measure Stratification: Disability Status Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Disability Status Error"
    );
    cy.get(
      '[data-cy="Optional Measure Stratification: Ethnicity Error"]'
    ).should("have.text", "Optional Measure Stratification: Ethnicity Error");
    cy.get(
      '[data-cy="Optional Measure Stratification: Geography Error"]'
    ).should("have.text", "Optional Measure Stratification: Geography Error");
    cy.get(
      '[data-cy="Optional Measure Stratification: Primary Language (including sign language) Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Primary Language (including sign language) Error"
    );
  });

  it("Click on validate measure button without filling out the form", function () {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCS-AD"]').click();
    cy.wait(2000);
    cy.get('[data-cy="Clear Data"]').click();
    cy.get('[data-cy="CCS-AD"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
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
    cy.get(
      '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
    ).should(
      "have.text",
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });
});
