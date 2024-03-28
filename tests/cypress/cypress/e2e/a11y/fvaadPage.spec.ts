describe("FVA-AD Page 508 Compliance Test", () => {
  it("Check a11y on FVAAD Page", () => {
    cy.login();
    cy.selectYear("2023");
    cy.goToAdultMeasures();
    cy.goToMeasure("FVA-AD");
    cy.checkA11yOfPage();
  });
});
