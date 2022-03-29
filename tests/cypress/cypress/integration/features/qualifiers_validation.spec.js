describe("OY2 16265 Validation text needs to appear in CH/AD qualifiers", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.login();
  });

  it("validation child core set questions Medicaid required and CHIP are not required", () => {
    cy.goToChildCoreSetMeasures();
    cy.get("[data-cy=core-set-qualifiers-link]").click();

    cy.get("[data-cy=validate-core-set-questions-button]").click();
    cy.get(
      '[data-cy="Entries are required in at least one column.  Entries are permitted in the second column but are not required"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Entries are required in at least one column.  Entries are permitted in the second column but are not required"]'
    ).should(
      "have.text",
      "Entries are required in at least one column.  Entries are permitted in the second column but are not required"
    );
  });
});
