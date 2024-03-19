import { testingYear } from "../../../support/constants";

describe("NCIIDD-AD Page 508 Compliance Test", () => {
  it("Check a11y on NCIIDDAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.get(`[data-cy="NCIIDD-AD"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
