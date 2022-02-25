describe("SAA-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on SAAAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("SAA-AD");
    cy.checkA11yOfPage();
  });
});
