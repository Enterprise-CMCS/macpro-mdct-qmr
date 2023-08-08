import { testingYear } from "../../../support/constants";

describe("CCW-CH Page 508 Compliance Test", () => {
  it("Check a11y on CCW-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CCW-CH");
    cy.checkA11yOfPage();
  });
});
