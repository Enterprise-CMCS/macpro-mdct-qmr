import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AdultCoreSetMeasuresPage from "../../../support/pages/AdultCoreSetMeasuresPage";
import NCIDDSadpage from "../../../support/pages/NCIDDSadpage";
import PDENTch from "../../../support/pages/PDENTch";
import LBWch from "../../../support/pages/LBWch";
import LRCDch from "../../../support/pages/LRCDch";
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

Then(
  "user should see the QMR 2021 Core Set Measures Reporting home page",
  () => {
    homePage.verifyTheTitleCoreSetMeasureReporting();
  }
);

And("user click on link Adult Core Set Measures", () => {
  homePage.clickAdultCoreSetMeasures();
});

And("user click on link NCIDDS-AD", () => {
  adultCoreSetMeasurespage.clickNCIDDSadLink();
});

And("user click on link PDENT-CH", () => {
  adultCoreSetMeasurespage.clickPDENTchLink();
});

And("user click on link LRCD-CH", () => {
  adultCoreSetMeasurespage.clickLRCDchLink();
});

And("user can see the LRCD-CH Low Risk Cesarean Delivery title", () => {
  lrcdCH.verifyLRCDchTitle();
});

And(
  "user can see the PDENT-CH Percentage of Eligibles Who Received Preventive Dental Services title",
  () => {
    pdentCH.verifyPDENTchTitle();
  }
);

And("user click on link LBW-CH", () => {
  adultCoreSetMeasurespage.clickLBWchLink();
});

And(
  "user can see the LBW-CH Live Births Weighting Less Than 2500 Grams title",
  () => {
    lbwCH.verifyLBWchTitle();
  }
);

And("user can see the PDENT-CH Performance Measure", () => {
  pdentCH.verifyPerformanceMeasure();
});

And("user can see the NCIDDS-AD National Core Indicators Survey title", () => {
  nciddsADpage.verifyNCIDDSadTitle();
});

And("user can see the Print button and sentence below title", () => {
  nciddsADpage.verifyPrintButtonAndSentence();
});

And(
  "user can see the Measure Title Date Completed and Reporting on Measures",
  () => {
    nciddsADpage.verifyMeasureTitleDateAndReporting();
  }
);

And("user can see the Performance Measure", () => {
  nciddsADpage.verifyPerformanceMeasure();
});

And("user can see the button Back to Core Set Measures", () => {
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

When("user enter email and password for Cognito login", () => {
  loginPage.enterEmailwithCognitoLogin();
  loginPage.enterPasswordwithCognitoLogin();
});

And("user click on Login with Cognito button", () => {
  loginPage.clickLoginWithCognitoButtn();
});

And('user click "Sign In" button', () => {
  loginPage.clickSignIn();
});

Then("user should see the QMR home page", () => {});

When("login as state user", () => {
  loginPage.loginasAStateUserWithCognito();
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

And("verify NCQA text exists", () => {
  fUAADPage.verifyNcqaText();
});

And("Click on hedisdropdown", () => {
  fUAADPage.hedisDropdown();
});
And("verify FFY2021 exists", () => {
  fUAADPage.verifyFFY2021();
});
And("verify FFY2020 exists", () => {
  fUAADPage.verifyFFY2020();
});
And("verify FFY2019 exists", () => {
  fUAADPage.verifyFFY2019();
});
And("Click on National Committee for Quality Assurance Radio Button", () => {
  fUAADPage.clicknationalCommitteForQualityAssuranceRadioBTN();
});
Then("Click on Administrative Data", () => {
  fUAADPage.clickAdminstrativeDataRaioBTN();
});
Then("Click on Medicaid Management Information System", () => {
  fUAADPage.clickMedicaidManagementInformationSystemMMISRadioBTN();
});

And("type numerator 321111", () => {
  fUAADPage.typeAge65andolderNumeratorInputBox("321111");
});

And("type Denominator 111111", () => {
  fUAADPage.typeAge65andolderDenominatorInputBox("111111");
});

And("verify error message is displayed", () => {
  fUAADPage.veirfyRateErrorMessageIsDisplayed();
});

And("type Denominator 411111", () => {
  fUAADPage.typeAge65andolderDenominatorInputBox("411111");
});

And("clear numerator input box", () => {
  fUAADPage.clearAge65andolderNumeratorInputBox();
});

And("clear Denominator input box", () => {
  fUAADPage.clearAge65andolderDenominatorInputBox();
});

And(
  "verify that only one number after decimal can populate for auto calculated rate exists",
  () => {
    fUAADPage.verifyOnlyOneNumberAfterDecimalIsDisplayed();
  }
);
And("type 8 digits numerator", () => {
  fUAADPage.typeAge65andolderNumeratorInputBox("12345678");
});
And("type 8 digits Denominator", () => {
  fUAADPage.typeAge65andolderDenominatorInputBox("21345678");
});
And("verify error message is not displayed", () => {
  fUAADPage.veirfyRateErrorMessageIsNotDisplayed();
});

And("type letters numerator", () => {
  fUAADPage.typeAge65andolderNumeratorInputBox("aaa");
});
And("type letters Denominator", () => {
  fUAADPage.typeAge65andolderDenominatorInputBox("bbb");
});
And("verify there is no value in rate box", () => {
  fUAADPage.veirfyRateErrorMessageIsNotDisplayed();
});

And("input text in rate box", () => {
  fUAADPage.typeAge65andolderDenominatorInputBox("bbb");
});
And("verify user cannot manually override enter rate exists", () => {
  fUAADPage.typeAge65andolderRateInputBox("88.1");
});

Then("Click on Other Data Source Radio Button", () => {
  fUAADPage.clickOtherDataSourceRadioBTN();
});

And("verify user can manually override enter rate exists", () => {
  fUAADPage.typeAge65andolderRateInputBox("88.1");
});
