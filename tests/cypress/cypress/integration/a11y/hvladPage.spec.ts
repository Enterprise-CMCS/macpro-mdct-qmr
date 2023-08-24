import { testingYear } from "../../../support/constants";

describe("HVL-AD Page 508 Compliance Test", () => {
  it("Check a11y on HVLAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("HVL-AD");
    cy.checkA11yOfPage();
  });
});
