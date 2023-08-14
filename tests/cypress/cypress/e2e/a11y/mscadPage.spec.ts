import { testingYear } from "../../../support/constants";

describe("MSC-AD Page 508 Compliance Test", () => {
  it("Check a11y on MSCAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("MSC-AD");
    cy.checkA11yOfPage();
  });
});
