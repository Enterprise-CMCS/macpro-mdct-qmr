describe("NCIDDS-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on NCIDDSAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("NCIDDS-AD");
    cy.checkA11yOfPage();
  });
});
