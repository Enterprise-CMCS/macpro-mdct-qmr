describe("AUD-CH Page 508 Compliance Test", () => {
  it("Check a11y on AUD-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AUD-CH");
    cy.checkA11yOfPage();
  });
});
