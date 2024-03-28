import { testingYear } from "../../../support/constants";

describe("MSC-AD Page 508 Compliance Test", () => {
  it("Check a11y on MSCAD Page", () => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.get(`[data-cy="MSC-AD"]`, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.checkA11yOfPage();
  });
});
