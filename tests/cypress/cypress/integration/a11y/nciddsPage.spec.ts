describe("NCIDDS-AD Page 508 Compliance Test", () => {
  it("Check a11y on NCIDDSAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("NCIDDS-AD");
    cy.checkA11yOfPage();
  });
});
