import { testingYear } from "../../../support/constants";

describe("Measure: AMR-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
  });

  it("should show correct data source options", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("Print Functionality - check that Print button is enabled", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.HRsQ7F.0.denominator"]').type(
      "6"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get('[data-cy="Print"]').should("be.enabled");
    //cy.get('[data-cy="Print"]').click();
  });
});
