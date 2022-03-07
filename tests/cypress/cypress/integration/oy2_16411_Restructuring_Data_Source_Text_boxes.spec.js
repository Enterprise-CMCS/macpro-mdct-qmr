const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 16411 Restructuring Data Source Text boxes", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Verify that only one description text box displayed under Data Source section if multiple alternative data sources selected", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.wait(2000);
    cy.xpath("//button[contains(text(),'Clear Data')]").click();
    cy.wait(2000);
    cy.get('[data-cy="CCP-AD"]').click();
    cy.xpath("//label[contains(text(),'Data Source')]").should("be.visible");
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
      '[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData-AdministrativeDataOther.description"]'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData-AdministrativeDataOther.description"]'
    ).type("Test1");
    cy.get('[data-cy="DataSourceDescription"]').click({ force: true });
    cy.get('[data-cy="DataSourceDescription"]').type("Test3");
    cy.get(".css-owjkmg > .chakra-text").should(
      "have.text",
      "For each data source selected above, describe which reporting entities used each data source (e.g., health plans, FFS). If the data source differed across health plans or delivery systems, identify the number of plans that used each data source:"
    );
  });

  it("Verify that no description text box displayed under Data Source section if only one alternative data source is selected", () => {
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="CCP-AD"]').click();
    cy.wait(2000);
    cy.xpath("//button[contains(text(),'Clear Data')]").click();
    cy.wait(2000);
    cy.get('[data-cy="CCP-AD"]').click();
    cy.xpath("//label[contains(text(),'Data Source')]").should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get("#DataSource0-checkbox").check();
    cy.wait(500);
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data Other");
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      "#DataSourceSelections\\.AdministrativeData\\.selected1-checkbox"
    ).check();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData-AdministrativeDataOther.description"]'
    ).click({ force: true });
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData-AdministrativeDataOther.description"]'
    ).type("Test1");
    cy.xpath(
      "//p[contains(text(),'For each data source selected above, describe whic')]"
    ).should("not.exist");
    cy.wait(2000);
  });
});
