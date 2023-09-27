import { testingYear } from "../../../support/constants";

const createChildCoreSetByYear = (year) => {
  describe(`Child Core Sets Should be able to be deleted and created for ${year}`, () => {
    beforeEach(() => {
      cy.login();
      cy.selectYear(year);
    });

    it("Creates separate child core-set", () => {
      cy.deleteChildCoreSets();
      cy.get('[data-cy="add-childbutton"]').click(); // clicking on adding child core set measures
      cy.get("#ChildCoreSet-ReportType-separate").click(); //selecting combined core set
      cy.get('[data-cy="Create"]').click(); //clicking create
      cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
    });

    it("Creates combined child core-set", () => {
      cy.deleteChildCoreSets();
      cy.get('[data-cy="add-childbutton"]').click(); // clicking on adding child core set measures
      cy.get("#ChildCoreSet-ReportType-combined").click(); //selecting combined core set
      cy.get('[data-cy="Create"]').click(); //clicking create
      cy.wait(500);
      cy.get('[data-cy="add-childbutton"]').should("be.disabled"); // check button diabled if created
    });
  });
};

createChildCoreSetByYear(testingYear);
