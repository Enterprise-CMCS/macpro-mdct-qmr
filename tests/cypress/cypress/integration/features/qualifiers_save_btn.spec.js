describe("Save Button exists in AD/CD Qualifiers", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check Adult core set question", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get('[data-cy="Save"]').should("be.enabled");
  });
  it("Check Child combined core set question", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true });
    cy.get('[data-cy="Create"]').click();
    cy.get('[data-cy="CCS"]').click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get('[data-cy="Save"]').should("be.enabled");
  });
  it("Check Child seperated CHIP core set question", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true });
    cy.get('[data-cy="Create"]').click();
    cy.get('[data-cy="CCSC"]').click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get('[data-cy="Save"]').should("be.enabled");
  });
  it("Check Child seperated medicair core set question", () => {
    cy.deleteChildCoreSets();
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true });
    cy.get('[data-cy="Create"]').click();
    cy.get('[data-cy="CCSM"]').click();
    cy.get(".css-1hszhjx > :nth-child(1)").click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get('[data-cy="Save"]').should("be.enabled");
  });
});
