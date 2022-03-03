const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16411 Restructuring Data Source Text boxes", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Verify that user is able to click State-Level Rate Brief and PDF opens in a new tab", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.wait(2000);
    cy.xpath("//button[contains(text(),'Clear Data')]").click();
    cy.wait(2000);
    cy.get('[data-cy="CCP-AD"]').click();
    cy.get('[data-cy="Combined Rate(s) from Multiple Reporting Units"]').should(
      "have.text",
      "Combined Rate(s) from Multiple Reporting Units"
    );
    cy.get(".css-bxak8j").should(
      "have.text",
      "For additional information refer to the State-Level Rate Brief."
    );
    cy.get(".css-bxak8j > .chakra-link").click();
  });
});
