import { testingYear } from "../../../support/constants";

describe("PCR-AD Page 508 Compliance Test", () => {
  it("Check a11y on PCRAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PCR-AD");
    cy.checkA11yOfPage();
  });
});
