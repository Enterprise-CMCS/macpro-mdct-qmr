describe("NCIDDS-AD Page 508 Compliance Test", () => {
  it("Check a11y on NCIDDSAD Page", () => {
    cy.login();
    cy.selectYear("2023");
    cy.goToAdultMeasures();
    cy.get(`[data-cy="NCIDDS-AD"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
