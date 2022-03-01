describe("OHD-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on OHDAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("OHD-AD");
    cy.checkA11yOfPage();
  });
});
