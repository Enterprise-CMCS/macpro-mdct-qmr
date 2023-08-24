import { testingYear } from "../../../support/constants";

describe("PQI08-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI08AD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI08-AD");
    cy.checkA11yOfPage();
  });
});
