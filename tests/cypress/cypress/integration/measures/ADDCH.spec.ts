describe("Measure: oy2-9921 ADD-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("ADD-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
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

  it("Fill out the ADD-CH form and verify NDR section in PM OMS", function () {
    /* ==== Questions before "Which delivery systems are represented in the denominator?" ==== */
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get("#DataSource0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.ElectronicHealthRecords.description"]'
    ).click();
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
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').click();
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get(
      "#DefinitionOfDenominator_radiogroup > .chakra-stack > :nth-child(1) > .chakra-radio"
    ).click();
    cy.get('[data-cy="DefinitionOfDenominator1"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec1"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Explanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').clear();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').type("12");
    /* ==== End Cypress Studio ==== */
    /* ==== Question "Which delivery systems are represented in the denominator?" ==== */
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"]').click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-FeeForService-No-Percent"]').type("12");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
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
    cy.get('[data-cy="DeliverySys-MCO_PIHP-NumberOfPlans"]').type("11");
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Included"]').type("11");
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').clear();
    cy.get('[data-cy="DeliverySys-MCO_PIHP-No-Excluded"]').type("11");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Percent"]').type("12");
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').clear();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel-No-Population"]').type(
      "11"
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
    /* ==== Performance Measure ==== */
    cy.get(".css-n21gh5 > .chakra-text").should(
      "have.text",
      "Percentage of children newly prescribed attention-deficit/hyperactivity disorder (ADHD) medication who had at least three follow-up care visits within a 10-month period, one of which was within 30 days of when the first ADHD medication was dispensed. Two rates are reported."
    );
    cy.get(".css-1af6wus > :nth-child(1) > .css-0").should(
      "have.text",
      "Percentage of children ages 6 to 12 with an ambulatory prescription dispensed for ADHD medication, who had one follow-up visit with a practitioner with prescribing authority during the 30-day Initiation Phase."
    );
    cy.get(".css-1af6wus > :nth-child(2) > .css-0").should(
      "have.text",
      "Percentage of children ages 6 to 12 with an ambulatory prescription dispensed for ADHD medication who remained on the medication for at least 210 days and who, in addition to the visit in the Initiation Phase, had at least two follow-up visits with a practitioner within 270 days (9 months) after the Initiation Phase ended."
    );
    cy.get(
      '[data-cy="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"]'
    ).should(
      "have.text",
      "If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
    );
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).click();
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
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("10");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "20.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "50.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
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
      '[data-cy="Deviations.InitiationPhase.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.InitiationPhase\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get('[data-cy="Deviations.InitiationPhase.numerator"]').click();
    cy.get(
      '[data-cy="Deviations.InitiationPhase.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.InitiationPhase\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get('[data-cy="Deviations.InitiationPhase.denominator"]').click();
    cy.get(
      '[data-cy="Deviations.InitiationPhase.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.InitiationPhase\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get('[data-cy="Deviations.InitiationPhase.other"]').click();
    cy.get('[data-cy="DeviationOptions1"] > .chakra-checkbox__control').click();
    cy.get("#DeviationOptions1-checkbox").check();
    cy.get(
      '[data-cy="DeviationOptions1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Continuation and Maintenance (C&M) Phase");
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.RateDeviationsSelected0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.ContinuationandMaintenanceCMPhase\\.RateDeviationsSelected0-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.numerator"]'
    ).click();
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.RateDeviationsSelected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.ContinuationandMaintenanceCMPhase\\.RateDeviationsSelected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.denominator"]'
    ).click();
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.RateDeviationsSelected2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#Deviations\\.ContinuationandMaintenanceCMPhase\\.RateDeviationsSelected2-checkbox"
    ).check();
    cy.get(
      '[data-cy="Deviations.ContinuationandMaintenanceCMPhase.other"]'
    ).click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates1"]').click();
    cy.get(
      "#CombinedRates-CombinedRates_radiogroup > .chakra-stack > :nth-child(3) > .chakra-radio"
    ).click();
    cy.get('[data-cy="CombinedRates-CombinedRates-Other-Explanation"]').click();
    cy.get('[data-cy="CombinedRates1"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates-Other-Explanation"]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Verify OMS section and NDR ==== */

    cy.get("fieldset p.chakra-text.css-15hzea").should(
      "have.text",
      "If this measure is also reported by additional classifications/sub-categories, e.g. racial, ethnic, sex, language, disability status, or geography, complete the following as applicable. If your state reported for classifications/sub-categories other than those listed below, or reported for different rate sets, please click on “Add Another” to add Additional/Alternative Classification/Sub-categories as needed."
    );

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
    ).should("have.text", "Initiation Phase");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Continuation and Maintenance (C&M) Phase");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options0-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.RaceNonHispanic\\.selections\\.White\\.rateData\\.options1-checkbox"
    ).check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.denominator"]'
    ).type("10");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.rate"]'
    ).should("have.value", "20.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.rate"]'
    ).should("have.value", "30.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.numerator"]'
    ).type("0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.InitiationPhase.singleCategory.0.rate"]'
    ).should("have.value", "0.0");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.rate"]'
    ).type("12");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.rate"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.ContinuationandMaintenanceCMPhase.singleCategory.0.rate"]'
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
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
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
    /* ==== End Cypress Studio ==== */
  });
});
