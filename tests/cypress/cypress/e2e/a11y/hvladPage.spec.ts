describe("HVL-AD Page 508 Compliance Test", () => {
  it("Check a11y on HVLAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("HVL-AD");
    cy.checkA11yOfPage();
  });
});
