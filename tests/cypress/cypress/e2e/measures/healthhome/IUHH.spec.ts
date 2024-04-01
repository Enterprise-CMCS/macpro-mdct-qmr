import { testingYear } from "../../../../support/constants";

describe("Measure: IU-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("IU-HH");
  });

  it("calculates correct rate totals for both PM and OMS", () => {
    cy.get("#MeasurementSpecification-CMS").click();

    // PM
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.0.value"]')
      .first()
      .type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.1.value"]')
      .first()
      .type("7");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.3.value"]')
      .first()
      .type("1");

    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.2.value"]')
      .first()
      .should("have.value", "2333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.4.value"]')
      .first()
      .should("have.value", "333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.5.value"]')
      .first()
      .should("have.value", "0.1");

    // PM 1st Category Totals
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.0.value"]')
      .last()
      .should("have.value", "3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.1.value"]')
      .last()
      .should("have.value", "7");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.2.value"]')
      .last()
      .should("have.value", "2333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.3.value"]')
      .last()
      .should("have.value", "1");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.4.value"]')
      .last()
      .should("have.value", "333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.895Rzk.5.value"]')
      .last()
      .should("have.value", "0.1");

    // OMS
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.0.value"]'
    )
      .first()
      .type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.1.value"]'
    )
      .first()
      .type("7");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.3.value"]'
    )
      .first()
      .type("1");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.2.value"]'
    )
      .first()
      .should("have.value", "2333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.4.value"]'
    )
      .first()
      .should("have.value", "333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.5.value"]'
    )
      .first()
      .should("have.value", "0.1");

    // OMS 1st Category Totals
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.0.value"]'
    ).should("have.value", "3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.1.value"]'
    ).should("have.value", "7");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.2.value"]'
    ).should("have.value", "2333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.3.value"]'
    ).should("have.value", "1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.4.value"]'
    ).should("have.value", "333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.iuhh-rate.rates.895Rzk.Total.5.value"]'
    ).should("have.value", "0.1");

    // validation errors
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="You must select at least one Data Source option"]'
    ).should("exist");
    cy.get('[data-cy="Date Range Error"]').should("exist");
  });
});
