import { testingYear } from "../../../support/constants";

describe("PQI01-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI01AD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI01-AD");
    cy.checkA11yOfPage();
  });
});
