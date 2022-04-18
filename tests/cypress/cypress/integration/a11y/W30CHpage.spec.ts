describe("W30-CH Page 508 Compliance Test", () => {
  it("Check a11y on W30-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("W30-CH");
    cy.checkA11yOfPage();
  });
});
