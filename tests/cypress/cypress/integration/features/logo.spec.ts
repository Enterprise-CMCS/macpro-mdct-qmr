describe("Verify logos", () => {
  beforeEach(() => {
    cy.login("stateuser2");
  });

  it("Logos should be present on state home", () => {
    cy.get('[data-testid="qmr-logo"] > img').should("be.visible");
    cy.get('[src="/footer/mdct.png"]').should("be.visible");
    cy.get('[src="/footer/logo-MedicaidGov.svg"]').should("be.visible");
  });

  it("Logos should be present on measures list page", () => {
    cy.goToAdultMeasures();
    cy.get('[data-testid="qmr-logo"] > img').should("be.visible");
    cy.get('[src="/footer/mdct.png"]').should("be.visible");
    cy.get('[src="/footer/logo-MedicaidGov.svg"]').should("be.visible");
  });
});
