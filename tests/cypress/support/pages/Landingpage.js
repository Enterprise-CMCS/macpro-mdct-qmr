const logoAtTopLeft = 'img[alt="QMR Logo"]';
const myAccountButton = '//a[@class="dropdown-toggle nav-link"]';
const yourAPSSubmissionsTxt = "//h1";
const sentence = '(//div[@class="footer-fed-gov-text"])[1]';
const medicaidLogo = "img[alt='Medicaid.gov logo']";
const emailBottomLeft = ".footer-email";
const federalLogo = "img[alt='Department of Health and Human Services logo']";
const addressBottomRight = '(//div[@class="footer-wrapper"]/div)[2]';

export class Landingpage {
  launch() {
    cy.visit("https://mdctqmrdev.cms.gov/");
    //cy.visit("https://d2ia6j7tn33yf.cloudfront.net/");
  }

  validateCoreSetReportingIcon() {
    cy.get(logoAtTopLeft).should("be.visible");
  }

  validatePageBanner() {
    cy.xpath(yourAPSSubmissionsTxt).should("be.visible");
  }

  validateMyAccountButton() {
    cy.xpath(myAccountButton).should("be.visible");
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
export default Landingpage;
