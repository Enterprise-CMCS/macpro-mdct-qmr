describe("HPC-AD Page 508 Compliance Test", () => {
  it("Check a11y on HPCAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("HPC-AD");
    cy.checkA11yOfPage();
  });
});
