import { testingYear } from "../../../support/constants";

describe("HBD-AD Page 508 Compliance Test", () => {
  it("Check a11y on HBDAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("HBD-AD");
    cy.checkA11yOfPage();
  });
});
