describe("Adult Core Set Measures Questions Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on AMMAD Page", () => {
    cy.goToAdultMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.checkA11yOfPage();
  });
});
