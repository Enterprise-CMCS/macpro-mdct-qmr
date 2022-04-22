describe("CCS-AD Page 508 Compliance Test", () => {
  it("Check a11y on CCSAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCS-AD");
    cy.checkA11yOfPage();
  });
});
