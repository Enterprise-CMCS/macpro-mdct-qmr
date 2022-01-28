// element is xpath, please use cy.xapth() instead of cy.get();
const FUAADLink = "//p[contains(text(),'FUA-AD')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const browseBTN = "//u[contains(text(),'browse')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const FUAADAddFileBTN =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/div[11]/div[2]/div[1]/p[1]/button[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const verifyPDFIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[2]/p[1]";
// element is xpath, please use cy.xapth() instead of cy.get();

const verifyTextFileIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[3]";
// element is xpath, please use cy.xapth() instead of cy.get();
const verifyPictureFileIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[4]";

//OY2-15504
const saveButtn = "//button[@class='chakra-button css-hp17lz']";
const saveStatusUnderSaveButton = "//p[@class='chakra-text css-nr0v7p']";
const NCQARadioButton =
  "(//span[@class='chakra-radio__control css-gzpnyx'])[5]";
const selectOption = "//div[@class='chakra-select__wrapper css-42b2qy']";
const HEDISDropdown2020 =
  "(//div[@class='chakra-select__wrapper css-42b2qy']/select/option)[2]";
const validateMeasureButton = "//button[@class='chakra-button css-gy0j0y']";
const completeMeasureButton = "//button[@class='chakra-button css-qobkj']";
const sentenceUnderCompleteMeasureOne = "//p[@class='chakra-text css-thvrsi']";
const sentenceUnderCompleteMeasureTwo = "//p[@class='chakra-text css-1xpb69n']";
const errorMessagePerformanceMeasure = "((//div[@class='css-0'])[27]/div)[1]";
const errorMessageContent =
  "//div[contains(text(),'At least one Performance Measure Numerator, Denomi')]";
const popupBoxMessageHeader = "//header[@id='chakra-modal--header-137']";
const popupBoxMessageContent = "//div[@id='chakra-modal--body-137']";
const popupBoxYes = "//button[@class='chakra-button css-mn8nh9']";
const popupBoxNo = "//button[@class='chakra-button css-cirab6']";
// element is xpath, please use cy.xapth() instead of cy.get();
const verifyNcqaText =
  "//p[contains(text(),'NCQA, the measure steward, changed its naming conv')]";
const hedisDropdown = "//select[@id='field-237']";
const verifyFFY2021 =
  "//option[contains(text(),'HEDIS MY 2020 (FFY 2021 Core Set Reporting)')]";
const verifyFFY2020 =
  "//option[contains(text(),'HEDIS 2020 (FFY 2020 Core Set Reporting)')]";
const verifyFFY2019 =
  "//option[contains(text(),'HEDIS 2019 (FFY 2019 Core Set Reporting)')]";
const nationalCommitteForQualityAssuranceRadioBTN =
  "//p[contains(text(),'National Committee for Quality Assurance (NCQA)/He')]";
// element is xpath, please use cy.xapth() instead of cy.get();

const all_check_box = "//span[ contains(@class, 'check')]/p";
const reporting_yes = "(//span[ contains(@class, 'radio')]/p)[1]";
const reporting_no = "(//span[ contains(@class, 'radio')]/p)[2]";
const sample_text = "This is a test from the QA !";

//Elements for OY2-8940 Deviation and Optional Measure Stratification
const yesOptionReportingfirst =
  "(//span[@class='chakra-radio__control css-gzpnyx'])[1]";
const ncqaHedisRadio = "(//span[@class='chakra-radio__control css-gzpnyx'])[5]";
const numeratorOne = "(//input[@class='chakra-input css-1c6j008'])[1]";
const denominatorOne = "(//input[@class='chakra-input css-1c6j008'])[2]";
const rateOne = "(//input[@class='chakra-input css-1c6j008'])[3]";
const yesDeviations = "(//span[@class='chakra-radio__control css-gzpnyx'])[9]";
const followUp30EDvisit =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[12]";
const age18to64 = "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[13]";
const numeratorDeviation =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[14]";
const numeratorExplaintext =
  "//textarea[@name='DeviationFields-Within30.0.numerator']";
const denominatorDeviation =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[15]";
const denominatorDeviationExplain =
  "//textarea[@name='DeviationFields-Within30.0.denominator']";
