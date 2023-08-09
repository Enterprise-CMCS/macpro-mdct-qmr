describe("PCR-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear("2021");
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("PCR-HH");
  });
  it("fill out oy2-9908 PCR-HH form", () => {
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
    cy.get('[data-cy="Count of Enrollees in Health Home Population"]').should(
      "have.text",
      "Count of Enrollees in Health Home Population"
    );
    cy.get('[data-cy="Number of Outliers"]').should(
      "have.text",
      "Number of Outliers"
    );
    cy.get(
      '[data-cy="Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000"]'
    ).should(
      "have.text",
      "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000"
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

  it("Verify new section for Health Home measures only", function () {
    cy.get(
      '[data-cy="Are all Health Home Providers represented in the denominator?"]'
    ).should(
      "have.text",
      "Are all Health Home Providers represented in the denominator?"
    );
    cy.get('[data-cy="DenominatorDefineHealthHome0"]').click();

    cy.get('[data-cy="Validate Measure"]').click();
  });

  it("Verify the selections for Not reporting on this measure for Health Home measures only", function () {
    cy.get('[data-cy="DidReport1"]').click();
    cy.get("#DidReport-no").should(
      "have.text",
      "No, I am not reporting Plan All-Cause Readmissions (PCR-HH) for FFY 2021 quality measure reporting."
    );
    cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
      "have.text",
      "Why are you not reporting on this measure?"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Service not covered");
    cy.get(
      '[data-cy="WhyAreYouNotReporting0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting0-checkbox").check();
    cy.get(
      '[data-cy="WhyAreYouNotReporting1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Population not covered");
    cy.get(
      '[data-cy="WhyAreYouNotReporting1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting1-checkbox").check();
    cy.get("#AmountOfPopulationNotCovered-EntirePopulationNotCovered").should(
      "have.text",
      "Entire population not covered"
    );
    cy.get("#AmountOfPopulationNotCovered-PartialPopulationNotCovered").should(
      "have.text",
      "Partial population not covered"
    );
    cy.get('[data-cy="AmountOfPopulationNotCovered0"]').click();
    cy.get(
      '[data-cy="WhyAreYouNotReporting2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data not available");
    cy.get(
      '[data-cy="WhyAreYouNotReporting2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting2-checkbox").check();
    cy.get('[data-cy="Why is data not available?"]').should(
      "have.text",
      "Why is data not available?"
    );
    cy.get(
      '[data-cy="WhyIsDataNotAvailable0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Budget constraints");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable0-checkbox").check();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Staff Constraints");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable1-checkbox").check();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data inconsistencies/Accuracy");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable2-checkbox").check();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data not submitted by Providers to State");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable3-checkbox").check();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data source not easily accessible");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable4-checkbox").check();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Requires medical record review");
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSourceNotEasilyAccessible0-checkbox").check();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible1"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Requires data linkage which does not currently exist"
    );
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSourceNotEasilyAccessible1-checkbox").check();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DataSourceNotEasilyAccessible2-checkbox").check();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Information not collected");
    cy.get(
      '[data-cy="WhyIsDataNotAvailable5"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyIsDataNotAvailable5-checkbox").check();
    cy.get(
      '[data-cy="InformationNotCollected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Not Collected by Provider (Hospital/Health Plan)");
    cy.get(
      '[data-cy="InformationNotCollected0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#InformationNotCollected0-checkbox").check();
    cy.get(
      '[data-cy="InformationNotCollected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="InformationNotCollected1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#InformationNotCollected1-checkbox").check();
    cy.get(
      '[data-cy="WhyAreYouNotReporting3"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting3-checkbox").check();
    cy.get(
      '[data-cy="Describe your state\'s limitations with regard to collection, reporting, or accuracy of data for this measure:"]'
    ).should(
      "have.text",
      "Describe your state's limitations with regard to collection, reporting, or accuracy of data for this measure:"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Small sample size ");
    cy.get(
      '[data-cy="WhyAreYouNotReporting4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting4-checkbox").check();
    cy.get('[data-cy="Enter specific sample size:"]').should(
      "have.text",
      "Enter specific sample size:"
    );
    cy.get('[data-cy="SmallSampleSizeLessThan30"]').clear();
    cy.get('[data-cy="SmallSampleSizeLessThan30"]').type("2");
    cy.get(
      '[data-cy="WhyAreYouNotReporting5"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting5-checkbox").check();
    cy.get(
      '[data-cy="WhyAreYouNotReporting6"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="WhyAreYouNotReporting6"] > .chakra-checkbox__control'
    ).click();
    cy.get("#WhyAreYouNotReporting6-checkbox").check();
    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should(
      "have.text",
      "Additional Notes/Comments on the measure (optional)"
    );
    cy.get(
      '[data-cy="Please add any additional notes or comments on the measure not otherwise captured above:"]'
    ).should(
      "have.text",
      "Please add any additional notes or comments on the measure not otherwise captured above:"
    );
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').type("Test");
    cy.get('[data-cy="Validate Measure"]').click();
  });
});
