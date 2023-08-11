import { testingYear } from "../../../../support/constants";

describe("Measure: CPA-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CPA-AD");
  });

  // Using custom tests for is/is not reporting because it is different

  it("Ensure correct sections display if user is not reporting", () => {
    cy.get('[data-cy="DidCollect1"]').click();

    // these sections should not exist when a user selects they are not reporting
    cy.get('[data-cy="Measurement Specification"]').should("not.exist");
    cy.get('[data-cy="Data Source"]').should("not.exist");
    cy.get('[data-cy="Date Range"]').should("not.exist");
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("not.exist");
    cy.get('[data-cy="Combined Rate(s) from Multiple Reporting Units"]').should(
      "not.exist"
    );

    // these sections should be visible when a user selects they are not reporting
    cy.get('[data-cy="Why did you not collect this measure"]').should(
      "be.visible"
    );
    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should("be.visible");
  });

  it("Ensure correct sections display if user is reporting", () => {
    cy.get('[data-cy="DidCollect0"]').click();

    // these sections should not exist when a user selects they are reporting
    cy.get('[data-cy="Why are you not reporting on this measure?"]').should(
      "not.exist"
    );

    // these sections should be visible when a user selects they are reporting
    cy.get('[data-cy="Measurement Specification"]').should("be.visible");
    cy.get('[data-cy="Data Source"]').should("be.visible");
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="Additional Notes/Comments on the measure (optional)"]'
    ).should("be.visible");
  });

  it("If not reporting and not why not -> show error", () => {});
  cy.showErrorIfNotReportingAndNotWhy;
});