const otherDeviation =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[16]";
const otherDeviationExplain =
  "//textarea[@name='DeviationFields-Within30.0.other']";
const raceNonHispanic =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[17]";
const whiteUnderRace =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[18]";
const age18to64Race =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[19]";
const numeratorUnderRace = "(//input[@class='chakra-input css-1c6j008'])[13]";
const denominatorUnderRace = "(//input[@class='chakra-input css-1c6j008'])[14]";
const rateUnderRace = "(//input[@class='chakra-input css-1c6j008'])[15]";
const additionalRace =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[24]";
const defineAdditionalRace = "//input[@name='AddtnlNonHispanicRace.0']";
const age18to64UnderAdditionalRace =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[25]";
const numeratorUnderAdditionalRace =
  "(//input[@class='chakra-input css-1c6j008'])[17]";
const denominatorUnderAdditionalRace =
  "(//input[@class='chakra-input css-1c6j008'])[18]";
const raateUnderAdditionalRace = "//input[@id='field-149']";
const otherOptionUnderMeasurementSpecification =
  "(//span[@class='chakra-radio__control css-gzpnyx'])[6]";
const describeRateUnderOPM =
  "//input[@name='OtherPerformanceMeasure-Rates.0.description']";
const raceUnderOMS =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[12]";
const whiteUnderOMS =
  "(//span[@class='chakra-checkbox__control css-1oi6yiz'])[13]";
const describeRateUnderOMS = "(//p[@class='chakra-text css-1m49yyc'])[24]";

// -- SECTION: What you are not reporting on this measure?
const check_service_not_covered = "(//span[ contains(@class, 'check')]/p)[1]";
const check_population_not_covered =
  "(//span[ contains(@class, 'check')]/p)[2]";
const radio_partial_popu_not_covered =
  "(//span[ contains(@class, 'radio')]/p)[4]";
const text_explain_partial_popu = "(//textarea)[1]";

const check_data_not_available = "(//span[ contains(@class, 'check')]/p)[3]";
const check_data_inconsistencies = "(//span[ contains(@class, 'check')]/p)[6]";
const text_explain_inconsistencies = "(//textarea)[2]";

const check_source_not_accessible = "(//span[ contains(@class, 'check')]/p)[7]";
const check_source_not_accessible_other =
  "(//span[ contains(@class, 'check')]/p)[10]";
const text_source_not_accessible_other_explain = "(//textarea)[3]";

const check_info_not_collected = "(//span[ contains(@class, 'check')]/p)[11]";
const check_info_not_collected_by_provider =
  "(//span[ contains(@class, 'check')]/p)[12]";

const check_limitation_with_data = "(//span[ contains(@class, 'check')]/p)[15]";
const text_describe_limitation = "(//textarea)[4]";

const check_small_sample_size = "(//span[ contains(@class, 'check')]/p)[16]";
const num_sample_size = "//input[contains(@data-testid, 'number')]";

// -------

const radio_all_options = "//span[ contains(@class, 'radio')]/p";

export class FUAADPAGE {
  verifyURLContainsFUAAD() {
    cy.url().should("include", "FUA-AD");
  }

  verifyBrowseExists() {
    cy.xpath(browseBTN).should("be.visible");
  }
  verifySentenceUnderCompleteMeasure() {
    cy.xpath(sentenceUnderCompleteMeasureOne).should("be.visible");
    cy.xpath(sentenceUnderCompleteMeasureOne).contains(
      'Please select "Validate Measure" to check any error present on the measure prior to completion'
    );
    cy.xpath(sentenceUnderCompleteMeasureTwo).should("be.visible");
    cy.xpath(sentenceUnderCompleteMeasureTwo).contains(
      "Complete the measure and mark it for submission to CMS for review"
    );
  }

  clickSaveButtnVerifyStatus() {
    cy.xpath(saveButtn).click();
    cy.wait(500);
    //cy.xpath(saveStatusUnderSaveButton).contains("Saved Moments Ago");
  }

  clickNCQAHEDIS() {
    cy.xpath(NCQARadioButton).click();
  }

  clickHEDISMy2020() {
    cy.xpath(selectOption).click({ force: true });
    //cy.xpath(HEDISDropdown2020).click({force:true});
  }

