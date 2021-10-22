
const usernameInput = 'input#okta-signin-username';
const passwordInput = 'input#okta-signin-password';
const agreeTermCondition = 'input#tandc';
const signInBttn = 'input#okta-signin-submit';



export class LoginPage {

    enterUserName()
    {
        cy.get(usernameInput).type("State_QMR");
    }

    enterPassword()
    {
        cy.get(passwordInput).type("Passw0rd!");
    }

    clickAgreeTermAndConditions()
    {
        cy.wait(2000);
        cy.get(agreeTermCondition).click(); 
    }

    clickSignIn()
    {
        cy.get(signInBttn).click(); 
    }
}
export default LoginPage
