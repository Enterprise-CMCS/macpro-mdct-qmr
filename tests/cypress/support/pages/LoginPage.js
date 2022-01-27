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
    cy.get(usernameInput).type("State_QMR2");
  }

  enterPassword() {
    cy.get(passwordInput).type("Passw0rd@");
  }

  //old credentials 
  //state_QMR  Passw0rd!

  clickAgreeTermAndConditions() {
    //cy.wait(2000);
    cy.get(agreeTermCondition).click();
  }

  clickSignIn() {
    cy.get(signInBttn).click();
  }

  loginasAStateUserTwoWithCognito() {
    cy.xpath(emailForCognito).type("stateuser2@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.xpath(loginWithCognitoButtn).click();
  }
}
export default LoginPage;
