import { testingYear } from "../../../support/constants";

describe("OY2 16411 Restructuring Data Source Text boxes", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });

  it("Verify that only one description text box displayed under Data Source section if multiple alternative data sources selected", () => {
    cy.get('[data-cy="Data Source"]').should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#DataSource0-checkbox").check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get("#DataSource1-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click({ force: true });
    cy.get('[data-cy="DataSourceSelections.OtherDataSource.description"]').type(
      "Test2"
    );
    cy.wait(500);
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).type("Test1");
    cy.get('[data-cy="DataSourceDescription"]').click({ force: true });
    cy.get('[data-cy="DataSourceDescription"]').type("Test3");
    cy.get(".css-owjkmg > .chakra-text").should(
      "have.text",
      "For each data source selected above, describe which reporting entities used each data source (e.g., health plans, FFS). If the data source differed across health plans or delivery systems, identify the number of plans or delivery systems that used each data source."
    );
  });

  it("Verify that no description text box displayed under Data Source section if only one alternative data source is selected", () => {
    cy.get('[data-cy="Data Source"]').should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#DataSource0-checkbox").check();
    cy.wait(500);
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData0\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0-AdministrativeDataOther.description"]'
    ).type("Test1");
    cy.wait(2000);
  });
});
