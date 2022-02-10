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
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(22) > :nth-child(3) > .chakra-text").should(
      "have.text",
      "N/A"
    );
    cy.get(".css-1utstxm > .css-dw5ttn > .css-sv7ztq").should(
      "have.text",
      "completecomplete"
    );
    /* ==== End Cypress Studio ==== */
  });
});
