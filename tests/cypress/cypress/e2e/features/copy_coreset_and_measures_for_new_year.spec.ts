describe("Coresets and measures should reflect the chosen year", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear("2021");
  });

  it("displays the correct information based on 2021", () => {
    cy.get(`[data-cy="year-select"]`).select("2021");
    cy.get(`[data-cy="reporting-year-heading"]`).should(
      "include.text",
      "FFY 2021 Core Set Measures Reporting"
    );
    cy.goToAdultMeasures();
    cy.get(`[data-cy="state-layout-container"]`).should(
      "include.text",
      "FFY 2021"
    );
    cy.get(`[data-cy="PC01-AD"]`).should("be.visible");
    cy.goToMeasure("AMM-AD");
    cy.get("#DidReport_radiogroup").should("include.text", "FFY 2021");
  });

  it("displays the correct information based on 2022", () => {
    cy.get(`[data-cy="year-select"]`).select("2022");
    cy.get(`[data-cy="reporting-year-heading"]`).should(
      "include.text",
      "FFY 2022 Core Set Measures Reporting"
    );
    cy.goToAdultMeasures();
    cy.get(`[data-cy="state-layout-container"]`).should(
      "include.text",
      "FFY 2022"
    );
    cy.get(`[data-cy="PC01-AD"]`).should("not.exist");
    cy.goToMeasure("AMM-AD");
    cy.get("#DidReport_radiogroup").should("include.text", "FFY 2022");
  });

  it("displays the correct information based on 2023", () => {
    cy.get(`[data-cy="year-select"]`).select("2023");
    cy.get(`[data-cy="reporting-year-heading"]`).should(
      "include.text",
      "FFY 2023 Core Set Measures Reporting"
    );
    cy.goToAdultMeasures();
    cy.get(`[data-cy="state-layout-container"]`).should(
      "include.text",
      "FFY 2023"
    );
    cy.get(`[data-cy="PC01-AD"]`).should("not.exist");
    cy.goToMeasure("AMM-AD");
    cy.get("#DidReport_radiogroup").should("include.text", "FFY 2023");
  });
});
