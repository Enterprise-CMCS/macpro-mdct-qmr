describe("Confirm Admin View", () => {
  it("Admin should be able to view but not edit/update measure", () => {
    cy.visit("/");
    cy.xpath("//input[@name='email']").type("adminuser@test.com");
    cy.xpath("//input[@name='password']").type(Cypress.env("TEST_PASSWORD_1"));
    cy.get('[data-cy="login-with-cognito-button"]').click();
    cy.get('[data-cy="Go To State Home"]').click();
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="HPC-AD"]').click();
    cy.get('[data-cy="Save"]').should("be.disabled");
    cy.get('[data-cy="Validate Measure"]').should("not.be.visible");
    cy.get('[data-cy="Complete Measure"]').should("not.be.visible");
  });
});
