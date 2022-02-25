describe("FUM-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on FUMAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FUM-AD");
    cy.checkA11yOfPage();
  });
});
