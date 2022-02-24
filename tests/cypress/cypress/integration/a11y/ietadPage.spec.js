describe("IETAD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on IETAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("IET-AD");
    cy.checkA11yOfPage();
  });
});
