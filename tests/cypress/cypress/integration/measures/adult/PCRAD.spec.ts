describe("PCR-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("PCR-AD");
  });
  it("fill out oy2-9910 PCR-AD form", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click();
    cy.get(".css-owjkmg").click();
    cy.get('[data-cy="DataSourceDescription"]').click();
    cy.get(".chakra-container > :nth-child(7)").click();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').click();
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
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
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
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    // cy.get(":nth-child(9) > :nth-child(3) > :nth-child(1)").should(
    //   "have.text",
    //   "Count of Index Hospital Stays (IHS)"
    // );
    // cy.get(":nth-child(9) > :nth-child(3) > :nth-child(2)").should(
    //   "have.text",
    //   "Count of Observed 30-Day Readmissions"
    // );
    // cy.get(":nth-child(9) > :nth-child(3) > :nth-child(3)").should(
    //   "have.text",
    //   "Count of Expected 30-Day Readmissions"
    // );
    // cy.get(":nth-child(9) > :nth-child(4)").should(
    //   "have.text",
    //   "For beneficiaries ages 18 to 64, states should also report the rate of beneficiaries who are identified as outliers based on high rates of inpatient and observation stays during the measurement year. Data are reported in the following categories:"
    // );
    // cy.get(":nth-child(9) > :nth-child(5) > :nth-child(1)").should(
    //   "have.text",
    //   "Count of Beneficiaries in Medicaid Population"
    // );
    // cy.get(":nth-child(9) > :nth-child(5) > :nth-child(2)").should(
    //   "have.text",
    //   "Number of Outliers"
    // );
    cy.get(
      '[data-cy="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"]'
    ).should(
      "have.text",
      "If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
    );
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="Count of Index Hospital Stays"]').should(
      "have.text",
      "Count of Index Hospital Stays"
    );
    cy.get('[data-cy="Count of Observed 30-Day Readmissions"]').should(
      "have.text",
      "Count of Observed 30-Day Readmissions"
    );
    cy.get('[data-cy="Observed Readmission Rate"]').should(
      "have.text",
      "Observed Readmission Rate"
    );
    cy.get('[data-cy="Count of Expected 30-Day Readmissions"]').should(
      "have.text",
      "Count of Expected 30-Day Readmissions"
    );
    cy.get('[data-cy="Expected Readmission Rate"]').should(
      "have.text",
      "Expected Readmission Rate"
    );
    cy.get(
      '[data-cy="O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)"]'
    ).should(
      "have.text",
      "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)"
    );
    cy.get('[data-cy="Count of Beneficiaries in Medicaid Population"]').should(
      "have.text",
      "Count of Beneficiaries in Medicaid Population"
    );
    cy.get('[data-cy="Number of Outliers"]').should(
      "have.text",
      "Number of Outliers"
    );
    cy.get(
      '[data-cy="Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000"]'
    ).should(
      "have.text",
      "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.value"]').type(
      "1234567890"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.value"]').type(
      "1234567890"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.value"]'
    ).should("have.value", "100.0000");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]').type(
      "1234567890123456.1234"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.value"]'
    ).should("have.value", "100000000.0100");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).should("have.value", "1234567890123456.1234");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.6.value"]').type(
      "1234567890"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.7.value"]').type(
      "1234567890"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.value"]'
    ).should("have.value", "1000.0");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]').type(
      "0123456.1234"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]').type(
      "1234"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]').type(
      "123"
    );
    //cy.get(":nth-child(9) > :nth-child(8)").click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.value"]'
    ).should("have.value", "100.0000");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.value"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.value"]'
    ).should("have.value", "0.0000");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.5.value"]'
    ).should("have.value", "10037137.3171");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.7.value"]').type(
      "50000000"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.value"]'
    ).should("have.value", "40.5");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.value"]').type(
      "123456789.1234"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="DeviationOptions0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationOptions1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DeviationOptions2"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates1"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.0.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.0.value"]'
    ).type("1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.1.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.1.value"]'
    ).type("1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.2.value"]'
    ).should("have.value", "100.0000");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.1.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.0.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.3.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.3.value"]'
    ).type("1234567890123456.1234");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.4.value"]'
    ).should("have.value", "100000000.0100");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.3.value"]'
    ).should("have.value", "1234567890123456.1234");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.5.value"]'
    ).should("have.value", "0.0000");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.6.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.6.value"]'
    ).type("1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.7.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.7.value"]'
    ).type("1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.6.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.7.value"]'
    ).should("have.value", "1234567890");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.pcr-rate.8.value"]'
    ).should("have.value", "1000.0");
    cy.get(
      ":nth-child(1) > :nth-child(1) > .css-1kxonj9 > .css-n21gh5 > :nth-child(2)"
    ).click();
    cy.get('[data-cy="OptionalMeasureStratification.options1"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.pcr-rate.3.value"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.pcr-rate.3.value"]'
    ).type("123");
    cy.get(
      '[data-cy="OptionalMeasureStratification.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options3"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options4"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options5"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.options6"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="OptionalMeasureStratification.options6"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="At least one item must be selected and completed (Numerator, Denominator, or Other)"] > .chakra-text'
    ).should(
      "have.text",
      "At least one item must be selected and completed (Numerator, Denominator, or Other)"
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
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Verify the OPM section", function () {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2020");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
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
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DeliverySys-FeeForService_radiogroup > .chakra-stack > :nth-child(2) > .chakra-radio"
    ).click();
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
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="Other Performance Measure"]').should(
      "have.text",
      "Other Performance Measure"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "test"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "3"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("30");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "10.0"
    );
  });

  it("Verify error message for empty form", function () {
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"] > .chakra-text').should(
      "have.text",
      "Date Range must be completed"
    );
    cy.get(
      '[data-cy="All data fields must be completed."] > .chakra-text'
    ).should("have.text", "All data fields must be completed.");
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
  });
});
