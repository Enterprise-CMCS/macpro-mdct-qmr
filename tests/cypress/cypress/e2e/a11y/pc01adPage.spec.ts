describe("PC01-AD Page 508 Compliance Test", () => {
  it("Check a11y on PC01AD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("PC01-AD");
    cy.checkA11yOfPage();
  });
});
