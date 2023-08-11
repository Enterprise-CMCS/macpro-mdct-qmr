import { testingYear } from "../../../support/constants";

describe("PQI05-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI05AD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI05-AD");
    cy.checkA11yOfPage();
  });
});
