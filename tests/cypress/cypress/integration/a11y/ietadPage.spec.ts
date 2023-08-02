describe("IETAD Page 508 Compliance Test", () => {
  it("Check a11y on IETAD Page", () => {
    cy.login();
    cy.selectYear("2021");
    cy.goToAdultMeasures();
    cy.goToMeasure("IET-AD");
    cy.checkA11yOfPage();
  });
});
