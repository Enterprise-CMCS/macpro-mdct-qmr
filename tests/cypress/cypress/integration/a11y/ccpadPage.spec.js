describe("CCP-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CCPAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
    cy.checkA11yOfPage();
  });
});
