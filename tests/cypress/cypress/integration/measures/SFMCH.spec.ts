const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("Measure: oy2-9936 SFM-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.deleteChildCoreSets();
    cy.goToChildCoreSetMeasuresSFMCH();
    cy.goToMeasure("SFM-CH");
  });

  it("Ensure error message when not enter any data in the form and verify Data Source", () => {
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

  it("Fill out the SFM-CH form and verify NDR section in PM OMS", function () {
    /* ==== Questions before "Which delivery systems are represented in the dnominator?" ==== */
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"]'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected1-checkbox"
    ).check();
    cy.xpath(
      "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[4]"
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2018");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2020");
    cy.get(
      "#DefinitionOfDenominator_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio"
    ).click();
    cy.get(
      "#DefinitionOfDenominator_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio"
    ).click();
    cy.get('[data-cy="DefinitionOfDenominator1"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get(".chakra-container > :nth-child(8)").click();
    cy.get('[data-cy="DefinitionOfDenominator-Subset-Explain"]').clear();
    cy.get('[data-cy="DefinitionOfDenominator-Subset-Explain"]').type("12");
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Question "Which delivery systems are represented in the denominator?" ==== */
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').type("12");
    cy.get('[data-cy="DeliverySysRepresentationDenominator1"]').click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement-No-Percent"]').type(
      "12"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator2-checkbox").check();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').type("12");
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').type("12");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').type("121");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel0"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel0"]').click();
    cy.get(
      "#DeliverySys-IntegratedCareModel_radiogroup > .chakra-stack > :nth-child(2) > .chakra-radio"
    ).click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').type("12");
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').type(
      "12"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator4-checkbox").check();
    cy.get('[data-cy="DeliverySys-Other"]').click();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-Other-Percent"]').type("12");
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').clear();
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').type("121");
    /* ==== End Cypress Studio ==== */
    /* ==== Performance Measure ==== */
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "10.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "20.0"
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
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').type(
      "12.3"
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Deviations from Measure Specifications & Combined Rates from Multiple Reporting Units ==== */
    cy.get('[data-cy="DidCalculationsDeviate1"]').click();
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get("#DeviationOptions0-checkbox").check();
    cy.get(
      '[data-cy="Deviations.Rate1AtLeastOneSealant.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate1AtLeastOneSealant\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Rate1AtLeastOneSealant.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate1AtLeastOneSealant\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Rate1AtLeastOneSealant.RateDeviationsSelected1"] > .chakra-checkbox__control > div'
    ).click();
    cy.get(
      "#Deviations\\.Rate1AtLeastOneSealant\\.RateDeviationsSelected1-checkbox"
    ).uncheck();
    cy.get(
      '[data-cy="Deviations.Rate1AtLeastOneSealant.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate1AtLeastOneSealant\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Rate1AtLeastOneSealant.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate1AtLeastOneSealant\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get('[data-cy="DeviationOptions1"] > .chakra-checkbox__control').click();
    cy.get("#DeviationOptions1-checkbox").check();
    cy.get(
      '[data-cy="Deviations.Rate2AllFourMolarsSealed.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate2AllFourMolarsSealed\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Rate2AllFourMolarsSealed.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate2AllFourMolarsSealed\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Rate2AllFourMolarsSealed.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Rate2AllFourMolarsSealed\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates1"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Verify OMS section and error messages after click on Validate Measure button ==== */
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"]'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"]'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.options0-checkbox"
    ).uncheck();
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
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.rate"]'
    ).should("have.value", "10.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.rate"]'
    ).should("have.value", "20.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate1AtLeastOneSealant.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Rate2AllFourMolarsSealed.singleCategory.0.rate"]'
    ).type("12.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Ethnicity");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Sex");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Primary Language (including sign language)");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Disability Status");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Geography");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Deviations from Measure Specifications Error"]').should(
      "have.text",
      "Deviations from Measure Specifications Error"
    );
    cy.get(
      '[data-cy="At least one item must be selected and completed (Numerator, Denominator, or Other)"] > .chakra-text'
    ).should(
      "have.text",
      "At least one item must be selected and completed (Numerator, Denominator, or Other)"
    );
    cy.get(
      '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White Error"]'
    ).should(
      "have.text",
      "Optional Measure Stratification: Race (Non-Hispanic) - White Error"
    );
    cy.get(
      ':nth-child(3) > div.css-0 > [data-cy="Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant)."] > .chakra-text'
    ).should(
      "have.text",
      "Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant)."
    );
    cy.get('[data-cy="Performance Measure Error"]').should(
      "have.text",
      "Performance Measure Error"
    );
    cy.get(
      ':nth-child(4) > div.css-0 > [data-cy="Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant)."] > .chakra-text'
    ).should(
      "have.text",
      "Rate 2 (All Four Molars Sealed) should not be higher than Rate 1 (At Least One Sealant)."
    );
    /* ==== End Cypress Studio ==== */
  });
});
