import { testingYear } from "../../../../support/constants";

describe("PCR-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
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
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get('[data-cy="DataSource1"]').click();
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.enterValidDateRange();

    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get('[data-cy="DefinitionOfDenominator1"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"]').click();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator1"]').click();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator2"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator3"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator4"]').click();

    cy.get(
      '[data-cy="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"]'
    ).should(
      "have.text",
      "If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
    );
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
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.0.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.1.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.0.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.1.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.2.value"]').should(
      "have.value",
      "100.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').type(
      "1234567890123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.4.value"]').should(
      "have.value",
      "100000000.0100"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').should(
      "have.value",
      "1234567890123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.6.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.7.value"]').type(
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.6.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.7.value"]').should(
      "have.value",
      "1234567890"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.8.value"]').should(
      "have.value",
      "1000.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').type(
      "0123456.1234"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').type("1234");
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').type("123");
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.2.value"]').should(
      "have.value",
      "100.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.4.value"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.4.value"]').should(
      "have.value",
      "0.0000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.5.value"]').should(
      "have.value",
      "10037137.3171"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.7.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.7.value"]').type(
      "50000000"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.8.value"]').should(
      "have.value",
      "40.5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.zcwVcA.3.value"]').type(
      "123456789.1234"
    );
    cy.get('[data-cy="DidCalculationsDeviate0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates0"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates1"]').click();
    cy.get('[data-cy="CombinedRates-CombinedRates2"]').click();
  });

  it("Verify the OPM section", function () {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get('[data-cy="DefinitionOfDenominator1"]').click();
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator1"]').click();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator2"]').click();
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator3"]').click();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator4"]').click();
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
    cy.get(
      '[data-cy="Date Range answer must be selected"] > .chakra-text'
    ).should("have.text", "Date Range answer must be selected");
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
