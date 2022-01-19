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

import AuditCoreSetMeasuresPage from "../../../support/pages/AuditCoreSetMeasuresPage";
import FUAADPAGE from "../../../support/pages/FUAADPage";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
const adultCoreSetMeasurespage = new AdultCoreSetMeasuresPage();
const nciddsADpage = new NCIDDSadpage();
const pdentCH = new PDENTch();
const lbwCH = new LBWch();
const lrcdCH = new LRCDch();
// demo 

const auditCoreSetMeasuresPage = new AuditCoreSetMeasuresPage();
const fUAADPage = new FUAADPAGE();

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

When("login as state user", () => {
  loginPage.loginasAStateUser();
});

Then("verify Core Set Measures is displayed", () => {
  landingPage.validatecoreSetMeasureText();
});

Then("Click on Adult Core Set Measures", () => {
  landingPage.clickAdultCoreSetMeasures();
});

Then("verify url contains ACS", () => {
  auditCoreSetMeasuresPage.verifyURLContainsACS();
});
Then("Click on FUA-AD", () => {
  auditCoreSetMeasuresPage.clickFUAADLink();
});

Then("verify url contains FUA-AD", () => {
  fUAADPage.verifyURLContainsFUAAD();
});

And("verify browse exists", () => {
  fUAADPage.verifyBrowseExists();
});

And("upload attachment pdf", () => {
  fUAADPage.addFilesToFUAADPage();
});

And("verify pdf is uploaded", () => {
  fUAADPage.verifyPDFIsUploaded();
});

And("upload attachment text file", () => {
  fUAADPage.addTextFilesToFUAADPage();
});

And("verify text file is uploaded", () => {
  fUAADPage.verifyTextIsUploaded();
});

And("upload attachment picture", () => {
  fUAADPage.addPictureFilesToFUAADPage();
});

And("verify picture is uploaded", () => {
  fUAADPage.verifyPictureFileIsUploaded();
});
