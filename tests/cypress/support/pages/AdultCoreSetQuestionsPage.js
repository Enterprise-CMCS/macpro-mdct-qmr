// element is xpath, please use cy.xapth() instead of cy.get();
const adultCoreSetQuestionHeader =
  "//h1[contains(text(),'Adult Core Set Questions')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const adultCoreSetQuestionContent =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/div[1]/p[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const deliverySystem = "//p[contains(text(),'Delivery System')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const deliverySystemContent =
  "//h3[contains(text(),'As of September 30, 2021 what percentage of your M')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const ages21To64 = "//p[contains(text(),'Ages 21 to 64')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const ages65AndOlder = "//p[contains(text(),'Age 65 and older')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const feeForService = "//p[contains(text(),'Fee-for-Service')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const PCCM = "//p[contains(text(),'PCCM')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const managedCare = "//p[contains(text(),'Managed Care')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const integratedCareModelICM =
  "//p[contains(text(),'Integrated Care Model (ICM)')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const addAnotherBTN = "//tbody/div[1]/button[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const totalAllAges = "//p[contains(text(),'Total (all ages)')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const ages21To64TotalValue =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/ol[1]/li[1]/table[1]/tfoot[1]/tr[1]/td[1]/div[1]/input[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const ages65AndOlderTotalValue =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/ol[1]/li[1]/table[1]/tfoot[1]/tr[1]/td[2]/div[1]/input[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const auditOrValidationMeasures =
  "//p[contains(text(),'Audit or Validation of Measures')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const auditOrValidationMeasuresValue =
  "//h3[contains(text(),'Were any of the Core Set meaures audited or valida')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const yesSomeOfTheCoreSetMeasuresHaveBeenAuditedOrValidated =
  "//p[contains(text(),'Yes, some of the Core Set measures have been audit')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const noNoneOfTheCoreSetMeasuresHaveBeenAuditedOrValidated =
  "//p[contains(text(),'No, none of the Core Set measures have been audite')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const addAnotherBTNUnderfirstYes =
  "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/ol[1]/li[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[1]";
// element is xpath, please use cy.xapth() instead of cy.get();
const externalContractor = "//p[contains(text(),'External Contractor')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const externalContractorValue =
  "//h3[contains(text(),'Please indicate whether your state obtained assist')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const yesUnderExternalContractor =
  "//p[contains(text(),'Yes, we did obtained assistance from one or more e')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const noUnderExternalContractor =
  "//p[contains(text(),'No, we calculated all the measure internally.')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const firstBoxUnderYes =
  "//p[contains(text(),'External Quality Review Organization (EQRO)')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const secondBoxUnderYes = "//p[contains(text(),'MMIS Contractor')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const thirdBoxUnderYes = "//p[contains(text(),'Data Analytics Contractor')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const fourthBoxUnderYes = "//p[contains(text(),'Other')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const completeAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMS =
  "//p[contains(text(),'Complete all Adult Core Set and Child Core Set Mea')]";
// element is xpath, please use cy.xapth() instead of cy.get();
const completeAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSValue =
  "//h3[contains(text(),'Complete all Adult Core Set and Adult Core Set Mea')]";
const completeCoreSetQuestionsBTN =
  "//button[contains(text(),'Complete Core Set Questions')]";
const doYouHaveQuestionsOrNeedSupport =
  "//h3[contains(text(),'Do you have questions or need support?')]";

export class AdultCoreSetQuestionsPage {
  verifyAdultCoreSetQuestionHeaderIsDisplayed() {
    cy.xpath(adultCoreSetQuestionHeader).should("be.visible");
  }

  verifyadultCoreSetQuestionContentIsDisplayed() {
    cy.xpath(adultCoreSetQuestionContent).should("be.visible");
  }

  verifydeliverySystemIsDisplayed() {
    cy.xpath(deliverySystem).should("be.visible");
  }

  verifydeliverySystemContentIsDisplayed() {
    cy.xpath(deliverySystemContent).should("be.visible");
  }

  verifyages21To64IsDisplayed() {
    cy.xpath(ages21To64).should("be.visible");
  }

  verifyages65AndOlderIsDisplayed() {
    cy.xpath(ages65AndOlder).should("be.visible");
  }

