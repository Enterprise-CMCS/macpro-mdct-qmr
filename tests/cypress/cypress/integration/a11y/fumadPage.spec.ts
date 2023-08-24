import { testingYear } from "../../../support/constants";

describe("FUM-AD Page 508 Compliance Test", () => {
  it("Check a11y on FUMAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUM-AD");
    cy.checkA11yOfPage();
  });
});
