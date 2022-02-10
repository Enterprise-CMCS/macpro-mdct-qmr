//OY2-9907
const saveButtn = "//button[@class='chakra-button css-hp17lz']";
const validateMeasureButton = "//button[@class='chakra-button css-gy0j0y']";
const completeMeasureButton = "//button[@class='chakra-button css-qobkj']";
const centersForMedicareMedicaidServicesRadioBTN =
  "#MeasurementSpecification-CMS";
const otherDataSourceRadioBTN = "//p[contains(text(),'Other Data Source')]";

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
}
export default OUDadPage;
