describe("CPA-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on CPAAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("CPA-AD");
    cy.checkA11yOfPage();
  });
});
