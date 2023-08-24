import { testingYear } from "../../../support/constants";

describe("CDF-CH Page 508 Compliance Test", () => {
  it("Check a11y on CDF-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CDF-CH");
    cy.checkA11yOfPage();
  });
});
