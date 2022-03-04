//OY2-8945
const saveButtn = "[data-cy='Save']";
const validateMeasureButton = "[data-cy='Validate Measure']";
const completeMeasureButton = "[data-cy='Complete Measure']";

export class CCPadPage {
  verifySaveValidateCompletebuttonClickable() {
    cy.get(saveButtn).should("be.visible");
    cy.get(validateMeasureButton).should("be.visible");
    cy.get(completeMeasureButton).should("be.visible");
  }
}
export default CCPadPage;
