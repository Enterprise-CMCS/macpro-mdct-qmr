import { testingYear } from "../../../support/constants";

describe("FUH-AD Page 508 Compliance Test", () => {
  it("Check a11y on FUHAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUH-AD");
    cy.checkA11yOfPage();
  });
});
