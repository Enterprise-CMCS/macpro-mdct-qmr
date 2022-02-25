describe("AMM-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on AMMAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("AMM-AD");
    cy.checkA11yOfPage();
  });
});
