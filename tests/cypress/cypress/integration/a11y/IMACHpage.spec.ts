import { testingYear } from "../../../support/constants";

describe("IMA-CH Page 508 Compliance Test", () => {
  it("Check a11y on IMA-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("IMA-CH");
    cy.checkA11yOfPage();
  });
});
