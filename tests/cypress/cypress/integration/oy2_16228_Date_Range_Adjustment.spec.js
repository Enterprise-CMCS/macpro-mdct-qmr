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
    cy.get('[data-cy=ACS]').click();
    cy.get('[data-cy=CCP-AD]').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#popover-trigger-185 > svg').click();
    cy.get('#popover-body-185 > .css-1isix7b > [aria-label="January"]').click();
    cy.get('#popover-trigger-189').click();
    cy.get('#popover-trigger-189').click();
    cy.get('#popover-trigger-189').click();
    cy.get('#popover-body-189 > .css-1isix7b > [aria-label="May"]').click();
    cy.get(':nth-child(3) > :nth-child(1) > :nth-child(4)').click();
    cy.get('[data-cy="Validate Measure"]').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Not allow same date', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=ACS]').click();
    cy.get('[data-cy=CCP-AD]').click();

    cy.get(
      '#popover-trigger-189 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get(
      '#popover-trigger-189 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get(
      '#popover-trigger-189 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get('#popover-body-189 > .css-1isix7b > [aria-label="January"]').click();
    cy.get('.chakra-toast > .chakra-toast__inner > #\\31  > .css-njbp03 > .chakra-alert__desc').should('be.visible');
    cy.get('[data-cy=DefinitionOfDenominator2] > .chakra-checkbox__label > .chakra-text').click();
    cy.get('#DefinitionOfDenominator2-checkbox').check();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Not allow start date late than end date', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=ACS]').click();
    cy.get('[data-cy=CCP-AD]').click();

    cy.get(
      '#popover-trigger-185 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get('#popover-header-185 > .chakra-stack > [aria-label="Previous Year"] > svg').click();
    cy.get('#popover-body-185 > .css-1isix7b > [aria-label="January"]').click();

    cy.get(
      '#popover-trigger-189 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get('#popover-header-189 > .chakra-stack > [aria-label="Previous Year"] > svg').click();
    cy.get('#popover-header-189 > .chakra-stack > [aria-label="Previous Year"] > svg').click();
    cy.get('[data-cy="DateRange.endDate-month"]').click();
    cy.get('#popover-trigger-185 > svg').click();
    cy.get('#popover-body-185 > .css-1isix7b > [aria-label="August"]').click();

    cy.get(
      '#popover-trigger-189 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get('#popover-header-189 > .chakra-stack > [aria-label="Previous Year"] > svg').click();
    cy.get('#popover-header-189 > .chakra-stack > [aria-label="Next Year"]').click();
    cy.get('#popover-header-189 > .chakra-stack > [aria-label="Previous Year"] > svg').click();
    cy.get('#popover-body-189 > .css-1isix7b > [aria-label="January"]').click();
    cy.get('.chakra-toast > .chakra-toast__inner > #\\31  > .css-njbp03 > .chakra-alert__desc').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Not allow only enter start date not end date and click on validate measure', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy=ACS]').click();
    cy.get('[data-cy=FUA-AD]').click();
    cy.get(
      '#popover-trigger-185 > svg > [d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z"]'
    ).click();

    cy.get('#popover-body-185 > .css-1isix7b > [aria-label="January"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must have a End Date"]').should('have.text', 'Date Range must have a End Date');
    /* ==== End Cypress Studio ==== */
  });
});
