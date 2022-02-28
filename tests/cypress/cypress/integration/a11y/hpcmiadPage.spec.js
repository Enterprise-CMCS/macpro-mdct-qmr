describe("HPCMI-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on HPCMIAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("HPCMI-AD");
    cy.checkA11yOfPage();
  });
});
