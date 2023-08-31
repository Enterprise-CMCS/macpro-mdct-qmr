import { testingYear } from "../../../support/constants";

describe("ADD-CH Page 508 Compliance Test", () => {
  it("Check a11y on ADD-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("ADD-CH");
    cy.checkA11yOfPage();
  });
});
