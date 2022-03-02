describe("PPC-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PPCAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PPC-AD");
    cy.checkA11yOfPage();
  });
});
