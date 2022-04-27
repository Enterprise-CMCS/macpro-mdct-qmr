describe("Date Range Adjustment for Start/End date", () => {
  beforeEach(() => {
    cy.login("stateuser1");
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Reset All Measures"]').click();
    cy.wait(1000);
  });

  afterEach(() => {
    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Reset All Measures"]').click();
  });

  it("should allow completion", () => {
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress1 of 32 complete"
    );

    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Complete All Measures"]').click();
    cy.wait(4000);

    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "complete32 of 32 complete"
    );
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="undefined-MA2021ACS"]').should(
      "contain.text",
      "Submitted"
    );
  });

  it("should allow completion inside the core set measure selection", () => {
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "in progress1 of 32 complete"
    );

    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Complete All Measures"]').click();
    cy.wait(4000);

    cy.get('[data-cy="Status-MA2021ACS"]').should(
      "contain.text",
      "complete32 of 32 complete"
    );
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    cy.goToAdultMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );

    cy.visit("/");
    cy.get('[data-cy="undefined-MA2021ACS"]').should(
      "contain.text",
      "Submitted"
    );
  });
});
