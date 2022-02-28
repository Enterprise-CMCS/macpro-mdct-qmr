const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16342 Add Validation to Rate when user selects multiple Data Sources.", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Checks for one sentence validation", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(".css-722v25").should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
    );
  });
  it("Checks for two sentence validation", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(".chakra-container > :nth-child(8) > .chakra-heading").should(
      "have.text",
      "Please review the auto-calculated rate and revise if needed."
    );
    cy.get(".css-722v25").should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
    );
  });
  it("Checks for race sectoion for two sentence validation", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-effectiveContraception.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-effectiveContraception.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-effectiveContraception.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-effectiveContraception.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="CategoriesReported0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="NonHispanicRacialCategories0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(".css-1sdxj22").should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
    );
    cy.get(".css-1s0avy2").should(
      "have.text",
      "Please review the auto-calculated rate and revise if needed."
    );
  });
});
