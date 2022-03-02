describe("CHL-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CHLAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CHL-AD");
    cy.checkA11yOfPage();
  });
});
