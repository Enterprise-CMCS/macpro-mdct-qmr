describe("PPC-AD Page 508 Compliance Test", () => {
  it("Check a11y on PPCAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("PPC-AD");
    cy.checkA11yOfPage();
  });
});
