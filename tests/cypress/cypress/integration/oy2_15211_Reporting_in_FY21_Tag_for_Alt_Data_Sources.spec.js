const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 15211 Reporting in FY21 Tag for Alt Data Sources", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("N/A And Completed Statuses", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > [data-cy='ACS']").click();
    cy.get("[data-cy='Reporting FFY 2021-NCIDDS-AD'] > p").should(
      "have.text",
      "N/A"
    );
    cy.get(
      "[data-cy='Status-NCIDDS-AD'] > div > div:last-child > p:first-child"
    ).should("have.text", "complete");
    /* ==== End Cypress Studio ==== */
  });
});
