import { testingYear } from "../../../support/constants";

describe("OY2 15211 Reporting in FY24 Tag for Alt Data Sources", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
  });

  it("N/A And Completed Statuses", () => {
    cy.get("a > [data-cy='ACS']").click();
    cy.get("[data-cy='Reporting FFY 2024-NCIIDD-AD'] > p").should(
      "have.text",
      "N/A"
    );
    cy.get(
      "[data-cy='Status-NCIIDD-AD'] > div > div:last-child > p:first-child"
    ).should("have.text", "complete");
  });
});
