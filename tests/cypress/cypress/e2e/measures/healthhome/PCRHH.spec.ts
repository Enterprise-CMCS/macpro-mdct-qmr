import { testingYear } from "../../../../support/constants";

describe("PCR-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("PCR-HH");
  });

  it("fill out oy2-9908 PCR-HH form", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2021"
    );
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"]'
    ).click();
    cy.enterValidDateRange();
    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService0"]').click();

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

    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.0.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.1.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.0.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.1.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.2.value"]').should(
      "have.value",
      "100.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').type(
      "1234567890123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.4.value"]').should(
      "have.value",
      "100000000.0100"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').should(
      "have.value",
      "1234567890123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.6.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.6.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.7.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.7.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.6.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.7.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.8.value"]').should(
      "have.value",
      "1000.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').type(
      "0123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').type("1234");
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').type("123");
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.2.value"]').should(
      "have.value",
      "100.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.4.value"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.4.value"]').should(
      "have.value",
      "0.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.5.value"]').should(
      "have.value",
      "10037137.3171"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.7.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.7.value"]').type(
      "50000000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.8.value"]').should(
      "have.value",
      "40.5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.YGJwmu.3.value"]').type(
      "123456789.1234"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();

    cy.get('[data-cy="Validate Measure"]').click();
  });

  it("Verify the OPM section", function () {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="Other Performance Measure"]').should(
      "have.text",
      "Other Performance Measure"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "test"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "3"
    );
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
    cy.get('[data-cy="Date Range Error"]').should(
      "have.text",
      "Date Range Error"
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
    cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
      "have.text",
      "Why are you not reporting on this measure?"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Service not covered");
    cy.get('[data-cy="WhyAreYouNotReporting0"]').click();
    cy.get(
      '[data-cy="WhyAreYouNotReporting1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Population not covered");
    cy.get('[data-cy="WhyAreYouNotReporting1"]').click();
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
    cy.get('[data-cy="WhyAreYouNotReporting2"]').click();
    cy.get('[data-cy="Why is data not available?"]').should(
      "have.text",
      "Why is data not available?"
    );
    cy.get(
      '[data-cy="WhyIsDataNotAvailable0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Budget constraints");
    cy.get('[data-cy="WhyIsDataNotAvailable0"]').click();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Staff Constraints");
    cy.get('[data-cy="WhyIsDataNotAvailable1"]').click();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data inconsistencies/Accuracy");
    cy.get('[data-cy="WhyIsDataNotAvailable2"]').click();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data not submitted by Providers to State");
    cy.get('[data-cy="WhyIsDataNotAvailable3"]').click();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data source not easily accessible");
    cy.get('[data-cy="WhyIsDataNotAvailable4"]').click();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Requires medical record review");
    cy.get('[data-cy="DataSourceNotEasilyAccessible0"]').click();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible1"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Requires data linkage which does not currently exist"
    );
    cy.get('[data-cy="DataSourceNotEasilyAccessible1"]').click();
    cy.get(
      '[data-cy="DataSourceNotEasilyAccessible2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get('[data-cy="DataSourceNotEasilyAccessible2"]').click();
    cy.get(
      '[data-cy="WhyIsDataNotAvailable5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Information not collected");
    cy.get('[data-cy="WhyIsDataNotAvailable5"]').click();
    cy.get(
      '[data-cy="InformationNotCollected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Not Collected by Provider (Hospital/Health Plan)");
    cy.get('[data-cy="InformationNotCollected0"]').click();
    cy.get(
      '[data-cy="InformationNotCollected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get('[data-cy="InformationNotCollected1"]').click();
    cy.get(
      '[data-cy="WhyAreYouNotReporting3"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
    );
    cy.get('[data-cy="WhyAreYouNotReporting3"]').click();
    cy.get(
      '[data-cy="Describe your state\'s limitations with regard to collection, reporting, or accuracy of data for this measure:"]'
    ).should(
      "have.text",
      "Describe your state's limitations with regard to collection, reporting, or accuracy of data for this measure:"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Small sample size ");
    cy.get('[data-cy="WhyAreYouNotReporting4"]').click();
    cy.get('[data-cy="Enter specific sample size:"]').should(
      "have.text",
      "Enter specific sample size:"
    );
    cy.get('[data-cy="SmallSampleSizeLessThan30"]').clear();
    cy.get('[data-cy="SmallSampleSizeLessThan30"]').type("2");
    cy.get('[data-cy="WhyAreYouNotReporting5"]').click();
    cy.get(
      '[data-cy="WhyAreYouNotReporting6"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get('[data-cy="WhyAreYouNotReporting6"]').click();
    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should(
      "have.text",
      "Additional Notes/Comments on the measure (optional)"
    );
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').type("Test");
    cy.get('[data-cy="Validate Measure"]').click();
  });
});
