import { testingYear } from "../../../support/constants";

describe("LBW-CH Page 508 Compliance Test", () => {
  it("Check a11y on LBW-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.get(`[data-cy="LBW-CH"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
