import { testingYear } from "../../../support/constants";

describe("Measure kebab menus", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
  });

  it('displays "View" option', () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="Measure Actions-AMM-AD"]').click();
    cy.get('button[aria-label="View for AMM-AD"]').should("have.text", "View");

    cy.get('[data-cy="Measure Actions-AMR-AD"]').click();
    cy.get('button[aria-label="View for AMR-AD"]').should("have.text", "View");

    cy.get('[data-cy="Measure Actions-PCR-AD"]').click();
    cy.get('button[aria-label="View for PCR-AD"]').should("have.text", "View");
  });

  it('navigates to the measure page when "View" is selected', () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="Measure Actions-AMM-AD"]').click();
    cy.get('button[aria-label="View for AMM-AD"]').click();
    cy.get('[data-cy="state-layout-container"').should(
      "include.text",
      "FFY 2023AMM-AD - Antidepressant Medication Management"
    );
  });
});
