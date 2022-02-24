const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2-16228 Date Range Adjustment for Start/End date", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });
  it("Check if start and end date can be the same", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=CCP-AD]").click();
    cy.wait(2000);
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("1");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2020");
    cy.xpath('(//input[@label="Month"])[2]').clear();
    cy.xpath('(//input[@label="Month"])[2]').type("1");
    cy.xpath('(//input[@label="Year"])[2]').clear();
    cy.xpath('(//input[@label="Year"])[2]').type("2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Not allow start date late than end date", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=CCP-AD]").click();
    cy.wait(2000);
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("1");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2021");
    cy.xpath('(//input[@label="Month"])[2]').clear();
    cy.xpath('(//input[@label="Month"])[2]').type("1");
    cy.xpath('(//input[@label="Year"])[2]').clear();
    cy.xpath('(//input[@label="Year"])[2]').type("2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Not allow only enter start date not end date and click on validate measure", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=FUA-AD]").click();
    cy.wait(2000);
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("4");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });
});
