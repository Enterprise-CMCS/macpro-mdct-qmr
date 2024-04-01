import { testingYear } from "../../../../support/constants";

describe("Measure 19: AMB-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("AMB-HH");
  });

  it("calculates rates correctly - OPM", () => {
    cy.get('[data-cy="MeasurementSpecification1"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "800.0"
    );
    cy.get('[data-cy="+ Add Another"]').click();

    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "5"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("6");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "833.3"
    );

    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]')
      .clear()
      .type("177.4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "177.4"
    );
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.numerator"]').should(
      "have.value",
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.denominator"]').should(
      "have.value",
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.4.rate"]').should(
      "have.value",
      "800.0"
    );
  });

  it("Ensure that Total NDR set is auto calculated from the according age ranges - OMS", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.enterValidDateRange();

    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.9pQZSL.1.denominator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      "#OptionalMeasureStratification\\.selections\\.3dpUZu\\.options0-checkbox"
    ).check();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.numerator"]'
    ).type("6");
    //cy.get(":nth-child(2) > .css-0 > .css-1wlqfwj > .chakra-stack").click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.9pQZSL.Total.0.denominator"]'
    ).type("8");
    cy.get('[data-cy="Validate Measure"]').click();
  });
});
