describe.skip("LRCD-CH Page 508 Compliance Test", () => {
  it("Check a11y on LRCD-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("LRCD-CH");
    cy.checkA11yOfPage();
  });
});
