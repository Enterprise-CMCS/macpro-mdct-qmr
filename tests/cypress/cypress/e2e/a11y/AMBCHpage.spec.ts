import { testingYear } from "../../../support/constants";

describe("AMB-CH Page 508 Compliance Test", () => {
  it("Check a11y on AMB-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AMB-CH");
    cy.checkA11yOfPage();
  });
});
