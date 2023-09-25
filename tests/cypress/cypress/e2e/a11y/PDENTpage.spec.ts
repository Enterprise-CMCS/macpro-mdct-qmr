describe("PDENT-CH Page 508 Compliance Test", () => {
  it("Check a11y on PDENT-CH Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.get(`[data-cy="PDENT-CH"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
