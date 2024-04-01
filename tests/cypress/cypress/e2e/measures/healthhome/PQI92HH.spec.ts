import { testingYear } from "../../../../support/constants";

describe("Measure: PQI92-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.goToMeasure("PQI92-HH");
  });

  it("calculates correct rate Total for both PM and OMS", () => {
    // OMS
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.options0"]'
    ).click();

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.denominator"]'
    ).type("3");

    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.3dpUZu.selections.ll9YP8.rateData.rates.mIBZOk.Total.0.rate"]'
    ).should("have.value", "133333.3");
  });
});
