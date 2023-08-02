describe("CDF-CH Page 508 Compliance Test", () => {
  it("Check a11y on CDF-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CDF-CH");
    cy.checkA11yOfPage();
  });
});
