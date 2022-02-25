describe("OUD-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on OUDAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("OUD-AD");
    cy.checkA11yOfPage();
  });
});
