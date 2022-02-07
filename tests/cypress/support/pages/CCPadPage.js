//OY2-8945
const saveButtn = "//button[@class='chakra-button css-hp17lz']";
const validateMeasureButton = "//button[@class='chakra-button css-gy0j0y']";
const completeMeasureButton = "//button[@class='chakra-button css-qobkj']";

export class CCPadPage {
  verifySaveValidateCompletebuttonClickable() {
    cy.xpath(saveButtn).should("be.visible");
    cy.xpath(validateMeasureButton).should("be.visible");
    cy.xpath(completeMeasureButton).should("be.visible");
  }
}
export default CCPadPage;
