import { testingYear } from "../../../support/constants";

describe("CCW-AD Page 508 Compliance Test", () => {
  it("Check a11y on CCWAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCW-AD");
    cy.checkA11yOfPage();
  });
});
