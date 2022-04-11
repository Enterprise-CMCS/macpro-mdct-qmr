describe("FUH-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on FUHAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
    cy.checkA11yOfPage();
  });
});
