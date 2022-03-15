describe("Measure: OHD-AD", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("OHD-AD");
  });

  it("opens measure", () => {});
});
