const usernameInput = "input#okta-signin-username";
const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";
const loginWithCognitoButtn =
  "(//button[@class='chakra-button css-9n6wlp'])[2]";
const passwordInput = "input#okta-signin-password"; //pragma: allowlist secret
const agreeTermCondition = "input#tandc";
const signInBttn = "input#okta-signin-submit";

export class LoginPage {
  enterUserName() {
    cy.get(usernameInput).type("State_QMR");
  }

  enterEmailwithCognitoLogin() {
    cy.xpath(emailForCognito).type("stateuser2@test.com");
  }

  enterPasswordwithCognitoLogin() {
    cy.xpath(passwordForCognito).type("p@55W0rd!");
  }

  clickLoginWithCognitoButtn() {
    cy.xpath(loginWithCognitoButtn).click();
  }

  enterPassword() {
    cy.get(passwordInput).type("Passw0rd!");
  }

  clickAgreeTermAndConditions() {
    //cy.wait(2000);
    cy.get(agreeTermCondition).click();
  }

  clickSignIn() {
    cy.get(signInBttn).click();
  }

  loginasAStateUser() {
    cy.get(usernameInput).type("State_QMR2");
    cy.get(passwordInput).type("Passw0rd@");
    cy.get(agreeTermCondition).click();
    cy.get(signInBttn).click();
  }

  loginasAStateUserWithCognito() {
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.xpath(loginWithCognitoButtn).click();
  }

  loginasAStateUserTwoWithCognito() {
    cy.xpath(emailForCognito).type("stateuser2@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.xpath(loginWithCognitoButtn).click();
  }
}
export default LoginPage;
