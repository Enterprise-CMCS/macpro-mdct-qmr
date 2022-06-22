describe("Measure kebab menus", () => {
  beforeEach(() => {
    cy.login("stateuser2");
  });

  it('displays "View" option', () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="Measure Actions-AMM-AD"]').click();
    cy.get('#menu-list-11 > [data-cy="View"]').should("have.text", "View");

    cy.get('[data-cy="Measure Actions-AMR-AD"]').click();
    cy.get('#menu-list-11 > [data-cy="View"]').should("have.text", "View");

    cy.get('[data-cy="Measure Actions-PCR-AD"]').click();
    cy.get('#menu-list-11 > [data-cy="View"]').should("have.text", "View");
  });

  it('navigates to the measure page when "View" is selected', () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="Measure Actions-AMM-AD"]').click();
    cy.get('#menu-list-11 > [data-cy="View"]').click();
    cy.get('[data-cy="state-layout-container"').should(
      "include.text",
      "AMM-AD - Antidepressant Medication Management"
    );
  });
});
