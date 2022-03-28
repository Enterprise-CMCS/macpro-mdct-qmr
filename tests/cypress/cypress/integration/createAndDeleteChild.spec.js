describe("OY2 16265 Validation text needs to appear in CH/AD qualifiers", () => {
  before(() => {
    cy.login();
  });

  it("Creates separate child core-set", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
    cy.wait(2000);
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
  });
});
