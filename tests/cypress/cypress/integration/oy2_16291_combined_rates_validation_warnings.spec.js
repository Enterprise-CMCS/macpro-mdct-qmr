const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16297 Combined rates validation testing", () => {
    beforeEach(() => {
      // Seed database with test data
      cy.visit("/");
      cy.xpath(emailForCognito).type("stateuser2@test.com");
      cy.xpath(passwordForCognito).type("p@55W0rd!");
      cy.get('[data-cy="login-with-cognito-button"]').click();
    });
});