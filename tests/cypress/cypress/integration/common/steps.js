import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Homepage from "../../../support/pages/Homepage";
import LoginPage from "../../../support/pages/LoginPage";
import Landingpage from "../../../support/pages/Landingpage";
import AdultCoreSetMeasuresPage from "../../../support/pages/AdultCoreSetMeasuresPage";
import NCIDDSadpage from "../../../support/pages/NCIDDSadpage";
import PDENTch from "../../../support/pages/PDENTch";
import LBWch from "../../../support/pages/LBWch";
import LRCDch from "../../../support/pages/LRCDch";
import AdultCoreSetQuestionsPage from "../../../support/pages/AdultCoreSetQuestionsPage";
import OUDadPage from "../../../support/pages/OUDadPage";
// demo

import FUAADPAGE from "../../../support/pages/FUAADPage";
import CPAADPAGE from "../../../support/pages/CPAADPage";

const homePage = new Homepage();
const loginPage = new LoginPage();
const landingPage = new Landingpage();
const adultCoreSetMeasurespage = new AdultCoreSetMeasuresPage();
const nciddsADpage = new NCIDDSadpage();
const pdentCH = new PDENTch();
const lbwCH = new LBWch();
const lrcdCH = new LRCDch();
const oudADpage = new OUDadPage();
// demo

const fUAADPage = new FUAADPAGE();
const cPAADPage = new CPAADPAGE();
const adultCoreSetQuestionsPage = new AdultCoreSetQuestionsPage();

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

And("user click on link MSC-AD", () => {
  adultCoreSetMeasurespage.clickMSCadLink();
});

And(
  "user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the home page",
  () => {
    homePage.verifyQMRMDCTMedicaidLogoAtHomePage();
  }
);

And("user click on Adult Core Set Measure link", () => {
  homePage.clickAdultCoreSetMeasures();
});

And(
  "user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the Adult core set measure page",
  () => {
    adultCoreSetMeasurespage.verifyQMRMDCTMedicaidLogoAtAdultCoreSetMeasurePage();
  }
);

Then("click on FUA-AD", () => {
  adultCoreSetMeasurespage.clickFUAadLink();
});

And(
  "user should see the QMR logo at top and MDCT Medicaid logo at the bottom of the FUA-AD page",
  () => {
    fUAADPage.verifyQMRMDCTMedicaidLogoAtfuaAdPage();
  }
);

And("user click on link NCIDDS-AD", () => {
  adultCoreSetMeasurespage.clickNCIDDSadLink();
});

And("user click on link PDENT-CH", () => {
  adultCoreSetMeasurespage.clickPDENTchLink();
});

And("user click on link LRCD-CH", () => {
  adultCoreSetMeasurespage.clickLRCDchLink();
});

