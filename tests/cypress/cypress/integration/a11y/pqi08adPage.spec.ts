describe("PQI08-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PQI08AD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI08-AD");
    cy.checkA11yOfPage();
  });
});
