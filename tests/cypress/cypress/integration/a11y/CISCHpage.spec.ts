describe("CIS-CH Page 508 Compliance Test", () => {
  it("Check a11y on CIS-CH Page", () => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CIS-CH");
    cy.checkA11yOfPage();
  });
});
