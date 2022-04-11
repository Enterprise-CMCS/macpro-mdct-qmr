describe("Add Validation to Rate when user selects multiple Data Sources.", () => {
  beforeEach(() => {
    cy.login("stateuser2");
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
  it("Checks for race section for two sentence validation", () => {
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
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
  });
});
