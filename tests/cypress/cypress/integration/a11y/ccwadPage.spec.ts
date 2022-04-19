describe("CCW-AD Page 508 Compliance Test", () => {
  it("Check a11y on CCWAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("CCW-AD");
    cy.checkA11yOfPage();
  });
});
