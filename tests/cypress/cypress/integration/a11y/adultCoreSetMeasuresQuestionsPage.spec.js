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
//Child Core Set Questions Does Not Have a test. Please make the same modifications to that page when making modifications to this page.
