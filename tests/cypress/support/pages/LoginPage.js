
const usernameInput = 'input#okta-signin-username';
const passwordInput = 'input#okta-signin-password';
const agreeTermCondition = 'input#tandc';
const signInBttn = 'input#okta-signin-submit';



export class LoginPage {

    enterUserName(s)
    {
        cy.get(usernameInput).type(s);
    }

    enterPassword(s)
    {
        cy.get(passwordInput).type(s);
    }

    clickAgreeTermAndConditions()
    {
        cy.get(agreeTermCondition).click(); 
    }

    clickSignIn()
    {
        cy.get(signInBttn).click(); 
    }
}
export default LoginPage