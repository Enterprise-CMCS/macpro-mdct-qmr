import { testingYear } from "../../../support/constants";

describe("APM-CH Page 508 Compliance Test", () => {
  it("Check a11y on APM-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("APM-CH");
    cy.checkA11yOfPage();
  });
});
