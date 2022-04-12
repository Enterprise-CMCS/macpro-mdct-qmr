describe("CCS-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CCSAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCS-AD");
    cy.checkA11yOfPage();
  });
});
