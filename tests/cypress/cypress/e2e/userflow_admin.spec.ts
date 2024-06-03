// workflow to test: user goes through basic expected functionality as an admin

describe(`Test banner`, () => {
  beforeEach(() => {
    cy.login("adminuser");
  });

  it("create + transmit banner", () => {
    cy.get('[data-cy="Banner Editor"]').click();
    cy.get('[data-cy="New banner title"]').type("test banner title");
    cy.get('[data-cy="New banner description"]').type(
      "test banner description"
    );
    cy.get('[data-cy="New banner start date"]').type("01/01/2024");
    cy.get('[data-cy="New banner end date"]').type("01/01/2025");
    cy.get('[data-cy="replace current banner button"]').click();
    cy.get('[data-cy="banner status"]').should("contain.text", "Active");
  });
});
