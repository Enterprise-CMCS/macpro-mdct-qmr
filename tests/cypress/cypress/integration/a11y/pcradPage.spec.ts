describe("PCR-AD Page 508 Compliance Test", () => {
  it("Check a11y on PCRAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("PCR-AD");
    cy.checkA11yOfPage();
  });
});
