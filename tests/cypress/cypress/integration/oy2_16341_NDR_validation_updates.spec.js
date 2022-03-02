const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16341 NDR set validation updates for all measures ", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });
  it("Click on NO for the first question then click on validate and complete button", () => {
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.css-4ma18r:nth-child(1) div.css-1gy6ge8 div.chakra-container.css-1vsk1kk div.css-1ibkps6 > a:nth-child(4)"
    ).click();
    cy.get(".chakra-heading").should("have.text", "FAQ");
  });
});
