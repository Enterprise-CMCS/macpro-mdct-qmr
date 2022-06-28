describe("OY2 15211 Reporting in FY22 Tag for Alt Data Sources", () => {
  beforeEach(() => {
    cy.login("stateuser2");
  });

  it("N/A And Completed Statuses", () => {
    cy.get("a > [data-cy='ACS']").click();
    cy.get("[data-cy='Reporting FFY 2021-NCIDDS-AD'] > p").should(
      "have.text",
      "N/A"
    );
    cy.get(
      "[data-cy='Status-NCIDDS-AD'] > div > div:last-child > p:first-child"
    ).should("have.text", "complete");
  });
});
