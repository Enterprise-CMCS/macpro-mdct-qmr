import { testingYear } from "../../../support/constants";

describe("OUD-AD Page 508 Compliance Test", () => {
  it("Check a11y on OUDAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("OUD-AD");
    cy.checkA11yOfPage();
  });
});
