describe("HVL-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on HVLAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("HVL-AD");
    cy.checkA11yOfPage();
  });
});
