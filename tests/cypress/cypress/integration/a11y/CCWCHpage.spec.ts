describe("CCW-CH Page 508 Compliance Test", () => {
  it("Check a11y on CCW-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCW-CH");
    cy.checkA11yOfPage();
  });
});
