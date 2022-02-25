describe("MSC-AD Page 508 Compliance Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Check a11y on MSCAD Page", () => {
    cy.goToAdultMeasures();
    cy.goToMeasure("MSC-AD");
    cy.checkA11yOfPage();
  });
});
