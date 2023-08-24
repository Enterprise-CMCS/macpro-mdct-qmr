import { testingYear } from "../../../support/constants";

describe("CCP-CH Page 508 Compliance Test", () => {
  it("Check a11y on CCP-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCP-CH");
    cy.checkA11yOfPage();
  });
});
