import { testingYear } from "../../../support/constants";

describe("Check A11y on Common Pages", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
  });

  it("Check a11y on Home Page", () => {
    cy.wait(2000);
    cy.checkA11yOfPage();
  });

  it("Check a11y on Adult Measures Page", () => {
    cy.goToAdultMeasures();
    cy.checkA11yOfPage();
  });
});
