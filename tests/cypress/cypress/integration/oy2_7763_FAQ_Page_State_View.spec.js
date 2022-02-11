const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 7763 FAQ Page State View ", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });
  it("Verify FAQ Page Exists", () => {
    cy.get('[href="/faq"] > svg > path').click();
    cy.get(".chakra-heading").should("have.text", "FAQ");
  });
});
