describe("Date Range Adjustment for Start/End date", () => {
  it.only("should contain expected text", () => {});

  it("should allow completion", () => {
    cy.login("stateuser2");
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
    cy.get('[data-cy="Status-AL2021ACS"]').should(
      "contain.text",
      "In Progress"
    );

    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Complete All Measures"]').click();
    cy.wait("2500");

    cy.get('[data-cy="Status-AL2021ACS"]').should("contain.text", "Complete");
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="undefined-AL2021ACS"]').should(
      "contain.text",
      "Submitted"
    );
  });

  it("should allow completion inside the core set measure selection", () => {
    cy.login("stateuser1");
    cy.get('[data-cy="Submit Core Set"]').should("be.disabled");
    cy.get('[data-cy="Status-AL2021ACS"]').should(
      "contain.text",
      "In Progress"
    );

    cy.get('[data-cy="adult-kebab-menu"]').click();
    cy.get('[data-cy="Complete All Measures"]').click();
    cy.wait("2500");

    cy.get('[data-cy="Status-AL2021ACS"]').should("contain.text", "Complete");
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled");

    cy.goToAdultMeasures();
    cy.get('[data-cy="Submit Core Set"]').should("be.enabled").click();
    cy.get('[data-cy="SubmitCoreSetButtonWrapper"]').should(
      "contain.text",
      "Submitted"
    );

    cy.visit("/");
    cy.get('[data-cy="undefined-AL2021ACS"]').should(
      "contain.text",
      "Submitted"
    );
  });
});
