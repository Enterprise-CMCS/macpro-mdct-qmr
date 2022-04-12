describe("FUAD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on FUAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("FUA-AD");
    cy.checkA11yOfPage();
  });
});