And("user click on link CPA-CH", () => {
  adultCoreSetMeasurespage.clickCPAadLink();
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

And("user click on link Adult Core Set Measures", () => {
  homePage.clickAdultCoreSetMeasures();
});

And("user click on link FUA-AD", () => {
  adultCoreSetMeasurespage.clickFUAadLink();
});

And("user click on link OUD-AD", () => {
  adultCoreSetMeasurespage.clickOUDadLink();
});

And(
  "user can see the FUA-AD follow up after emergency department vist for alcohol and other drug abuse title",
  () => {}
);

And("user can see the sentence below title", () => {});

And(
  "user enters inputs to the Rate field and verify the correct Rate output",
  () => {
    fUAADPage.verifyAges();
  }
);

And("user can click on No option for reporting on this measure", () => {
  fUAADPage.VerifyReportingOnMeasureNo();
});

And(
  "user can click on Yes option for Are you reporting on this measure",
  () => {
    fUAADPage.verifyReportingOnMeasureYes();
  }
);

And(
  "user can click on Yes option for Are you reporting on this MSC AD measure",
  () => {
    fUAADPage.verifyReportingOnMSCadMeasureYes();
  }
);
//steps below are OY2-8940 Deviation and Optional Measure Stratification related
And(
  "user can click on Yes option for Are you reporting on this measure at first",
  () => {
    fUAADPage.clickYesForReportingMeasure();
  }
);

And("user can click on NCQA HEDIS under Measurement Specifications", () => {
  fUAADPage.clickNCQAHEDISradio();
});

And("user can enter numerator and denominator for age 18-64", () => {
  fUAADPage.enterNumeratorDenominator();
});

And(
  "user can click on Yes option for Deviations from Measure Specifications",
  () => {
    fUAADPage.clickYesDeviation();
  }
);

And("user can click on Follow up within 30 days of ED visits", () => {
  fUAADPage.clickFollowUp30Days();
});

And("user can click on ages 18-64", () => {
  fUAADPage.clickAge18to64();
});

And(
  "user can click on numerator denominator other checkbox and enter text in explain textbox",
  () => {
    fUAADPage.clickNumeratorDenominatorOtherExplain();
  }
);

And(
  "user can click Race Non Hispanic under Optional Measure Stratification",
  () => {
    fUAADPage.clickRaceNonHispanic();
  }
);

And("user can click on White checkbox and ages 18 to 64", () => {
  fUAADPage.clickWhiteAge18to64();
});

And("user can enter numerator denominator to verify Rate", () => {
  fUAADPage.enterNumeratorDenominatorUnderRace();
});

And(
  "user can click on Additional Alternative Classification enter Define textbox",
  () => {
    fUAADPage.clickAdditionalRace();
  }
);

And("user can click on ages 18-64 under Additional Specifications", () => {
  fUAADPage.clickAge18to64UnderAdditionalRace();
});

And(
  "user can enter numerator denominatorto verify Rate under Additional section",
  () => {
    fUAADPage.enterNumeratorDenominatorUnderAdditionalRace();
  }
);

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

And("user can click on Other option in Measurement Specifications", () => {
  fUAADPage.clickOtherUnderMeasureSpecification();
});

And(
  "user can enter Describe the Rate under Other Proformane Measure section",
  () => {
    fUAADPage.enterDescribeRateUnderOPM();
  }
);

And(
  "user can verify the exact text entered in Describe the Rate shows up in Optional Measure Stratification section",
  () => {
    fUAADPage.verifyDescribeRateUnderOMS();
  }
);

//OY2-15377 End

And("user click on Login with Cognito button", () => {
  loginPage.clickLoginWithCognitoButtn();
});

And(
  "user can see the LBW-CH Live Births Weighting Less Than 2500 Grams title",
  () => {
    lbwCH.verifyLBWchTitle();
  }
);

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
And("user click on link CPA-AD", () => {
  adultCoreSetMeasurespage.clickCPAadLink();
});
When("user enter username and password", () => {
  loginPage.enterUserName();
  loginPage.enterPassword();
  loginPage.clickAgreeTermAndConditions();
});

When("login as state user two", () => {
  loginPage.loginasAStateUserTwoWithCognito();
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

// Demo steps
Given("user is on  login page", () => {
  demoLoginPage.launche();
});

When("user logins with invalid credentials", () => {
  demoLoginPage.enterInvalidCredential();
});

Then("user can see error message", () => {
  demoLoginPage.signIn();
});
Then(
  "user should see the QMR 2021 Core Set Measures Reporting home page",
  () => {
    homePage.verifyTheTitleCoreSetMeasureReporting();
  }
);

When("login as state user two", () => {
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
  adultCoreSetMeasurespage.verifyURLContainsACS();
});
Then("Click on FUA-AD", () => {
  adultCoreSetMeasurespage.clickFUAadLink();
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

And("verify Adult Core Set Questions is displayed", () => {
  adultCoreSetQuestionsPage.verifyAdultCoreSetQuestionHeaderIsDisplayed();
});

And("verify Adult Core Set Questions content is displayed", () => {
  adultCoreSetQuestionsPage.verifyadultCoreSetQuestionContentIsDisplayed();
});

And("verify Delivery System is displayed", () => {
  adultCoreSetQuestionsPage.verifydeliverySystemIsDisplayed();
});

And("verify Delivery System content is displayed", () => {
  adultCoreSetQuestionsPage.verifydeliverySystemContentIsDisplayed();
});

And("verify AGES 21 TO 64 is displayed", () => {
  adultCoreSetQuestionsPage.verifyages21To64IsDisplayed();
});

And("verify AGE 65 AND OLDER is displayed", () => {
  adultCoreSetQuestionsPage.verifyages65AndOlderIsDisplayed();
});

And("verify Fee-for-Service is displayed", () => {
  adultCoreSetQuestionsPage.verifyfeeForServiceIsDisplayed();
});

And("verify PCCM is displayed", () => {
  adultCoreSetQuestionsPage.verifyPCCMIsDisplayed();
});

And("verify Managed Care is displayed", () => {
  adultCoreSetQuestionsPage.verifymanagedCareIsDisplayed();
});

And("verify Integrated Care Model ICM is displayed", () => {
  adultCoreSetQuestionsPage.verifyintegratedCareModelICMIsDisplayed();
});

And("verify add Another box is displayed", () => {
  adultCoreSetQuestionsPage.verifyaddAnotherBTNIsDisplayed();
});

And("verify Total all ages is displayed", () => {
  adultCoreSetQuestionsPage.verifytotalAllAgesIsDisplayed();
});

And("verify AGES 21 TO 64 total value is displayed", () => {
  adultCoreSetQuestionsPage.verifyages21To64TotalValueIsDisplayed();
});

And("verify AGE 65 AND OLDER total value is displayed", () => {
  adultCoreSetQuestionsPage.verifyages65AndOlderTotalValueIsDisplayed();
});

And("verify Audit or Validation of Measures", () => {
  adultCoreSetQuestionsPage.verifyagesauditOrValidationMeasuresIsDisplayed();
});

And("verify Audit or Validation of Measures content is displayed", () => {
  adultCoreSetQuestionsPage.verifyauditOrValidationMeasuresValueIsDisplayed();
});

And("verify yes option on section 2 is displayed", () => {
  adultCoreSetQuestionsPage.verifyyesSomeOfTheCoreSetMeasuresHaveBeenAuditedOrValidatedIsDisplayed();
});

And("verify no option on section 2 is displayed", () => {
  adultCoreSetQuestionsPage.verifynoNoneOfTheCoreSetMeasuresHaveBeenAuditedOrValidatedIsDisplayed();
});

And("click yes option on section 2", () => {
  adultCoreSetQuestionsPage.clickYesOptionOnSection2();
});

And("verify add another button is displayed", () => {
  adultCoreSetQuestionsPage.verifyaddAnotherBTNUnderfirstYesIsDisplayed();
});

And("verify External Contractor is displayed", () => {
  adultCoreSetQuestionsPage.verifyexternalContractorIsDisplayed();
});

And("verify External Contractor content is displayed", () => {
  adultCoreSetQuestionsPage.verifyexternalContractorValueIsDisplayed();
});

And("verify yes option is displayed", () => {
  adultCoreSetQuestionsPage.verifyyesUnderExternalContractorIsDisplayed();
});

And("verify no option is displayed", () => {
  adultCoreSetQuestionsPage.verifynoUnderExternalContractorIsDisplayed();
});

And("click on yes option", () => {
  adultCoreSetQuestionsPage.clickOnYesOption();
});

And("click on other", () => {
  adultCoreSetQuestionsPage.verifyfourthBoxUnderYesIsDisplayed();
});
And(
  "verify Complete all Adult Core Set and Child Core Set Measures to submit to CMS is displayed",
  () => {
    adultCoreSetQuestionsPage.verifycompleteAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSIsDisplayed();
  }
);

And(
  "verify Complete all Adult Core Set and Child Core Set Measures to submit to CMS content is displayed",
  () => {
    adultCoreSetQuestionsPage.verifycompleteAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSValueIsDisplayed();
  }
);

And("verify complete core set questions button is enabled", () => {
  adultCoreSetQuestionsPage.verifycompleteCoreSetQuestionsBTNIsDisplayed();
});

And("verify Do you have questions or need support is displayed", () => {
  adultCoreSetQuestionsPage.verifydoYouHaveQuestionsOrNeedSupportIsDisplayed();
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

//steps below are OY2-9942 CPA-AD

And("user can click on No option for reporting on this measure", () => {
  cPAADPage.VerifyReportingOnMeasureNo();
});

And(
  "user can click on Yes option for Are you reporting on this measure",
  () => {
    cPAADPage.verifyReportingOnMeasureYes();
  }
);
And("user can verify the title", () => {
  cPAADPage.verifycpaADtitle();
});
And("user can verify the sentence below the title", () => {
  cPAADPage.verifysentenceBelowTitle();
});
And("user can click on Yes option for Did you collect this measure?", () => {
  cPAADPage.clickdidYouCollectThisMeasure();
});
And(
  "user can click on AHRQ option for How did you report this measure?",
  () => {
    cPAADPage.clickhowDidYouReportThisMeasure();
  }
);
And("user can click on AHRQ option for Measurement Specification", () => {
  cPAADPage.clickmeasurementSpecificationAHRQ();
});
And("user can click CAHPS for Data Source", () => {
  cPAADPage.clickdataSource();
});
And(
  "user can click on No supplemental Item Sets were included for Which Supplemental Item Sets were included in the Survey",
  () => {
    cPAADPage.clicknoSupplemental();
  }
);
And("user can click AHRQ administrative protocol", () => {
  cPAADPage.clickahrqAdministrativeProtocol();
});
And("user can click on Survey sample Medicaid population", () => {
  cPAADPage.clicksurveySampleMedicaidPopulation();
});
And("user can verify Performance Measure text", () => {
  cPAADPage.verifyperformanceMeasure();
});
//And("user enters data for the additional notes text box", () => {
//  cPAADPage.verifyadditionalNotes();
//});
//And("user can attach a text file", () => {
// cPAADPage.addTextFilesToFUAADPage();
//});
//And("user can verify the uploaded text file", () => {
// cPAADPage.verifyTextIsUploaded();
//});
And(
  "user can verify that validate and complete measure buttons are enabled and clickable",
  () => {
    cPAADPage.verifyvalidateMeasureButton();
  }
);

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

Then("Click on Adult Core Set Questions", () => {
  adultCoreSetMeasurespage.clickAdultCoreSetQuestions("88.1");
});

And("verify External Quality Review Organization EQRO is displayed", () => {
  adultCoreSetQuestionsPage.verifyexternalQualityReviewOrganizationIsDisplayed();
});

And("verify MMIS Contractor is displayed", () => {
  adultCoreSetQuestionsPage.verifyMMISContractorIsDisplayed();
});

And("verify Data Analytics Contractor is displayed", () => {
  adultCoreSetQuestionsPage.verifydataAnalyticsContractorIsDisplayed();
});

And("verify other under external contractor is displayed", () => {
  adultCoreSetQuestionsPage.verifyotherUnderExternalContractorIsDisplayed();
});

When("login as approver", () => {
  loginPage.loginasApproverCognito();
});

Then("click on go to state home", () => {
  loginPage.clickGoToStateHome();
});

Then("verify add child core set is disabled", () => {
  landingPage.verifyaddChildCoreSetisDisabled();
});

Then("verify add health homes core set is disabled", () => {
  landingPage.verifyaddHealthHomesCoreSetisDisabled();
});
Then("verify submit core set button is disabled", () => {
  adultCoreSetMeasurespage.verifysubmitCoreSetBTNIsDisabled();
});
And("verify save button is disabled", () => {
  fUAADPage.verifySaveBTNIsDisabled();
});
And("verify validate measure button is disabled", () => {
  fUAADPage.verifyValidateMeasureBTNIsDisabled();
});
And("verify complete measure button is disabled", () => {
  fUAADPage.verifyCompleteMeasureBTNIsDisabled();
});

// oudAD page specific steps
And("button on the page is clickable", () => {
  oudADpage.verifySaveValidateCompletebuttonClickable();
});

And("Click on Centers for Medicare & Medicaid Services Radio Button", () => {
  oudADpage.clickCentersForMedicareMedicaidServicesRadioBTN();
});

Then("Click on OUDAD Other Data Source Radio Button", () => {
  oudADpage.clickOtherDataSourceRadioBTN();
});

And("type total rate numerator 321111", () => {
  oudADpage.typeTotalRateNumeratorInputBox("321111");
});

And("type total rate Denominator 111111", () => {
  oudADpage.typeTotalRateDenominatorInputBox("111111");
});

And("type total rate Denominator 411111", () => {
  oudADpage.typeTotalRateDenominatorInputBox("411111");
});

And("clear total rate input box", () => {
  oudADpage.clearTotalRateInputBox();
});

And("clear total rate numerator input box", () => {
  oudADpage.clearTotalRateNumeratorInputBox();
});

And("clear total rate Denominator input box", () => {
  oudADpage.clearTotalRateDenominatorInputBox();
});

And(
  "verify that only one number after decimal can populate for auto calculated total rate exists",
  () => {
    oudADpage.verifyOnlyOneNumberAfterDecimalIsDisplayed();
  }
);

And("type 8 digits total rate numerator", () => {
  oudADpage.typeTotalRateNumeratorInputBox("12345678");
});

And("type 8 digits total rate Denominator", () => {
  oudADpage.typeTotalRateDenominatorInputBox("21345678");
});

And("type letters total rate numerator", () => {
  oudADpage.typeTotalRateNumeratorInputBox("aaa");
});

And("type letters total rate Denominator", () => {
  oudADpage.typeTotalRateDenominatorInputBox("bbb");
});

And("input text in total rate box", () => {
  oudADpage.typeTotalRateDenominatorInputBox("bbb");
});

And("verify user can manually override enter total rate exists", () => {
  oudADpage.typeTotalRateInputBox("88.1");
});
