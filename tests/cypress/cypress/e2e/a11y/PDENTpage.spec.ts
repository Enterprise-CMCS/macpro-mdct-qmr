describe.skip("PDENT-CH Page 508 Compliance Test", () => {
  it("Check a11y on PDENT-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("PDENT-CH");
    cy.checkA11yOfPage();
  });
});
