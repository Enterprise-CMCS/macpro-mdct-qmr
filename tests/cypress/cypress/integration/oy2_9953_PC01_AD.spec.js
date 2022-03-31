describe("Measure: PC01-AD", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("PC01-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("should show correct data source options", () => {});

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
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

  /* ==== Test Created with Cypress Studio ==== */
  it("Fill out the form PC01_AD", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DidReport0"]').click();
    //cy.get('#radio-539').check();
    cy.get('[data-cy="DataStatus0"]').click();
    //cy.get('#radio-543').check();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    //cy.get('#radio-547').check();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.HybridAdministrativeandMedicalRecordsData0\\.selected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected0"]'
    ).click();
    cy.get(
      "#DataSourceSelections\\.HybridAdministrativeandMedicalRecordsData1\\.selected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.HybridAdministrativeandMedicalRecordsData1\\.selected1-checkbox"
    ).check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.ElectronicHealthRecords.description"]'
    ).click();
    cy.get('[data-cy="DataSource2"] > .chakra-checkbox__control').click();
    cy.get("#DataSource2-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click();
    cy.get('[data-cy="DataSourceDescription"]').click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').click();
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator0-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator1-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator2-checkbox").check();
    cy.get(
      '[data-cy="DefinitionOfDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DefinitionOfDenominator3-checkbox").check();
    cy.get('[data-cy="DefinitionOfDenominator-Other"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    //cy.get('#radio-563').check();
    cy.get('[data-cy="HybridMeasurePopulationIncluded"]').clear();
    cy.get('[data-cy="HybridMeasurePopulationIncluded"]').type("12");
    cy.get('[data-cy="HybridMeasureSampleSize"]').clear();
    cy.get('[data-cy="HybridMeasureSampleSize"]').type("10");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").uncheck();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    //cy.get('#radio-596').check();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').type("10");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    //cy.get('#radio-601').check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').type(
      "10"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator2-checkbox").check();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').type("10");
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    //cy.get('#radio-607').check();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').type("10");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').type("10");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    //cy.get('#radio-613').check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').type(
      "10"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator4-checkbox").check();
    cy.get('[data-cy="DeliverySys-Other"]').click();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').click();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').type("10");
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').click();
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').clear();
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').type("10");
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="PerformanceMeasure.hybridExplanation"]').click();

    cy.get(":nth-child(9) > .css-1u9gfme > .chakra-text").should(
      "have.text",
      "CMS recognizes that social distancing will make onsite medical chart reviews inadvisable during the COVID-19 pandemic. As such, hybrid measures that rely on such techniques will be particularly challenging during this time. While reporting of the Core Sets is voluntary, CMS encourages states that can collect information safely to continue reporting the measures they have reported in the past."
    );

    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("50");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "10.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get('[data-cy="Deviations from Measure Specifications"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "12.3"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    //cy.get('#radio-581').check();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get("#DeviationOptions0-checkbox").check();
    cy.get(
      '[data-cy="DeviationOptions0"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Women with elective deliveries or C-sections at  ≥ 37 and <39 weeks"
    );
    cy.get(
      '[data-cy="Deviations.WomenwithelectivedeliveriesorCsectionsat37and39weeks.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.WomenwithelectivedeliveriesorCsectionsat37and39weeks\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.WomenwithelectivedeliveriesorCsectionsat37and39weeks.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.WomenwithelectivedeliveriesorCsectionsat37and39weeks\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.WomenwithelectivedeliveriesorCsectionsat37and39weeks.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.WomenwithelectivedeliveriesorCsectionsat37and39weeks\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get('[data-cy="CombinedRates0"]').click();
    //cy.get('#radio-570').check();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    //cy.get('#radio-631').check();
    cy.get('[data-cy="CombinedRates-CombinedRates-Other-Explanation"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Women with elective deliveries or C-sections at  ≥ 37 and <39 weeks"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.denominator"]'
    ).type("50");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.rate"]'
    ).should("have.value", "10.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .css-0"
    ).click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .css-0"
    ).click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > .css-0"
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.WomenwithelectivedeliveriesorCsectionsat37and39weeks.singleCategory.0.rate"]'
    ).type("12.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options2-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options4-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.NativeHawaiianorOtherPacificIslander.aggregate1"]'
    ).click();
    //cy.get('#radio-633').check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options1-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options2-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options3-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options4-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Geography.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.Geography\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Geography.selections.Urban.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Women with elective deliveries or C-sections at  ≥ 37 and <39 weeks"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options5-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.AdultEligibilityGroupACAExpansionGroup.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Women with elective deliveries or C-sections at  ≥ 37 and <39 weeks"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Optional Measure Stratification: Adult Eligibility Group (ACA Expansion Group) Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Adult Eligibility Group (ACA Expansion Group) Error"
    );
    cy.get(
      ':nth-child(3) > div.css-0 > [data-cy="Must fill out at least one NDR set."] > .chakra-text'
    ).should("have.text", "Must fill out at least one NDR set.");
    cy.get(
      '[data-cy="Optional Measure Stratification: Disability Status Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Disability Status Error"
    );
    cy.get(
      ':nth-child(4) > div.css-0 > [data-cy="Must fill out at least one NDR set."] > .chakra-text'
    ).should("have.text", "Must fill out at least one NDR set.");
    cy.get(
      '[data-cy="Optional Measure Stratification: Ethnicity Error"]'
    ).should("have.text", "Optional Measure Stratification: Ethnicity Error");
    cy.get(
      ':nth-child(5) > div.css-0 > [data-cy="Must fill out at least one NDR set."] > .chakra-text'
    ).should("have.text", "Must fill out at least one NDR set.");
    cy.get(
      '[data-cy="Optional Measure Stratification: Geography Error"]'
    ).should("have.text", "Optional Measure Stratification: Geography Error");
    cy.get(
      ':nth-child(6) > div.css-0 > [data-cy="Must fill out at least one NDR set."] > .chakra-text'
    ).should("have.text", "Must fill out at least one NDR set.");
    cy.get(
      '[data-cy="Optional Measure Stratification: Primary Language (including sign language) Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Primary Language (including sign language) Error"
    );
    cy.get(
      ':nth-child(7) > div.css-0 > [data-cy="Must fill out at least one NDR set."] > .chakra-text'
    ).should("have.text", "Must fill out at least one NDR set.");
    //cy.get('[data-testid="measure-wrapper-form"] > :nth-child(6)').click();
    cy.get('[data-cy="Performance Measure Error"]').should(
      "have.text",
      "Performance Measure Error"
    );
    cy.get(
      '[data-cy="The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Ages 65 to 85"] > .chakra-text'
    ).should(
      "have.text",
      "The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Ages 65 to 85"
    );
    /* ==== End Cypress Studio ==== */
  });
});
