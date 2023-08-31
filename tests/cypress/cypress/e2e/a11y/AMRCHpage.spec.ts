import { testingYear } from "../../../support/constants";

describe("AMR-CH Page 508 Compliance Test", () => {
  it("Check a11y on AMR-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AMR-CH");
    cy.checkA11yOfPage();
  });
});
