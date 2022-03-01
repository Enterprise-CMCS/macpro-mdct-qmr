describe("PQI05-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PQI05AD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI05-AD");
    cy.checkA11yOfPage();
  });
});
