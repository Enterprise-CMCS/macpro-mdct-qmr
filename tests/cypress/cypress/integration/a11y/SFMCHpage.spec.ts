describe("SFM-CH Page 508 Compliance Test", () => {
  it("Check a11y on SFM-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("SFM-CH");
    cy.checkA11yOfPage();
  });
});
