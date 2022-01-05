// Element locations 
const username_input = "input#okta-signin-username";
const password_input = "input#okta-signin-password";
const agreement_bttn = "//input[@id='tandc']";
const signin_bttn = "//input[@id='okta-signin-submit']";

// Function ( user action )
export class DemoLoginPage {

    launche(){
        cy.visit("https://mdctqmrdev.cms.gov/");
    }

    enterInvalidCredential() {
        cy.get(username_input).type("fake@gmail.com");
        cy.get(password_input).type("fakePass!");
    }

    signIn() {
        cy.xpath(agreement_bttn).click();
        cy.xpath(signin_bttn).click();
    }
}
export default DemoLoginPage;