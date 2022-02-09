const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 8937 Measure 04 IET AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Screen Enhancement", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('a > .chakra-text').click();
    cy.get(':nth-child(21) > :nth-child(1) > a > .chakra-text').click();
    cy.get('.css-itvw0n').should('have.text', 'For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov.');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=DidReport1]').click({force:true});
    cy.get('[data-cy=WhyAreYouNotReporting0] > .chakra-checkbox__control').click();
    cy.get('[data-cy=WhyAreYouNotReporting0] > #WhyAreYouNotReporting').check();
    cy.get('[data-cy=WhyAreYouNotReporting1] > .chakra-checkbox__control').click();
    cy.get('[data-cy=WhyAreYouNotReporting1] > #WhyAreYouNotReporting').check();
    cy.get('[data-cy=AmountOfPopulationNotCovered0]').click();
    cy.get('#radio-215').check();
    /* ==== End Cypress Studio ==== */
  });

})
