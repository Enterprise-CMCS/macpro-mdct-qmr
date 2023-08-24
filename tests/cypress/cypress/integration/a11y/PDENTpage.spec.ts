import { testingYear } from "../../../support/constants";

describe.skip("PDENT-CH Page 508 Compliance Test", () => {
  it("Check a11y on PDENT-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("PDENT-CH");
    cy.checkA11yOfPage();
  });
});
