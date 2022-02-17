describe("AMR-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on AMRAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
    cy.checkA11yOfPage();
  });
});
