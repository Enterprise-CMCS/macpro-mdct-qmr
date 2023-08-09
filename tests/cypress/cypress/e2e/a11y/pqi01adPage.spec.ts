describe("PQI01-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI01AD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.checkA11yOfPage();
  });
});
