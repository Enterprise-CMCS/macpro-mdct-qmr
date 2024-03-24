import { testingYear } from "../../../../support/constants";

describe("Measure: SS-HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
    cy.goToHealthHomeSetMeasures();
    cy.addStateSpecificMeasure();
  });

  afterEach(() => {
    // assumes test ends on measure view
    cy.get("a > .hidden-print-items").click();
    cy.deleteStateSpecificMeasure();
  });

  it("Ensure correct sections display", () => {
    cy.SSHHdisplaysCorrectSections();
  });

  it("should show correct data source options", () => {
    cy.get('[data-cy="DataSource0"]')
      .contains("Administrative Data")
      .should("be.visible");
    cy.get('[data-cy="DataSource1"]')
      .contains("Hybrid (Administrative and Medical Records Data")
      .should("be.visible");
    cy.get('[data-cy="DataSource2"]')
      .contains("Electronic Health Records")
      .should("be.visible");
    cy.get('[data-cy="DataSource3"]')
      .contains("Other Data Source")
      .should("be.visible");
  });

  it("should include correct Definition of Population options", () => {
    cy.get(
      '[data-cy="Definition of Population Included in the Measure"]'
    ).should("be.visible");
    cy.get('[data-cy="DefinitionOfDenominator0"]').should(
      "include.text",
      "Denominator includes Medicaid population"
    );
    cy.get('[data-cy="DefinitionOfDenominator1"]').should(
      "include.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get('[data-cy="DefinitionOfDenominator2"]').should(
      "include.text",
      "Other"
    );

    it("should include 'Are all Health Home Providers represented in the denominator?' question", () => {
      cy.get(
        '[data-cy="Are all Health Home Providers represented in the denominator?"]'
      ).should("be.visible");
      cy.get("#DenominatorDefineHealthHome-yes").should("be.visible");
      cy.get("#DenominatorDefineHealthHome-no").should("be.visible");
    });
  });

  it("Show default validation errors", () => {
    cy.get('[data-cy="Validate Measure"]').click();
    // Data Source Error
    cy.get('[data-cy="Data Source Error"]').should("be.visible");
    // Date Range Error
    cy.get('[data-cy="Date Range Error"]').should("be.visible");
    // Performance Measure Error
    cy.get('[data-cy="Performance Measure Error"]').should("be.visible");
  });

  it("Complete the measure and check validations", () => {
    // Data Source
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();

    cy.get('[data-cy="DefinitionOfDenominator0"]').click();

    // Date Range
    cy.enterValidDateRange();

    // Performance Measure
    // Create a category
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.description"]').type(
      "Category Name"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.numerator"]').type(
      "3"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.0.rate.0.rate"]').should(
      "have.value",
      "75.0"
    );

    // Create another Category
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.description"]').type(
      "Another Category"
    );
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.numerator"]').type(
      "2"
    );
    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("1");

    cy.get('[data-cy="Rate Error"]').should("be.visible");

    cy.get(
      '[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.denominator"]'
    ).type("4");
    cy.get('[data-cy="OtherPerformanceMeasure-Rates.1.rate.0.rate"]').should(
      "have.value",
      "14.3"
    );

    // validation errors
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="Success"]').should("be.visible");
  });
});
