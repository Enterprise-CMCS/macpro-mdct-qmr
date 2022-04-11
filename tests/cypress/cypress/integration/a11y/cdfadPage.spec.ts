describe("CDF-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CDFAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
    cy.checkA11yOfPage();
  });
});