  clickValidateMeasureButtonVerify() {
    cy.xpath(validateMeasureButton).click();
    cy.xpath(saveStatusUnderSaveButton).contains("Saved Moments Ago");
    cy.xpath(errorMessageContent).contains(
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  }

  clickCompleteMeasureButtonVerify() {
    cy.xpath(completeMeasureButton).click();
    cy.xpath(popupBoxMessageHeader).should("be.visible");
    cy.xpath(popupBoxMessageContent).contains(
      "There are still errors on this measure, would you still like to complete?"
    );
  }

  clickNoOption() {
    cy.xpath(popupBoxYes).should("be.visible");
    cy.xpath(popupBoxNo).click();
  }

  addFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "adobe.pdf", {
      subjectType: "drag-n-drop",
    });
  }
  verifyPDFIsUploaded() {
    cy.xpath(verifyPDFIsUploaded).should("be.visible");
  }

  addTextFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "test3.docx", {
      subjectType: "drag-n-drop",
    });
  }
  verifyTextIsUploaded() {
    cy.xpath(verifyTextFileIsUploaded).should("be.visible");
  }

  addPictureFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "picture.jpg", {
      subjectType: "drag-n-drop",
    });
  }
  verifyPictureFileIsUploaded() {
    cy.xpath(verifyPictureFileIsUploaded).should("be.visible");
  }

  verifyNcqaText() {
    cy.xpath(verifyNcqaText).should("be.visible");
  }
  hedisDropdown() {
    cy.xpath(hedisDropdown).click();
  }
  verifyFFY2021() {
    cy.xpath(verifyFFY2021).should("be.visible");
  }
  verifyFFY2020() {
    cy.xpath(verifyFFY2020).should("be.visible");
  }
  verifyFFY2019() {
    cy.xpath(verifyFFY2019).should("be.visible");
  }
  clicknationalCommitteForQualityAssuranceRadioBTN() {
    cy.xpath(nationalCommitteForQualityAssuranceRadioBTN).click({
      force: true,
    });
  }
  verifyURLContainsFUAAD() {
    cy.url().should("include", "FUA-AD");
  }

  verifyBrowseExists() {
    cy.xpath(browseBTN).should("be.visible");
  }
  verifySentenceUnderCompleteMeasure() {
    cy.xpath(sentenceUnderCompleteMeasureOne).should("be.visible");
    cy.xpath(sentenceUnderCompleteMeasureOne).contains(
      'Please select "Validate Measure" to check any error present on the measure prior to completion'
    );
    cy.xpath(sentenceUnderCompleteMeasureTwo).should("be.visible");
    cy.xpath(sentenceUnderCompleteMeasureTwo).contains(
      "Complete the measure and mark it for submission to CMS for review"
    );
  }

  clickSaveButtnVerifyStatus() {
    cy.xpath(saveButtn).click();
    cy.wait(500);
    //cy.xpath(saveStatusUnderSaveButton).contains("Saved Moments Ago");
  }

  clickNCQAHEDIS() {
    cy.xpath(NCQARadioButton).click();
  }

  clickHEDISMy2020() {
    cy.xpath(selectOption).click({ force: true });
    //cy.xpath(HEDISDropdown2020).click({force:true});
  }

  clickValidateMeasureButtonVerify() {
    cy.xpath(validateMeasureButton).click();
    cy.xpath(saveStatusUnderSaveButton).contains("Saved Moments Ago");
    cy.xpath(errorMessageContent).contains(
      "At least one Performance Measure Numerator, Denominator, and Rate must be completed"
    );
  }

  clickCompleteMeasureButtonVerify() {
    cy.xpath(completeMeasureButton).click();
    cy.xpath(popupBoxMessageHeader).should("be.visible");
    cy.xpath(popupBoxMessageContent).contains(
      "There are still errors on this measure, would you still like to complete?"
    );
  }

  clickNoOption() {
    cy.xpath(popupBoxYes).should("be.visible");
    cy.xpath(popupBoxNo).click();
  }

  addFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "adobe.pdf", {
      subjectType: "drag-n-drop",
    });
  }
  verifyPDFIsUploaded() {
    cy.xpath(verifyPDFIsUploaded).should("be.visible");
  }

  addTextFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "test3.docx", {
      subjectType: "drag-n-drop",
    });
  }
  verifyTextIsUploaded() {
    cy.xpath(verifyTextFileIsUploaded).should("be.visible");
  }

  addPictureFilesToFUAADPage() {
    const filePath = "/files/";
    cy.xpath(browseBTN).attachFile(filePath + "picture.jpg", {
      subjectType: "drag-n-drop",
    });
  }
  verifyPictureFileIsUploaded() {
    cy.xpath(verifyPictureFileIsUploaded).should("be.visible");
  }

  verifyNcqaText() {
    cy.xpath(verifyNcqaText).should("be.visible");
  }
  hedisDropdown() {
    cy.xpath(hedisDropdown).click();
  }
  verifyFFY2021() {
    cy.xpath(verifyFFY2021).should("be.visible");
  }
  verifyFFY2020() {
    cy.xpath(verifyFFY2020).should("be.visible");
  }
  verifyFFY2019() {
    cy.xpath(verifyFFY2019).should("be.visible");
  }
  clicknationalCommitteForQualityAssuranceRadioBTN() {
    cy.wait(2000);
    cy.xpath(nationalCommitteForQualityAssuranceRadioBTN).click();
  }
  clickYesForReportingMeasure() {
    cy.wait(2000);
    cy.xpath(yesOptionReportingfirst).click();
  }

  clickNCQAHEDISradio() {
    cy.xpath(ncqaHedisRadio).click();
  }

  enterNumeratorDenominator() {
    cy.xpath(numeratorOne).type("10");
    cy.xpath(denominatorOne).type("20");
  }

  clickYesDeviation() {
    cy.wait(2000);
    cy.xpath(yesDeviations).click();
  }

  clickFollowUp30Days() {
    cy.xpath(followUp30EDvisit).click();
  }

  clickAge18to64() {
    cy.xpath(age18to64).click();
  }

  clickNumeratorDenominatorOtherExplain() {
    cy.xpath(numeratorDeviation).click();
    cy.wait(2000);
    cy.xpath(numeratorExplaintext).type("test");
    cy.xpath(denominatorDeviation).click();
    cy.wait(2000);
    cy.xpath(denominatorDeviationExplain).type("test");
    cy.xpath(otherDeviation).click();
    cy.wait(2000);
    cy.xpath(otherDeviationExplain).type("test");
  }

  clickRaceNonHispanic() {
    cy.xpath(raceNonHispanic).click();
  }

  clickWhiteAge18to64() {
    cy.xpath(whiteUnderRace).click();
    cy.wait(1000);
    cy.xpath(age18to64Race).click();
  }

  enterNumeratorDenominatorUnderRace() {
    cy.wait(2000);
    cy.xpath(numeratorUnderRace).type("10");
    cy.wait(2000);
    cy.xpath(denominatorUnderRace).type("20");
  }

  clickAdditionalRace() {
    cy.xpath(additionalRace).click();
    cy.xpath(defineAdditionalRace).type("test");
  }

  clickAge18to64UnderAdditionalRace() {
    cy.xpath(age18to64UnderAdditionalRace).click();
  }

  enterNumeratorDenominatorUnderAdditionalRace() {
    cy.xpath(numeratorUnderAdditionalRace).type("10");
    cy.xpath(denominatorUnderAdditionalRace).type("20");
  }

  clickOtherUnderMeasureSpecification() {
    cy.xpath(otherOptionUnderMeasurementSpecification).click();
  }

  enterDescribeRateUnderOPM() {
    cy.xpath(describeRateUnderOPM).clear();
    cy.xpath(describeRateUnderOPM).type("test66");
  }

  verifyDescribeRateUnderOMS() {
    cy.xpath(raceUnderOMS).click();
    cy.xpath(whiteUnderOMS).click();
    cy.xpath(describeRateUnderOMS).contains("test66");
  }

  verifyReportingOnMeasureYes() {
    cy.wait(500);
    cy.xpath(reporting_yes).click();

    // Initial Checkbox clicks
    const check_all_options = "//span[ contains(@class, 'check')]/p";
    let checkXpath = "(//span[ contains(@class, 'check')]/p)[";
    for (let i = 1; i <= 11; i++) {
      let finalXapth = checkXpath + i + "]";
      cy.xpath(finalXapth).scrollIntoView();
      cy.xpath(finalXapth).click();
      cy.wait(500);
    }

    //Expanded checkbox clicks
    const unched_checkbox =
      "//span[ contains(@class, 'check') and not(@data-checked)]";
    cy.xpath(unched_checkbox).each((item, index, list) => {
      cy.wrap(item).scrollIntoView();
      cy.wrap(item).click({ force: true });
      cy.wait(500);
    });

    cy.scrollTo("top");
    cy.wait(5000);
    const radi_all_options_besides_reporting_measures =
      "(//span[contains(@class, 'radio')]/p)[contains(text(), 'Yes,')]";
    cy.xpath(radi_all_options_besides_reporting_measures).each(
      (item, index, list) => {
        cy.wrap(item).scrollIntoView();
        cy.wrap(item).click({ force: true });
        cy.wait(500);
      }
    );

    // Input to the text area
    const displayed_text_areas = "//textarea";
    cy.scrollTo("top");
    cy.wait(5000);
    cy.xpath(displayed_text_areas).each((item, index, list) => {
      cy.wrap(item).scrollIntoView();
      cy.wrap(item).clear();
      cy.wait(500);
      cy.wrap(item).type(sample_text);
      cy.wait(500);
    });

    // Input the percentage
    const all_number_input = "//input[ contains(@data-testid, 'number') ]";
    cy.scrollTo("top");
    cy.wait(5000);
    cy.xpath(all_number_input).each((item, index, list) => {
      cy.wrap(item).scrollIntoView();
      cy.wrap(item).clear();
      cy.wait(500);
      cy.wrap(item).type(20);
      cy.wait(500);
    });

    // cy.wait(1000);
    // const describe_rate = "//input[@type='text' and contains(@name, 'Rates')]";
    // cy.xpath(describe_rate).scrollIntoView();
    // cy.xpath(describe_rate).clear();
    // cy.xpath(describe_rate).type("This is a QA testing for the Rate");
    // cy.wait(500);
  }

  VerifyReportingOnMeasureNo() {
    cy.wait(500);
    cy.xpath(reporting_no).click();
    cy.xpath(check_service_not_covered).click();
    cy.xpath(check_population_not_covered).click();
    cy.xpath(radio_partial_popu_not_covered).click();
    cy.xpath(text_explain_partial_popu).type(sample_text);

    cy.xpath(check_data_not_available).click();
    cy.xpath(check_data_inconsistencies).click();
    cy.xpath(text_explain_inconsistencies).type(sample_text);

    cy.xpath(check_source_not_accessible).click();
    cy.xpath(check_source_not_accessible_other).click();
    cy.xpath(text_source_not_accessible_other_explain).type(sample_text);

    cy.xpath(check_info_not_collected).click();
    cy.xpath(check_info_not_collected_by_provider).click();

    cy.xpath(check_limitation_with_data).click();
    cy.xpath(text_describe_limitation).type(sample_text);

    cy.xpath(check_small_sample_size).click();
    cy.xpath(num_sample_size).type(22);
  }

  verifyAges() {
    cy.wait(2000);
    cy.xpath(yesOptionReportingfirst).click();
    cy.xpath(ncqaHedisRadio).click();
    // All numerator input 4 of them
    let numerator = "(//label[text()='Numerator']/../input)[";
    for (let i = 1; i <= 4; i++) {
      let finalXapth = numerator + i + "]";
      cy.xpath(finalXapth).clear();
      cy.xpath(finalXapth).type(10);
      cy.wait(100);
    }

    // All denominator input 4 of them
    let denominator = "(//label[text()='Denominator']/../input)[";
    for (let i = 1; i <= 4; i++) {
      let finalXapth = denominator + i + "]";
      cy.xpath(finalXapth).clear();
      cy.xpath(finalXapth).type(20);
      cy.wait(100);
    }

    // All rate input, 4 of them
    let rate = "(//label[text()='Rate']/../input)[";
    for (let i = 1; i <= 4; i++) {
      let finalXapth = rate + i + "]";
      cy.xpath(finalXapth).invoke("attr", "value").should("eq", "50.0");
      cy.wait(500);
    }
  }
}
export default FUAADPAGE;
