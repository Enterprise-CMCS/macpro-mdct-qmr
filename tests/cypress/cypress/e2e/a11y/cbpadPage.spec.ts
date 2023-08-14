import { testingYear } from "../../../support/constants";

describe("CBP-AD Page 508 Compliance Test", () => {
  it("Check a11y on CBPAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CBP-AD");
    cy.checkA11yOfPage();
  });
});
