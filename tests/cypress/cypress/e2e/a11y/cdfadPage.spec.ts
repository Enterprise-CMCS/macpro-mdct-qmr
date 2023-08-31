import { testingYear } from "../../../support/constants";

describe("CDF-AD Page 508 Compliance Test", () => {
  it("Check a11y on CDFAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CDF-AD");
    cy.checkA11yOfPage();
  });
});
