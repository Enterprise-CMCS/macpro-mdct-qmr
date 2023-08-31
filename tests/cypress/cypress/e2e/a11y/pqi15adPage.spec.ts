import { testingYear } from "../../../support/constants";

describe("PQI15-AD Page 508 Compliance Test", () => {
  it("Check a11y on PQI15AD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PQI15-AD");
    cy.checkA11yOfPage();
  });
});
