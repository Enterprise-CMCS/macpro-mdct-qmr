describe("FUH-CH Page 508 Compliance Test", () => {
  it("Check a11y on FUH-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("FUH-CH");
    cy.checkA11yOfPage();
  });
});
