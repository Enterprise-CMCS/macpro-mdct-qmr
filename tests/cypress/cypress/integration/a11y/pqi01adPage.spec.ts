describe("PQI01-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PQI01AD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.checkA11yOfPage();
  });
});
