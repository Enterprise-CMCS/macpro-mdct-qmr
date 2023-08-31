import { testingYear } from "../../../support/constants";

describe("CIS-CH Page 508 Compliance Test", () => {
  it("Check a11y on CIS-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CIS-CH");
    cy.checkA11yOfPage();
  });
});
