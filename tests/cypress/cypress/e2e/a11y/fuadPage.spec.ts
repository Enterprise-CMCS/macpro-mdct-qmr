import { testingYear } from "../../../support/constants";

describe("FUAD Page 508 Compliance Test", () => {
  it("Check a11y on FUAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("FUA-AD");
    cy.checkA11yOfPage();
  });
});
