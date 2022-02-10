//OY2-9907
const saveButtn = "//button[@class='chakra-button css-hp17lz']";
const validateMeasureButton = "//button[@class='chakra-button css-gy0j0y']";
const completeMeasureButton = "//button[@class='chakra-button css-qobkj']";
const centersForMedicareMedicaidServicesRadioBTN =
  "#MeasurementSpecification-CMS";
const otherDataSourceRadioBTN = "//p[contains(text(),'Other Data Source')]";

const totalRateNumeratorInputBox =
  "[data-cy='PerformanceMeasure-Rates.0.numerator']";
const totalRateDenominatorInputBox =
  "[data-cy='PerformanceMeasure-Rates.0.denominator']";
const totalRateInputBox = "[data-cy='PerformanceMeasure-Rates.0.rate']";

export class OUDadPage {
  verifySaveValidateCompletebuttonClickable() {
    cy.xpath(saveButtn).should("be.visible");
    cy.xpath(validateMeasureButton).should("be.visible");
    cy.xpath(completeMeasureButton).should("be.visible");
  }

  clickCentersForMedicareMedicaidServicesRadioBTN() {
    cy.get(centersForMedicareMedicaidServicesRadioBTN).click({
      force: true,
    });
  }

  clickOtherDataSourceRadioBTN() {
    cy.xpath(otherDataSourceRadioBTN).click();
    cy.wait(2000);
    cy.get(centersForMedicareMedicaidServicesRadioBTN).click({ force: true });
  }

  typeTotalRateNumeratorInputBox(s) {
    cy.get(totalRateNumeratorInputBox).type(s);
  }

  typeTotalRateDenominatorInputBox(s) {
    cy.get(totalRateDenominatorInputBox).type(s);
  }

  typeTotalRateInputBox(s) {
    cy.get(totalRateInputBox).type(s);
  }

  clearTotalRateNumeratorInputBox(s) {
    cy.get(totalRateNumeratorInputBox).clear();
  }

  clearTotalRateDenominatorInputBox(s) {
    cy.get(totalRateDenominatorInputBox).clear(s);
  }

  clearTotalRateInputBox(s) {
    cy.get(totalRateInputBox).clear(s);
  }

  verifyOnlyOneNumberAfterDecimalIsDisplayed() {
    cy.get(totalRateInputBox).should("be.visible");
  }
}
export default OUDadPage;
