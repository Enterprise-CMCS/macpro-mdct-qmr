describe("CBP-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CBPAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CBP-AD");
    cy.checkA11yOfPage();
  });
});
