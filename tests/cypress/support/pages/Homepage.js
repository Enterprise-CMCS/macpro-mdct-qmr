const logoAtTopLeft = 'img[alt="QMR Logo"]';
const loginButton = "a#loginButton";
const apsSubmissionAppTxt = "//div[@class='Home']//h1[.='APS Submission App']";
const sentence = '(//div[@class="footer-fed-gov-text"])[1]';
const medicaidLogo = "img[alt='Medicaid.gov logo']";
const emailBottomLeft = ".footer-email";
const federalLogo = "img[alt='Department of Health and Human Services logo']";
const addressBottomRight = '(//div[@class="footer-wrapper"]/div)[2]';

export class Homepage {
  launch() {
    cy.visit("https://mdctqmrdev.cms.gov/");
  }

  validateCoreSetReportingIcon() {
    //cy.wait(3000);
    cy.get(logoAtTopLeft).should("be.visible");
  }

  validatePageBanner() {
    cy.xpath(apsSubmissionAppTxt).should("be.visible");
  }

  validateLoginButton() {
    cy.get(loginButton).should("be.visible");
  }

  clickLoginButton() {
    cy.get(loginButton).click();
  }

  validateSupportSenence() {
    cy.xpath(sentence).should("be.visible");
  }

  validateMedicaidLogo() {
    cy.get(medicaidLogo).should("be.visible");
  }

  validateEmail() {
    cy.get(emailBottomLeft).contains("MDCT_Help@cms.hhs.gov");
  }

  validateFederalLogo() {
    cy.get(federalLogo).should("be.visible");
  }

  validateAddress() {
    cy.xpath(addressBottomRight).contains(
      "7500 Security Boulevard Baltimore, MD 21244"
    );
  }
}
export default Homepage;
