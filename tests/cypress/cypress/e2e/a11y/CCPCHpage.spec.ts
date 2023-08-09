describe("CCP-CH Page 508 Compliance Test", () => {
  it("Check a11y on CCP-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCP-CH");
    cy.checkA11yOfPage();
  });
});
