import { testingYear } from "../../../support/constants";
describe("Child Core Sets Should be able to be deleted and created", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
  });

  it("Creates separate child core-set", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="add-childbutton"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
    cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
  });

  it("Creates combined child core-set", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="add-childbutton"]').click({ force: true }); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click({ force: true }); //clicking create
    cy.wait(3000);
    cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
  });
});
