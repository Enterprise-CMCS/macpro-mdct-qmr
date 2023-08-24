import { testingYear } from "../../../support/constants";

describe("WCC-CH Page 508 Compliance Test", () => {
  it("Check a11y on WCC-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("WCC-CH");
    cy.checkA11yOfPage();
  });
});
