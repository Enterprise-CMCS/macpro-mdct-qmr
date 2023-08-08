import { testingYear } from "../../../support/constants";

describe("WCV-CH Page 508 Compliance Test", () => {
  it("Check a11y on WCV-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("WCV-CH");
    cy.checkA11yOfPage();
  });
});
