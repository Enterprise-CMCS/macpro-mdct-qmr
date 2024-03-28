import { testingYear } from "../../../support/constants";

describe("PPC2-AD Page 508 Compliance Test", () => {
  it("Check a11y on PPCAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("PPC2-AD");
    cy.checkA11yOfPage();
  });
});
