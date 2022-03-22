const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 9910 PCR-AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });
  it("fill out oy2-9910 PCR-AD form", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="ACS"]').click();
    cy.get('[data-cy="PCR-AD"]').click();
    cy.wait(2000);
    cy.get('[data-cy="Clear Data"]').click();
    cy.get('[data-cy="PCR-AD"]').click();
    cy.get('[href="/MA/2021/ACS/PCR-AD"]').should('have.text', 'PCR-AD - Plan All-Cause Readmissions');
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select('HEDIS MY 2020');
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('#DataSource0-checkbox').check();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text').should('have.text', 'Administrative Data');
    cy.get('[data-cy="DataSourceSelections.AdministrativeData.selected0"] > .chakra-checkbox__control').click();
    cy.get('#DataSourceSelections\\.AdministrativeData\\.selected0-checkbox').check();
    cy.get('[data-cy="DataSourceSelections.AdministrativeData.selected1"] > .chakra-checkbox__control').click();
    cy.get('#DataSourceSelections\\.AdministrativeData\\.selected1-checkbox').check();
    cy.get('[data-cy="DataSourceSelections.AdministrativeData-Other.description"]').click();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('#DataSource1-checkbox').check();
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text').should('have.text', 'Other Data Source');
    cy.get('[data-cy="DataSourceSelections.OtherDataSource.description"]').click();
    cy.get('.css-owjkmg').click();
    cy.get('[data-cy="DataSourceDescription"]').click();
    cy.get('.chakra-container > :nth-child(7)').click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type('10');
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type('2019');
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type('10');
    cy.get('[data-cy="DateRange.endDate-year"]').click();
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type('2021');
    cy.get('[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__control').click();
    cy.get('#DefinitionOfDenominator0-checkbox').check();
    cy.get('[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__control').click();
    cy.get('#DefinitionOfDenominator1-checkbox').check();
    cy.get('[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__control').click();
    cy.get('#DefinitionOfDenominator2-checkbox').check();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec0"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control').click();
    cy.get('#DeliverySysRepresentationDenominator0-checkbox').check();
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control').click();
    cy.get('#DeliverySysRepresentationDenominator1-checkbox').check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control').click();
    cy.get('#DeliverySysRepresentationDenominator2-checkbox').check();
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control').click();
    cy.get('#DeliverySysRepresentationDenominator3-checkbox').check();
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get('[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control').click();
    cy.get('#DeliverySysRepresentationDenominator4-checkbox').check();
    /* ==== End Cypress Studio ==== */
    /* ==== Verify Performance Measure section ==== */
    cy.get(':nth-child(9) > :nth-child(3) > :nth-child(1)').should('have.text', 'Count of Index Hospital Stays (IHS) ');
    cy.get(':nth-child(9) > :nth-child(3) > :nth-child(2)').should('have.text', 'Count of Observed 30-Day Readmissions');
    cy.get(':nth-child(9) > :nth-child(3) > :nth-child(3)').should('have.text', 'Count of Expected 30-Day Readmissions');
    cy.get(':nth-child(9) > :nth-child(4)').should('have.text', 'For beneficiaries ages 18 to 64, states should also report the rate of beneficiaries who are identified as outliers based on high rates of inpatient and observation stays during the measurement year. Data are reported in the following categories:');
    cy.get(':nth-child(9) > :nth-child(5) > :nth-child(1)').should('have.text', 'Count of Beneficiaries in Medicaid Population');
    cy.get(':nth-child(9) > :nth-child(5) > :nth-child(2)').should('have.text', 'Number of Outliers');
    cy.get('[data-cy="If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:"]').should('have.text', 'If the rate or measure-eligible population increased or decreased substantially from the previous reporting year, please provide any context you have for these changes:');
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="Count of Index Hospital Stays"]').should('have.text', 'Count of Index Hospital Stays');
    cy.get('[data-cy="Count of Observed 30-Day Readmissions"]').should('have.text', 'Count of Observed 30-Day Readmissions');
    cy.get('[data-cy="Observed Readmission Rate"]').should('have.text', 'Observed Readmission Rate');
    cy.get('[data-cy="Count of Expected 30-Day Readmissions"]').should('have.text', 'Count of Expected 30-Day Readmissions');
    cy.get('[data-cy="Expected Readmission Rate"]').should('have.text', 'Expected Readmission Rate');
    cy.get('[data-cy="O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)"]').should('have.text', 'O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)');
    cy.get('[data-cy="Count of Beneficiaries in Medicaid Population"]').should('have.text', 'Count of Beneficiaries in Medicaid Population');
    cy.get('[data-cy="Number of Outliers"]').should('have.text', 'Number of Outliers');
    cy.get('[data-cy="Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000"]').should('have.text', 'Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000');
    /* ==== End Cypress Studio ==== */
  });
});
