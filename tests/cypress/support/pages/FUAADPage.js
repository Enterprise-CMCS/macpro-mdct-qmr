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
const verifyPDFIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[2]/p[1]";

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
const errorMessageContent = "((//div[@class='css-0'])[27]/div)[2]";
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
  "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch div.chakra-skeleton.css-cdkrf0 section.chakra-container.css-1a3ltpp div.css-1v7r4tf:nth-child(4) div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-0:nth-child(1) label.chakra-radio.css-1pw4d56 span.chakra-radio__label.css-1i8vu1i > p.chakra-text.css-1m49yyc";

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
    cy.xpath(errorMessagePerformanceMeasure).should("be.visible");
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
    cy.get(nationalCommitteForQualityAssuranceRadioBTN).click();
  }
}
export default FUAADPAGE;
