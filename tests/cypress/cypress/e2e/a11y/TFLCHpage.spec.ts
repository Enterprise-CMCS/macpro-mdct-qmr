import { testingYear } from "../../../support/constants";

describe("TFL-CH Page 508 Compliance Test", () => {
  it("Check a11y on TFL-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("TFL-CH");
    cy.checkA11yOfPage();
  });
});
