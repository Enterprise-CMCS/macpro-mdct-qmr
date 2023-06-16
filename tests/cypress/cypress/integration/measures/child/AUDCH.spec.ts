describe("Measure: oy2_9922 AUD-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AUD-CH");
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
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Records");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.ElectronicHealthRecords.description"]'
    ).click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get('[data-cy="DataSourceSelections.Other.description"]').click();
    cy.get('[data-cy="DataSourceDescription"]').click();
  });

  it("Verify error message when no data entered in the form and click on validate measure button", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="Validate Measure"]').click();
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
    /* ==== End Cypress Studio ==== */
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Fill out the measurement AUD_CH", function () {
    /* ==== Questions before "Which delivery systems are represented in the denominator?" ==== */
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").uncheck();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2020");
    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get('[data-cy="DefinitionOfDenominator1"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec1"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Explanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').clear();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').type("12");
    /* ==== End Cypress Studio ==== */
    /* ==== Questions "Which delivery systems are represented in the denominator?" ==== */
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get('[data-cy="DeliverySys-FeeForService0"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').type("12");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement0"]').click();
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
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').type("11");
    cy.get('[data-cy="DeliverySys-MCO_PIHP0"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').type("12");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').type("12");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel0"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
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
    cy.get('[data-cy="DeliverySys-Other-NumberOfHealthPlans"]').type("12");
    /* ==== End Cypress Studio ==== */
    /* ==== Verify the NDR in Performance Measure ==== */
    cy.get(".css-n21gh5 > .chakra-text").should(
      "have.text",
      "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age (90 days)."
    );
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
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
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
      "12.3"
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Deviations from Measure Specifications & Combined Rates from Multiple Reporting Units ==== */
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get("#DeviationOptions0-checkbox").check();
    cy.get(
      '[data-cy="Deviations.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates1"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates-Other-Explanation"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Verify OMS section and error message after click on validate measure button ==== */
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
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.rate"]'
    ).should("have.value", "10.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage.singleCategory.0.rate"]'
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
      ':nth-child(3) > div.css-0 > [data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      ':nth-child(4) > div.css-0 > [data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );
    /* ==== End Cypress Studio ==== */
  });
});
