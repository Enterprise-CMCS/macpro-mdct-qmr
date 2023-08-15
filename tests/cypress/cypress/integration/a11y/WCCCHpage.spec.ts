describe("WCC-CH Page 508 Compliance Test", () => {
  it("Check a11y on WCC-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("WCC-CH");
    cy.checkA11yOfPage();
  });
});
