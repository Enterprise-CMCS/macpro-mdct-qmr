import { testingYear } from "../../../support/constants";

describe("Date Range Adjustment for Start/End date", () => {
  beforeEach(() => {
    cy.login("stateuser2");
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("CCP-AD");
  });
  it("Check if start and end date can be the same", () => {
    enterCustomDateRange("1", "2020", "1", "2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });

  it("Not allow start date late than end date", () => {
    enterCustomDateRange("1", "2021", "1", "2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });

  it("Not allow only enter start date not end date and click on validate measure", () => {
    enterCustomDateRange("4", "2020");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Date Range must be completed"]').should("be.visible");
  });
});

const enterCustomDateRange = (startMonth, startYear, endMonth?, endYear?) => {
  cy.get('[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]').click();
  cy.get('[data-cy="DateRange.startDate-month"]').type(startMonth);
  cy.get('[data-cy="DateRange.startDate-year"]').type(startYear);
  endMonth
    ? cy.get('[data-cy="DateRange.endDate-month"]').type(endMonth)
    : null;
  endYear ? cy.get('[data-cy="DateRange.endDate-year"]').type(endYear) : null;
};
