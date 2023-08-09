describe("CPC-CH Page 508 Compliance Test", () => {
  it("Check a11y on CPC-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CPC-CH");
    cy.checkA11yOfPage();
  });
});
