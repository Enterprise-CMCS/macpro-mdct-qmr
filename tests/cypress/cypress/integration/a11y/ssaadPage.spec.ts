describe("SAA-AD Page 508 Compliance Test", () => {
  it("Check a11y on SAAAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("SAA-AD");
    cy.checkA11yOfPage();
  });
});
