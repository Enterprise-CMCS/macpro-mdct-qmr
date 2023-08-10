import { testingYear } from "../../../../support/constants";

describe("Measure: PQI08-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI08-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("Ensure Data Source question includes Administrative Data, and Other Data Source selections.", () => {
    // admin data
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");

    // other data source
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
  });

  it("Rate calculation should be correct", () => {
    // select is reporting
    cy.get('[data-cy="DidReport0"]').click();

    // select AHRQ for measurement specification
    cy.get('[data-cy="MeasurementSpecification0"]').click();

    cy.get('[data-cy="DataSource0"]').click();

    // Rate calculation should be = (N/D*100,000)
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "50000.0"
    );

    // Ensure that auto calculate rate displays 1 decimal (even if the value is zero)
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').type("8");
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "80000.0"
    );

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (up)
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "88888.9"
    );

    // Ensure that numerical value after decimal is rounded up/down for auto calculated rate (down)
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "18"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "44444.4"
    );

    // Ensure that user cannot manually enter rates if admin data is selected - (already selected)
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.attr",
      "readonly"
    );
  });

  it("User can manually adjust rate if other data source is selected", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "20"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "50000.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').type(
      "4869568.1"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "4869568.1"
    );
  });

  it("Ensure that warning appears if N=0, D>0, then R should be = 0 for user entered rates.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').type("5");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Manually entered rate should be 0 if numerator is 0"]'
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
  });

  it("Ensure that warning appears if N>0, D>0, then R should be >0 for user entered rates.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').should(
      "have.value",
      "100000.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.eYsLWE.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
  });

  // if Other measure spec is selected each age range/ custom description for which there are n/d/r
  // values entered in other performance measure are presented in:
  //  - Optional Measure specification
  it("Age ranges are represented in OMS when other measure spec", () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "example 1"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("10");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "50000.0"
    );
    cy.get('[data-cy="OptionalMeasureStratification.options1"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Not of Hispanic, Latino/a, or Spanish origin");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "example 1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Ethnicity.selections.NotofHispanicLatinoaorSpanishorigin.rateData.rates.OPM.example1.0.numerator"]'
    ).should("be.visible");
  });
});
