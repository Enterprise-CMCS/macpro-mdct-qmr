import { testingYear } from "../../../../support/constants";

describe("Measure: AIF-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("AIF-HH");
  });

  it("calculates correct rate totals for both PM and OMS", () => {
    cy.get("#MeasurementSpecification-CMS").click();

    // PM
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.0.value"]')
      .first()
      .type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.1.value"]')
      .first()
      .type("7");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.3.value"]')
      .first()
      .type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.5.value"]')
      .first()
      .type("1");

    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.2.value"]')
      .first()
      .should("have.value", "2333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.4.value"]')
      .first()
      .should("have.value", "333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.6.value"]')
      .first()
      .should("have.value", "333.3");

    // PM 1st Category Totals
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.0.value"]')
      .last()
      .should("have.value", "3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.1.value"]')
      .last()
      .should("have.value", "7");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.2.value"]')
      .last()
      .should("have.value", "2333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.3.value"]')
      .last()
      .should("have.value", "1");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.4.value"]')
      .last()
      .should("have.value", "333.3");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.5.value"]')
      .last()
      .should("have.value", "1");
    cy.get('[data-cy="PerformanceMeasure.rates.ZyxRR5.6.value"]')
      .last()
      .should("have.value", "333.3");

    // OMS
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.0.value"]'
    )
      .first()
      .clear()
      .type("3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.1.value"]'
    )
      .first()
      .clear()
      .type("7");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.3.value"]'
    )
      .first()
      .clear()
      .type("1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.5.value"]'
    )
      .first()
      .clear()
      .type("1");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.2.value"]'
    )
      .first()
      .should("have.value", "2333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.4.value"]'
    )
      .first()
      .should("have.value", "333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.6.value"]'
    )
      .first()
      .should("have.value", "333.3");

    // OMS 1st Category Totals
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.0.value"]'
    ).should("have.value", "3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.1.value"]'
    ).should("have.value", "7");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.2.value"]'
    ).should("have.value", "2333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.3.value"]'
    ).should("have.value", "1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.4.value"]'
    ).should("have.value", "333.3");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.5.value"]'
    ).should("have.value", "1");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.aifhh-rate.rates.ZyxRR5.Total.6.value"]'
    ).should("have.value", "333.3");
  });
});
