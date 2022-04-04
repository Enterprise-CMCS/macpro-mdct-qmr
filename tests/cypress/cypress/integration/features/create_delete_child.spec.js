describe("Child Core Sets Should be able to be deleted and created", () => {
  beforeEach(() => {
    cy.login();
  });

  it.skip("Creates separate child core-set", () => {
    cy.deleteChildCoreSets();
    cy.wait(5000);
    cy.get('[data-cy="Add Child Core Set"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
    cy.wait(5000);
  });

  it("Creates combined child core-set", () => {
    cy.deleteChildCoreSets();
    cy.wait(5000);
    cy.get('[data-cy="Add Child Core Set"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
    cy.wait(5000);
  });
});
