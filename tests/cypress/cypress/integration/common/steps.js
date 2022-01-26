import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AuditCoreSetMeasuresPage from "../../../support/pages/AuditCoreSetMeasuresPage";
import FUAADPAGE from "../../../support/pages/FUAADPage";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
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

Then(
  "user should see the QMR 2021 Core Set Measures Reporting home page",
  () => {
    homePage.verifyTheTitleCoreSetMeasureReporting();
  }
);

When("login as state user two",()=>{
   loginPage.loginasAStateUserTwoWithCognito();
});

And("user click on link Adult Core Set Measures", () => {
  homePage.clickAdultCoreSetMeasures();
});

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

And(
  "verify the button Save on the top and click on it to see Saved Moments Ago shows up",
  () => {
    fUAADPage.clickSaveButtnVerifyStatus();
  }
);

And("select NCQA HEDIS under Measurement Specification", () => {
  fUAADPage.clickNCQAHEDIS();
});

And("verify sentence under Complete the Measure", () => {
  fUAADPage.verifySentenceUnderCompleteMeasure();
});

And(
  "click on button Validate Measure to verify it shows the error message",
  () => {
    fUAADPage.clickValidateMeasureButtonVerify();
  }
);

And(
  "click on button Complete Measure to verify it shows Validation Error popup box",
  () => {
    fUAADPage.clickCompleteMeasureButtonVerify();
  }
);

And("click on No option in the popup box", () => {
  fUAADPage.clickNoOption();
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
