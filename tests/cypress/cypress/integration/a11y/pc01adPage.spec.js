describe("PC01-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PC01AD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PC01-AD");
    cy.checkA11yOfPage();
  });
});
