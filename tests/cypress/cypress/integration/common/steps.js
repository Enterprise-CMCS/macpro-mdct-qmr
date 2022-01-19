import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AdultCoreSetMeasuresPage from "../../../support/pages/AdultCoreSetMeasuresPage";
import NCIDDSadpage from "../../../support/pages/NCIDDSadpage";
import PDENTch from "../../../support/pages/PDENTch";
import LBWch from "../../../support/pages/LBWch";
import LRCDch from "../../../support/pages/LRCDch";
// demo
import DemoLoginPage from "../../../support/pages/DemoLoginPage";
import FUAadpage from "../../../support/pages/FUAadpage";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
const adultCoreSetMeasurespage = new AdultCoreSetMeasuresPage();
const fuaAdpage = new FUAadpage();
const nciddsADpage = new NCIDDSadpage();
const pdentCH = new PDENTch();
const lbwCH = new LBWch();
const lrcdCH = new LRCDch();
// demo 
const demoLoginPage = new DemoLoginPage();

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

And('user click on link Adult Core Set Measures',()=>{
  homePage.clickAdultCoreSetMeasures();
});


And('user click on link FUA-AD',()=>{
  adultCoreSetMeasurespage.clickFUAadLink();
});

And('user can see the FUA-AD follow up after emergency department vist for alcohol and other drug abuse title',()=>{

});

And('user can see the sentence below title',()=>{

});

And('user can click on No option for reporting on this measure',()=>{
  fuaAdpage.VerifyReportingOnMeasureNo();
});

And('user can click on Yes option for Are you reporting on this measure',()=>{
  fuaAdpage.verifyReportingOnMeasureYes();
});


And('user can click on What is the status of the data being reported section',()=>{

});

And('user can click on Other option in Measurement Specification',()=>{

});

And('user can click on National Committee for Quality Assurance HEDIS option in Measure Specification',()=>{

});

And('user can click on Other Data Source option in Data Source section',()=>{

});

And('user can click on Administrative Data option in Data Source section',()=>{

});

And('user can click on enter start and end date on Date Range section',()=>{

});

And('user can click on options in Definition of denominator section',()=>{

});

And('user can click on options in Which delivery systems are represented in the denominator section',()=>{

});

And('user can fill out Performance Measure section',()=>{

});

And('user can fill out Follow-up within 30 days of ED visit section',()=>{

});

And('user can click on options for Deviations from Measure Specifications section',()=>{

});

And('user can click on options for Combined Rate(s) from Multiple Reporting Units section',()=>{

});

And('user can click on options for Optional Measure Stratification section',()=>{

});

And('user can enter Additional Notes section',()=>{

});
// --- END NEW

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

// Demo steps 
Given("user is on  login page", ()=>{
  demoLoginPage.launche();
});

When("user logins with invalid credentials",()=>{
  demoLoginPage.enterInvalidCredential();
});

Then("user can see error message",()=>{
  demoLoginPage.signIn();
});

