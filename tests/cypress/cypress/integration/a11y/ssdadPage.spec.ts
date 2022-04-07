describe("SSD-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on SSDAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("SSD-AD");
    cy.checkA11yOfPage();
  });
});
