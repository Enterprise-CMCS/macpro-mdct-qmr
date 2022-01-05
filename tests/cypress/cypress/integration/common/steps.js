import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AdultCoreSetMeasuresPage from "../../../support/pages/AdultCoreSetMeasuresPage";
import NCIDDSadpage from "../../../support/pages/NCIDDSadpage";
import PDENTch from "../../../support/pages/PDENTch";
import LBWch from "../../../support/pages/LBWch";
import LRCDch from "../../../support/pages/LRCDch";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
const adultCoreSetMeasurespage = new AdultCoreSetMeasuresPage();
const nciddsADpage = new NCIDDSadpage();
const pdentCH = new PDENTch();
const lbwCH = new LBWch();
const lrcdCH = new LRCDch();

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

And('user click on link PDENT-CH',()=>{
  adultCoreSetMeasurespage.clickPDENTchLink();
});

And('user click on link LRCD-CH',()=>{
  adultCoreSetMeasurespage.clickLRCDchLink();
});

And('user can see the LRCD-CH Low Risk Cesarean Delivery title',()=>{
  lrcdCH.verifyLRCDchTitle();
});

And('user can see the PDENT-CH Percentage of Eligibles Who Received Preventive Dental Services title',()=>{
  pdentCH.verifyPDENTchTitle();
});

And('user click on link LBW-CH',()=>{
  adultCoreSetMeasurespage.clickLBWchLink();
});

And('user can see the LBW-CH Live Births Weighting Less Than 2500 Grams title',()=>{
  lbwCH.verifyLBWchTitle();
});

And('user can see the PDENT-CH Performance Measure',()=>{
  pdentCH.verifyPerformanceMeasure();
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
