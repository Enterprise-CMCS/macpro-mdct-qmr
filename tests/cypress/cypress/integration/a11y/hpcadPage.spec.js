describe("HPC-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on HPCAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("HPC-AD");
    cy.checkA11yOfPage();
  });
});
