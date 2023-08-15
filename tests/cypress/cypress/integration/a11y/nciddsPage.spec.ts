describe.skip("NCIDDS-AD Page 508 Compliance Test", () => {
  it("Check a11y on NCIDDSAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("NCIDDS-AD");
    cy.checkA11yOfPage();
  });
});
