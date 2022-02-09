const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 10017 Child Measure Qualifier: CH", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
    // if (
    //   cy.find(
    //     ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //   ).length > 0
    // );

    // cy.get("body").then(($body) => {
    //   if (
    //     $body.find(
    //       ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //     ).length > 0
    //   ) {
    //     cy.xpath(
    //       "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/button[1]"
    //     ).click({force: true});
    //     cy.xpath(
    //       "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/div[1]/div[1]"
    //     ).click({force: true});
    //     cy.xpath(
    //       "//body/div[3]/div[1]/div[3]/div[1]/section[1]/form[1]/div[1]/input[1]"
    //     ).type("delete");
    //     cy.xpath("//button[contains(text(),'Delete')]").click({force: true});
    //   }
    // });
    // cy.then(($body) => {
    //   if (
    //     $body.find(
    //       ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //     ).length > 0
    //   ) {
    //     {
    //       cy.xpath(
    //         "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/button[1]"
    //       ).click();
    //       cy.xpath(
    //         "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/div[1]/div[1]"
    //       ).click();
    //       cy.xpath(
    //         "//body/div[3]/div[1]/div[3]/div[1]/section[1]/form[1]/div[1]/input[1]"
    //       ).type("delete");
    //       cy.xpath("//button[contains(text(),'Delete')]").click();
    //     }
    //   }
  });
  it("Screen Enhancement", () => {
    const a = cy.get("body");
    // cy.get("body").then(($body) => {
    //   cy.wait(5000);
    //   console.log($body.find('[data-cy="rndom-kebab-menu"]'));
    //   console.log($body.find("#menu-button-2"));
    console.log(a);
    // if (
    //   $body.find(
    //     ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //   ).length > 0
    // ) {
    //   cy.get(
    //     ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //   ).click({ force: true });
    //   cy.xpath(
    //     "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/div[1]/div[1]/button[2]"
    //   ).click({ force: true });
    //   cy.get(
    //     "body.chakra-ui-light:nth-child(2) div.chakra-portal:nth-child(4) div.chakra-modal__overlay.css-hdd9l7 div.chakra-modal__content-container.css-v9b9hc section.chakra-modal__content.css-hxtskf form:nth-child(1) div.chakra-modal__body.css-qlig70 > input.chakra-input.css-1abuxor"
    //   ).type("delete{enter}");
    //   cy.wait(5000);
    // }

    //   if (cy.get("#menu-button-6")) {
    //     cy.get(
    //       ':nth-child(2) > :nth-child(5) > .css-xi606m > [data-cy="child-kebab-menu"]'
    //     ).click({ force: true });
    //     cy.xpath(
    //       "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/div[1]/div[1]/button[2]"
    //     ).click({ force: true });
    //     cy.get(
    //       "body.chakra-ui-light:nth-child(2) div.chakra-portal:nth-child(4) div.chakra-modal__overlay.css-hdd9l7 div.chakra-modal__content-container.css-v9b9hc section.chakra-modal__content.css-hxtskf form:nth-child(1) div.chakra-modal__body.css-qlig70 > input.chakra-input.css-1abuxor"
    //     ).type("delete{enter}");
    //     cy.wait(5000);
    //   cy.get(
    //     "body.chakra-ui-light:nth-child(2) div.chakra-portal:nth-child(4) div.chakra-modal__overlay.css-hdd9l7 div.chakra-modal__content-container.css-v9b9hc section.chakra-modal__content.css-hxtskf form:nth-child(1) footer.chakra-modal__footer.css-k0waxj > button.chakra-button.css-n45e6f:nth-child(2)"
    //   ).type({ enter });

    //   cy.xpath(
    //     "//p[contains(text(),'Child Core Set Measures: Medicaid')]"
    //   ).click();
  });
});
it("Screen Enhancement", () => {});
it("Screen Enhancement", () => {});
it("Screen Enhancement", () => {});
