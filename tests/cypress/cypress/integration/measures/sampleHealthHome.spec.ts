describe("Measure: HealthHome", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.goToHealthHomeSetMeasures();
    // whatever health home measure
    //   cy.goToMeasure("WCC-CH");
  });

  it("should go to HHCS page", () => {
    cy.get('[data-cy="core-set-qualifiers-link"]').should("exist");
  });
});
