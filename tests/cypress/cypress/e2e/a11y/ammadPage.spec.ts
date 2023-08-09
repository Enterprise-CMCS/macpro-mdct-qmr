describe("AMM-AD Page 508 Compliance Test", () => {
  it("Check a11y on AMMAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("AMM-AD");
    cy.checkA11yOfPage();
  });
});
