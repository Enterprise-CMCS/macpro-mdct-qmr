// element is xpath, please use cy.xapth() instead of cy.get();
const FUAADLink = "//p[contains(text(),'FUA-AD')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const browseBTN = "//u[contains(text(),'browse')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const FUAADAddFileBTN =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/div[11]/div[2]/div[1]/p[1]/button[1]";
// element is xpath, please use cy.xapth() instead of cy.get();

// element is xpath, please use cy.xapth() instead of cy.get();
const verifyPDFIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[2]/p[1]";

const verifyTextFileIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[3]";
// element is xpath, please use cy.xapth() instead of cy.get();
const verifyPictureFileIsUploaded =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[11]/div[2]/div[4]";

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

export class FUAADPAGE {
  verifyURLContainsFUAAD() {
    cy.url().should("include", "FUA-AD");
  }
  verifyBrowseExists() {
    cy.xpath(browseBTN).should("be.visible");
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
    cy.xpath(nationalCommitteForQualityAssuranceRadioBTN).click();
  }
}
export default FUAADPAGE;
