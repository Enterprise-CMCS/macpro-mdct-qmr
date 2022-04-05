describe("Measure: CPA-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CPA-AD");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    // cy.displaysSectionsWhenUserNotReporting();
    // cy.displaysSectionsWhenUserIsReporting();
  });

  it("If not reporting and not why not -> show error", () => {});
  // cy.showErrorIfNotReportingAndNotWhy
});
