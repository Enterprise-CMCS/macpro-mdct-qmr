//OY2-9907
const saveButtn = "[data-cy='Save']";
const validateMeasureButton = "[data-cy='Validate Measure']";
const completeMeasureButton = "[data-cy='Complete Measure']";
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
    cy.get(saveButtn).should("be.visible");
    cy.get(validateMeasureButton).should("be.visible");
    cy.get(completeMeasureButton).should("be.visible");
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
    cy.get(totalRateNumeratorInputBox).clear({ force: true });
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
