describe("PQI08-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI08AD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI08-AD");
    cy.checkA11yOfPage();
  });
});
