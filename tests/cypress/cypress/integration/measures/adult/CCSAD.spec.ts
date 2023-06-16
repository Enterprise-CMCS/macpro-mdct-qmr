describe("CCS-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCS-AD");
  });

  it("Click on validate measure button without filling out the form", function () {
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should(
      "have.text",
      "Performance Measure/Other Performance Measure Error"
    );
    cy.get(
      '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
    ).should(
      "have.text",
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  });
});
