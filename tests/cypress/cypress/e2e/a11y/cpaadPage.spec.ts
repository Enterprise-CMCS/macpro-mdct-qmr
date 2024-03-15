import { testingYear } from "../../../support/constants";

describe("CPA-AD Page 508 Compliance Test", () => {
  it("Check a11y on CPAAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.get(`[data-cy="CAP-AD"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
