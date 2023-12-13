import { testingYear } from "../../../../support/constants";

describe("CCW-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCW-AD");
  });

  it("Yes for Reporting", () => {
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get('[data-cy="DataStatus1"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"]'
    ).click();
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').type("2");
    cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
    cy.get('[data-cy="DateRange.endDate-month"]').type("5");
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");

    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.0.rate"]').should(
      "have.value",
      "50.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.1.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.1.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.ntJIVl.1.rate"]').should(
      "have.value",
      "66.7"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate."]'
    ).should(
      "contain.text",
      "Long-acting reversible method of contraception (LARC) rate must be less than or equal to Most effective or moderately effective method of contraception rate."
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "The following categories must have the same denominator:"
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "Long-acting reversible method of contraception (LARC)"
    );
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should(
      "include.text",
      "Most effective or moderately effective method of contraception"
    );
  });

  it("Other Performance Measure", () => {
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).type("Test");
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"]'
    ).click();
    cy.get('[data-cy="DataSource1"]').click();

    cy.get('[data-cy="OtherPerformanceMeasure-Explanation"]').type("OPM");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "Age Range: 21 to 44"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "Test2"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "3"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.description"]').type(
      "check"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.numerator"]').type(
      "0"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').should(
      "be.enabled"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.2.rate.0.rate"]').type("5");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Manually entered rate should be 0 if numerator is 0"]'
    ).should(
      "have.text",
      "Manually entered rate should be 0 if numerator is 0"
    );

    cy.wait(1000);
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.description"]').type(
      "check1"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').type("0");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.3.rate.0.rate"]').should(
      "have.value",
      "0"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."]'
    ).should(
      "have.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });
});
