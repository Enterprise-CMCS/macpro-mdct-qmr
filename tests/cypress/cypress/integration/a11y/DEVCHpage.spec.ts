describe("DEV-CH Page 508 Compliance Test", () => {
  it("Check a11y on DEV-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("DEV-CH");
    cy.checkA11yOfPage();
  });
});
