
const bypassInput1 = '';
const bypassInput = '';
const agreeTermCondition = 'input#tandc';
const signInBttn = 'input#okta-signin-submit';



export class LoginPage {

    enterUserName()
    {
        cy.get(bypassInput1).type( );
    }

    enterPassword()
    {
        cy.get(bypassInput).type( );
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