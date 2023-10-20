import { testingYear } from "../../../support/constants";

describe("LRCD-CH Page 508 Compliance Test", () => {
  it("Check a11y on LRCD-CH Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.get(`[data-cy="LRCD-CH"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
