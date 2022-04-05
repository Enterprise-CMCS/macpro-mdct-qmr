describe("NCIDDS-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("NCIDDS-AD");
  });

  it("Check a11y on NCIDDSAD Page", () => {
    cy.checkA11yOfPage();
  });
});
