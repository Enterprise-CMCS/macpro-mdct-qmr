describe("SSD-AD Page 508 Compliance Test", () => {
  it("Check a11y on SSDAD Page", () => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("SSD-AD");
    cy.checkA11yOfPage();
  });
});
