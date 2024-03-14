import { testingYear } from "../../../../support/constants";

describe("OY2 9898 FVA-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2023");
    cy.goToAdultMeasures();
    cy.goToMeasure("FVA-AD");
  });

  it("displays correct sections if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("displays the correct selections under Data Source", () => {
    cy.get("#DataSource-CAHPS\\ 5\\.1H").should("have.text", "CAHPS 5.1H");
    cy.get("#DataSource-Other").should("have.text", "Other");
  });

  it("allows a user to manually override rate when CAHPS 5.1H is selected", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').should(
      "have.value",
      "50.0"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').type("10.5");
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').should(
      "have.value",
      "10.5"
    );
  });

  it("auto-calculates rate to one decimal", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').should(
      "have.value",
      "33.3"
    );
  });

  it("rounds the numerical value after the decimal up/down for auto-calculated rates", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.denominator"]').type(
      "3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').should(
      "have.value",
      "33.3"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.5bDNK0.0.rate"]').should(
      "have.value",
      "66.7"
    );
  });
});
