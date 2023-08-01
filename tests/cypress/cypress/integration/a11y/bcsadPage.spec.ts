describe("BCS-AD Page 508 Compliance Test", () => {
  it("Check a11y on BCSAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("BCS-AD");
    cy.checkA11yOfPage();
  });
});
