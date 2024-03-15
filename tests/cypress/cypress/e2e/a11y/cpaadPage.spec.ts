import { testingYear } from "../../../support/constants";

describe("CPA-AD Page 508 Compliance Test", () => {
  it("Check a11y on CPAAD Page", () => {
    cy.login();
    cy.selectYear("2023");
    cy.goToAdultMeasures();
    cy.goToMeasure("CPA-AD");
    cy.checkA11yOfPage();
  });
});
