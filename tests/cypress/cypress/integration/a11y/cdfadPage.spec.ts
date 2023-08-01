describe("CDF-AD Page 508 Compliance Test", () => {
  it("Check a11y on CDFAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
    cy.checkA11yOfPage();
  });
});
