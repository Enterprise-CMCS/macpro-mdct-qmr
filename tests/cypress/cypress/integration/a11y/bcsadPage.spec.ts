describe("BCS-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on BCSAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("BCS-AD");
    cy.checkA11yOfPage();
  });
});
