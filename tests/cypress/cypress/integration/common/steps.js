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

And('user enters inputs to the Rate field and verify the correct Rate output', ()=>{
  fuaAdpage.verifyAges();
});

And('user can click on No option for reporting on this measure',()=>{
  fuaAdpage.VerifyReportingOnMeasureNo();
});

And('user can click on Yes option for Are you reporting on this measure',()=>{
  fuaAdpage.verifyReportingOnMeasureYes();
});
//steps below are OY2-8940 Deviation and Optional Measure Stratification related
And('user can click on Yes option for Are you reporting on this measure at first',()=>{
  fuaAdpage.clickYesForReportingMeasure();
});

And('user can click on NCQA HEDIS under Measurement Specifications',()=>{
  fuaAdpage.clickNCQAHEDISradio();
});

And('user can enter numerator and denominator for age 18-64',()=>{
  fuaAdpage.enterNumeratorDenominator();
});

And('user can click on Yes option for Deviations from Measure Specifications',()=>{
  fuaAdpage.clickYesDeviation();
});

And('user can click on Follow up within 30 days of ED visits',()=>{
  fuaAdpage.clickFollowUp30Days();
});

And('user can click on ages 18-64',()=>{
  fuaAdpage.clickAge18to64();
});

And('user can click on numerator denominator other checkbox and enter text in explain textbox',()=>{
  fuaAdpage.clickNumeratorDenominatorOtherExplain();
});

And('user can click Race Non Hispanic under Optional Measure Stratification',()=>{
  fuaAdpage.clickRaceNonHispanic();
});

And('user can click on White checkbox and ages 18 to 64',()=>{
  fuaAdpage.clickWhiteAge18to64();
});

And('user can enter numerator denominator to verify Rate',()=>{
  fuaAdpage.enterNumeratorDenominatorUnderRace();
});

And('user can click on Additional Alternative Classification enter Define textbox',()=>{
  fuaAdpage.clickAdditionalRace();
});

And('user can click on ages 18-64 under Additional Specifications',()=>{
  fuaAdpage.clickAge18to64UnderAdditionalRace();
});

And('user can enter numerator denominatorto verify Rate under Additional section',()=>{
  fuaAdpage.enterNumeratorDenominatorUnderAdditionalRace();
});

When("user enter email and password for Cognito login", () => {
  loginPage.enterEmailwithCognitoLogin();
  loginPage.enterPasswordwithCognitoLogin();
});

// And('user can click on What is the status of the data being reported section',()=>{

// });

// And('user can click on Other option in Measurement Specification',()=>{

// });

// And('user can click on National Committee for Quality Assurance HEDIS option in Measure Specification',()=>{

// });

// And('user can click on Other Data Source option in Data Source section',()=>{

// });

// And('user can click on Administrative Data option in Data Source section',()=>{

// });

// And('user can click on enter start and end date on Date Range section',()=>{

// });

// And('user can click on options in Definition of denominator section',()=>{

// });

// And('user can click on options in Which delivery systems are represented in the denominator section',()=>{

// });

// And('user can fill out Performance Measure section',()=>{

// });

// And('user can fill out Follow-up within 30 days of ED visit section',()=>{

// });

// And('user can click on options for Deviations from Measure Specifications section',()=>{

// });

// And('user can click on options for Combined Rate(s) from Multiple Reporting Units section',()=>{

// });

// And('user can click on options for Optional Measure Stratification section',()=>{

// });

// And('user can enter Additional Notes section',()=>{

// });
// --- END NEW

//Steps below belong to ticket OY2-15377 Other option under Measurement Specification

And('user can click on Other option in Measurement Specifications',()=>{
  fuaAdpage.clickOtherUnderMeasureSpecification();
});

And('user can enter Describe the Rate under Other Proformane Measure section',()=>{
  fuaAdpage.enterDescribeRateUnderOPM();
});

And('user can verify the exact text entered in Describe the Rate shows up in Optional Measure Stratification section',()=>{
  fuaAdpage.verifyDescribeRateUnderOMS();
});

//OY2-15377 End

And("user click on Login with Cognito button", () => {
  loginPage.clickLoginWithCognitoButtn();
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

When("login as state user two",()=>{
  loginPage.loginasAStateUserTwoWithCognito();
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

