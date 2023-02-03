describe.skip("LBW-CH Page 508 Compliance Test", () => {
  it("Check a11y on LBW-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("LBW-CH");
    cy.checkA11yOfPage();
  });
});
