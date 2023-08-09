import { testingYear } from "../../../support/constants";

describe("HPCMI-AD Page 508 Compliance Test", () => {
  it("Check a11y on HPCMIAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("HPCMI-AD");
    cy.checkA11yOfPage();
  });
});
