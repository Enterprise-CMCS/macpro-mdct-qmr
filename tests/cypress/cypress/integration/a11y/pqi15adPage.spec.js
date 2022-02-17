describe("PQI15-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PQI15AD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI15-AD");
    cy.checkA11yOfPage();
  });
});
