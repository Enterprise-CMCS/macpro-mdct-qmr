describe("PPC-CH Page 508 Compliance Test", () => {
  it("Check a11y on PPC-CH Page", () => {
    cy.login();
    cy.selectYear("2023");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("PPC-CH");
    cy.checkA11yOfPage();
  });
});
