describe("AMR-AD Page 508 Compliance Test", () => {
  it("Check a11y on AMRAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
    cy.checkA11yOfPage();
  });
});
