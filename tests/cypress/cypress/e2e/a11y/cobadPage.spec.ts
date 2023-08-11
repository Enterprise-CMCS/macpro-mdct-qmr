import { testingYear } from "../../../support/constants";

describe("COB-AD Page 508 Compliance Test", () => {
  it("Check a11y on COBAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("COB-AD");
    cy.checkA11yOfPage();
  });
});
