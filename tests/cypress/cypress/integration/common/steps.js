import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AdultCoreSetMeasuresPage from "../../../support/pages/AdultCoreSetMeasuresPage";
import NCIDDSadpage from "../../../support/pages/NCIDDSadpage";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
const adultCoreSetMeasurespage = new AdultCoreSetMeasuresPage();
const nciddsADpage = new NCIDDSadpage();

Given("user visits QMR home page", () => {
  homePage.launch();
});

When("QMR home page is displayed to the user", () => {
  homePage.validateCoreSetReportingIcon();
});

When("QMR landing page is displayed to the user", () => {
  landingPage.validateCoreSetReportingIcon();
});

And('user can see "Your APS Submissions" page banner', () => {
  landingPage.validatePageBanner();
});

And("user can see My Account link", () => {
  landingPage.validateMyAccountButton();
});

Then('user should see the QMR 2021 Core Set Measures Reporting home page',()=>{
  homePage.verifyTheTitleCoreSetMeasureReporting();
});

And('user click on link Adult Core Set Measures',()=>{
  homePage.clickAdultCoreSetMeasures();
});

And('user click on link NCIDDS-AD',()=>{
  adultCoreSetMeasurespage.clickNCIDDSadLink();
});

And('user can see the NCIDDS-AD National Core Indicators Survey title',()=>{
  nciddsADpage.verifyNCIDDSadTitle();
});

And('user can see the Print button and sentence below title',()=>{
  nciddsADpage.verifyPrintButtonAndSentence();
});

And('user can see the Measure Title Date Completed and Reporting on Measures',()=>{
  nciddsADpage.verifyMeasureTitleDateAndReporting();
});

And('user can see the Performance Measure',()=>{
  nciddsADpage.verifyPerformanceMeasure();
});

And('user can see the button Back to Core Set Measures',()=>{
  nciddsADpage.verifyBackToCoreSetMeasureButton();
});

Then('user can see "APS Submission App" page banner', () => {
  homePage.validatePageBanner();
  homePage.validateSupportSenence();
});

And("user can see login link", () => {
  homePage.validateLoginButton();
});

And("user can see the footer", () => {
  homePage.validateMedicaidLogo(); // verify footer medicaid logo
  homePage.validateEmail(); // verify footer the email
  homePage.validateFederalLogo(); // verify footer the federal logo
  homePage.validateAddress(); // varify the footer address
});

When('user clicks on "Login" link', () => {
  homePage.clickLoginButton();
});

When("user enter username and password", () => {
  loginPage.enterUserName();
  loginPage.enterPassword();
  loginPage.clickAgreeTermAndConditions();
});

And('user click "Sign In" button', () => {
  loginPage.clickSignIn();
});

Then("user should see the QMR home page", () => {});
