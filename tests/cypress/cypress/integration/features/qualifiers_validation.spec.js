describe("Validation text needs to appear in CH/AD qualifiers", () => {
  beforeEach(() => {
    cy.login("stateuser2");
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
