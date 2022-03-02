const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16342 Add Validation to Rate when user selects multiple Data Sources.", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("Checks for one sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="Enter a number for the numerator and the denominator"]'
    ).should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
    );
  });
  it("Checks for two sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="Enter a number for the numerator and the denominator"]'
    ).should(
      "have.text",
      "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
    );
  });
  it("Checks for race sectoion for two sentence validation", () => {
    cy.get("#MeasurementSpecification-OPA").click({ force: true });
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.Mosteffectiveormoderatelyeffectivemethodofcontraception.0.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="CategoriesReported0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="NonHispanicRacialCategories0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
  });
});
