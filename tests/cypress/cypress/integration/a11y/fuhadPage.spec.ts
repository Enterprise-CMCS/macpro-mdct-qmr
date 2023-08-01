describe("FUH-AD Page 508 Compliance Test", () => {
  it("Check a11y on FUHAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
    cy.checkA11yOfPage();
  });
});
