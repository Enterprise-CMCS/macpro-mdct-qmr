import { testingYear } from "../../../support/constants";

describe("PPC-AD Page 508 Compliance Test", () => {
  it("Check a11y on PPCAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PPC-AD");
    cy.checkA11yOfPage();
  });
});
