describe("OY2 16411 Restructuring Data Source Text boxes", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("Verify that user is able to click State-Level Rate Brief and PDF opens in a new tab", () => {
    cy.get('[data-cy="Combined Rate(s) from Multiple Reporting Units"]').should(
      "have.text",
      "Combined Rate(s) from Multiple Reporting Units"
    );
    cy.get(".css-bxak8j").should(
      "have.text",
      "For additional information refer to the State-Level Rate Brief."
    );
  });
});