  verifyfeeForServiceIsDisplayed() {
    cy.xpath(feeForService).should("be.visible");
  }

  verifyPCCMIsDisplayed() {
    cy.xpath(PCCM).should("be.visible");
  }

  verifymanagedCareIsDisplayed() {
    cy.xpath(managedCare).should("be.visible");
  }

  verifyintegratedCareModelICMIsDisplayed() {
    cy.xpath(integratedCareModelICM).should("be.visible");
  }

  verifyaddAnotherBTNIsDisplayed() {
    cy.xpath(addAnotherBTN).should("be.visible");
  }

  verifytotalAllAgesIsDisplayed() {
    cy.xpath(totalAllAges).should("be.visible");
  }

  verifyages21To64TotalValueIsDisplayed() {
    cy.xpath(ages21To64TotalValue).should("be.visible");
  }

  verifyages65AndOlderTotalValueIsDisplayed() {
    cy.xpath(ages65AndOlderTotalValue).should("be.visible");
  }

  verifyagesauditOrValidationMeasuresIsDisplayed() {
    cy.xpath(auditOrValidationMeasures).should("be.visible");
  }

  verifyages65AndOlderTotalValueIsDisplayed() {
    cy.xpath(ages65AndOlderTotalValue).should("be.visible");
  }

  verifyauditOrValidationMeasuresValueIsDisplayed() {
    cy.xpath(auditOrValidationMeasuresValue).should("be.visible");
  }

  verifyyesSomeOfTheCoreSetMeasuresHaveBeenAuditedOrValidatedIsDisplayed() {
    cy.xpath(yesSomeOfTheCoreSetMeasuresHaveBeenAuditedOrValidated).should(
      "be.visible"
    );
  }

  clickYesOptionOnSection2() {
    cy.xpath(yesSomeOfTheCoreSetMeasuresHaveBeenAuditedOrValidated).click();
  }

  verifynoNoneOfTheCoreSetMeasuresHaveBeenAuditedOrValidatedIsDisplayed() {
    cy.xpath(noNoneOfTheCoreSetMeasuresHaveBeenAuditedOrValidated).should(
      "be.visible"
    );
  }

  verifyaddAnotherBTNUnderfirstYesIsDisplayed() {
    cy.xpath(addAnotherBTNUnderfirstYes).should("be.visible");
  }

  verifyexternalContractorIsDisplayed() {
    cy.xpath(externalContractor).should("be.visible");
  }

  verifyexternalContractorValueIsDisplayed() {
    cy.xpath(externalContractorValue).should("be.visible");
  }

  verifyyesUnderExternalContractorIsDisplayed() {
    cy.xpath(yesUnderExternalContractor).should("be.visible");
  }

  clickOnYesOption() {
    cy.xpath(yesUnderExternalContractor).click();
  }

  verifynoUnderExternalContractorIsDisplayed() {
    cy.xpath(noUnderExternalContractor).should("be.visible");
  }

  verifyfirstBoxUnderYesIsDisplayed() {
    cy.xpath(firstBoxUnderYes).should("be.visible");
  }

  verifysecondBoxUnderYesIsDisplayed() {
    cy.xpath(secondBoxUnderYes).should("be.visible");
  }

  verifythirdBoxUnderYesIsDisplayed() {
    cy.xpath(thirdBoxUnderYes).should("be.visible");
  }

  verifyfourthBoxUnderYesIsDisplayed() {
    cy.xpath(fourthBoxUnderYes).should("be.visible");
  }

  verifycompleteAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSIsDisplayed() {
    cy.xpath(
      completeAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMS
    ).should("be.visible");
  }

  verifycompleteAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSValueIsDisplayed() {
    cy.xpath(
      completeAllAdultCoreSetAndChildCoreSetMeasuresToSubmitToCMSValue
    ).should("be.visible");
  }

  verifycompleteCoreSetQuestionsBTNIsDisplayed() {
    cy.xpath(completeCoreSetQuestionsBTN).should("be.visible");
  }

  verifydoYouHaveQuestionsOrNeedSupportIsDisplayed() {
    cy.xpath(doYouHaveQuestionsOrNeedSupport).should("be.visible");
  }
}
export default AdultCoreSetQuestionsPage;
