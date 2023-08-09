describe("HPCMI-AD Page 508 Compliance Test", () => {
  it("Check a11y on HPCMIAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("HPCMI-AD");
    cy.checkA11yOfPage();
  });
});
