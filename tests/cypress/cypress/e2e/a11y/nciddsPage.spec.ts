import { testingYear } from "../../../support/constants";

describe.skip("NCIDDS-AD Page 508 Compliance Test", () => {
  it("Check a11y on NCIDDSAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("NCIDDS-AD");
    cy.checkA11yOfPage();
  });
});
