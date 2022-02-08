const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 10017 Child Measure Qualifier: CH", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
    // cy.then(($body) => {
    //   if (
    //     $body.find(
    //       "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/table[1]/tbody[1]/tr[2]/td[5]/div[1]/button[1]"
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
    // });
  });
  it("Screen Enhancement", () => {});
  it("Screen Enhancement", () => {});
  it("Screen Enhancement", () => {});
  it("Screen Enhancement", () => {});
});
