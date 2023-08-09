describe("CCP-AD Page 508 Compliance Test", () => {
  it("Check a11y on CCPAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
    cy.checkA11yOfPage();
  });
});
