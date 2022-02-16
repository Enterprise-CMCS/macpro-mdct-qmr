const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("Adult Qualifiers", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Check Auto Calculation with Administrative Data", () => {
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(13) > :nth-child(1) > a > .chakra-text").click();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.attr",
      "aria-readonly",
      "true"
    );
  });
  it("Check Auto Calculation with Other", () => {
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(13) > :nth-child(1) > a > .chakra-text").click();
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get(":nth-child(8) > .css-1bpnzr3").click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
    cy.get(":nth-child(8) > .css-1bpnzr3").click();
  });
  it("Check Auto Calculation with Administrative Data and Other", () => {
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(13) > :nth-child(1) > a > .chakra-text").click();
    cy.get("#MeasurementSpecification-Other").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]'
    ).clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "1"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("2");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').clear();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').type(
      "60"
    );
    cy.get(":nth-child(8) > .css-1bpnzr3 > .css-0").click();
  });
});
