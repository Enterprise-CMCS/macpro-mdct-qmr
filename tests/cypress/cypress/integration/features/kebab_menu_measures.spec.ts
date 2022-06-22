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

describe.only("Edit state specific measure name and description", () => {
  it('displays the "Edit" option', () => {
    cy.loginHealthHome();
    cy.goToHealthHomeSetMeasures();

    // Add HH core set
    cy.get('[data-cy="add-hhbutton"]').click();
    cy.get('[data-cy="HealthHomeCoreSet-SPA"]').select("18-0006");
    cy.get('[data-cy="Create"]').click();

    // Navigate to HH core set and create state specific measure
    cy.get('[data-cy="HHCS_18-0006"]').click();
    cy.get('[data-cy="add-ssm-button"]').click();
    cy.get('[data-cy="add-ssm.0.description"]').type("name");
    cy.get('[data-cy="add-ssm.0.detailedDescription"]').type(
      "measure description"
    );
    cy.get('[data-cy="Create"]').click();

    // Verify original title on core set page
    cy.get('[data-cy="/DC/2021/HHCS_18-0006/SS-1-HH"]').should(
      "have.text",
      "name"
    );

    // Verify original description on SSM page
    cy.get('[data-cy="/DC/2021/HHCS_18-0006/SS-1-HH"]').click();
    cy.get('[data-cy="detailed-description"').should(
      "have.text",
      "measure description"
    );

    // Navigate back to core set
    cy.visit("/");
    cy.get('[data-cy="HHCS_18-0006"]').click();

    // Ensure kebab has "Edit" button
    cy.get('[data-cy="Measure Actions-SS-1-HH"]').click();
    cy.get('[data-cy="Edit"]').should("have.text", "Edit");

    // Edit title
    cy.get('[data-cy="Edit"]').click();
    cy.get('[data-cy="update-ssm.description"]').clear();
    cy.get('[data-cy="update-ssm.description"]').type("edited name");

    // Edit description
    cy.get('[data-cy="update-ssm.detailedDescription"]').clear();
    cy.get('[data-cy="update-ssm.detailedDescription"]').type(
      "edited description"
    );

    cy.get('[data-cy="update-measure-yes"').click();
    cy.get('[data-cy="/DC/2021/HHCS_18-0006/SS-1-HH"]').should(
      "have.text",
      "edited name"
    );
    cy.get('[data-cy="/DC/2021/HHCS_18-0006/SS-1-HH"]').click();
    cy.get('[data-cy="detailed-description"').should(
      "have.text",
      "edited description"
    );

    // Clean up
    cy.visit("/");
    cy.get('[data-cy="health home-kebab-menu"]').click();
    cy.get('[data-cy="Delete"]').click();
    cy.get('[data-cy="delete-table-item-input"]').type("delete");
    cy.get('[data-cy="delete-table-item-button"]').click();
  });
});
