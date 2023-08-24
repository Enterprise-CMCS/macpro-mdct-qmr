import { testingYear } from "../../../support/constants";

describe.skip("Add state specific measure testing", () => {
  before(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.deleteHealthHomeSets();
    cy.get('[data-cy="add-hhbutton"]').click(); // clicking on adding child core set measures
    cy.get('[data-cy="HealthHomeCoreSet-SPA"]').select(1); // select first available SPA
    cy.get('[data-cy="Create"]').click(); //clicking create
    cy.wait(200);
    cy.goToHealthHomeSetMeasures();
  });

  it("should be able to create a new measure", () => {
    cy.get(`[data-cy="add-ssm-button"]`).should("be.visible").click();

    //Type into first measure to add
    cy.get(`[data-cy="add-ssm.0.description"]`)
      .should("be.visible")
      .type("test1");
    cy.get(`[data-cy="add-ssm.0.detailedDescription"]`)
      .should("be.visible")
      .type("test description");

    // Add Another
    cy.get(`[data-cy="AddAnotherSSMButton"]`).should("be.visible").click();

    // Type into second measure to add
    cy.get(`[data-cy="add-ssm.1.description"]`)
      .should("be.visible")
      .type("test2");
    cy.get(`[data-cy="add-ssm.1.detailedDescription"]`)
      .should("be.visible")
      .type("test description 2");
    cy.get('[data-cy="Create"]').click();

    cy.wait(200);
    cy.get(`[data-cy="New State Specific Measures created"]`).should(
      "be.visible"
    );
  });

  it("state specific measures should have been created with the correct text", () => {
    cy.get(`[data-cy="/CT/2023/HHCS_15-014/SS-1-HH"]`).should(
      "include.text",
      "test1"
    );

    cy.get(`[data-cy="/CT/2023/HHCS_15-014/SS-2-HH"]`).should(
      "include.text",
      "test2"
    );
  });
});
