describe("PCR-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on PCRAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("PCR-AD");
    cy.checkA11yOfPage();
  });
});
