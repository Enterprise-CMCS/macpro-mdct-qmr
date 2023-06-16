describe("Date Range Adjustment for Start/End date", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });
  it("Check if start and end date can be the same", () => {
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("1");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2020");
    cy.xpath('(//input[@label="Month"])[2]').clear();
    cy.xpath('(//input[@label="Month"])[2]').type("1");
    cy.xpath('(//input[@label="Year"])[2]').clear();
    cy.xpath('(//input[@label="Year"])[2]').type("2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });

  it("Not allow start date late than end date", function () {
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("1");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2021");
    cy.xpath('(//input[@label="Month"])[2]').clear();
    cy.xpath('(//input[@label="Month"])[2]').type("1");
    cy.xpath('(//input[@label="Year"])[2]').clear();
    cy.xpath('(//input[@label="Year"])[2]').type("2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });

  it("Not allow only enter start date not end date and click on validate measure", function () {
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.xpath('(//input[@label="Month"])[1]').clear();
    cy.xpath('(//input[@label="Month"])[1]').type("4");
    cy.xpath('(//input[@label="Year"])[1]').clear();
    cy.xpath('(//input[@label="Year"])[1]').type("2020");
    cy.xpath('(//input[@label="Year"])[2]').clear();
    cy.xpath('(//input[@label="Month"])[2]').clear();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });
});
