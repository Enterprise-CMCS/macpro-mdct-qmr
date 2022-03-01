describe("COB-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on COBAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("COB-AD");
    cy.checkA11yOfPage();
  });
});
