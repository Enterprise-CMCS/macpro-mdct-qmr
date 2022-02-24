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
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#popover-trigger-185 > svg").click();
    cy.get('#popover-body-185 > .css-1isix7b > [aria-label="January"]').click();
    cy.get("#popover-trigger-189").click();
    cy.get("#popover-trigger-189").click();
    cy.get("#popover-trigger-189").click();
    cy.get('#popover-body-189 > .css-1isix7b > [aria-label="January"]').click();
    cy.get(":nth-child(3) > :nth-child(1) > :nth-child(4)").click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Not allow start date late than end date", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=CCP-AD]").click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#popover-trigger-189").click();
    cy.get(
      '#popover-header-189 > .chakra-stack > [aria-label="Previous Year"]'
    ).click();
    cy.get('#popover-body-189 > .css-1isix7b > [aria-label="January"]').click();
    cy.get(".chakra-toast > .chakra-toast__inner > #\\31 ").should(
      "be.visible"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Not allow only enter start date not end date and click on validate measure", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("[data-cy=ACS]").click();
    cy.get("[data-cy=FUA-AD]").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#popover-trigger-185").click();
    cy.get(
      '#popover-body-185 > .css-1isix7b > [aria-label="February"]'
    ).click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should("be.visible");
    /* ==== End Cypress Studio ==== */
  });
});
