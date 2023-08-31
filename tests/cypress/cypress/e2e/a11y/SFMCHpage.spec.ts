import { testingYear } from "../../../support/constants";

describe("SFM-CH Page 508 Compliance Test", () => {
  it("Check a11y on SFM-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("SFM-CH");
    cy.checkA11yOfPage();
  });
});
