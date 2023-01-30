describe("AMR-CH Page 508 Compliance Test", () => {
  it("Check a11y on AMR-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AMR-CH");
    cy.checkA11yOfPage();
  });
});
