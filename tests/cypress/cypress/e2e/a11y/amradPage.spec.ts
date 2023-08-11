import { testingYear } from "../../../support/constants";

describe("AMR-AD Page 508 Compliance Test", () => {
  it("Check a11y on AMRAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("AMR-AD");
    cy.checkA11yOfPage();
  });
});
