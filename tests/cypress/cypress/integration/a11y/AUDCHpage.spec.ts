describe("AUD-CH Page 508 Compliance Test", () => {
  it("Check a11y on AUD-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AUD-CH");
    cy.checkA11yOfPage();
  });
});
