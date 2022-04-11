describe("Measure: HPCMI-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("HPCMI-AD");
  });

  it("displays the correct sections if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    'displays a warning if "not reporting" selected with no reason provided',
    cy.showErrorIfNotReportingAndNotWhy
  );
});
