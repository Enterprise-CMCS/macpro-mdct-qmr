describe("CCW-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CCWAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCW-AD");
    cy.checkA11yOfPage();
  });
});
