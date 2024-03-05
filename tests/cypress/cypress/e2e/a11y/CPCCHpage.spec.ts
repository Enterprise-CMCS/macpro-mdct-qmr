import { testingYear } from "../../../support/constants";

describe("CPC-CH Page 508 Compliance Test", () => {
  it("Check a11y on CPC-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.get(`[data-cy="CPC-CH"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
