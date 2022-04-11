describe("FVA-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on FVAAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FVA-AD");
    cy.checkA11yOfPage();
  });
});
