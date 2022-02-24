describe("Child Core Set Measure 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on Child Core Set Measures Page", () => {
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.checkA11yOfPage();
  });
});
