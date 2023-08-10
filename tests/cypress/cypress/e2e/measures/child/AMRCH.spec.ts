import { testingYear } from "../../../../support/constants";

describe("Measure: AMR-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("AMR-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("should show correct data source options", () => {
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "6"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"] > .chakra-checkbox__label > .chakra-text'
    ).should("be.visible");
  });

  it("if other measurement spec is selected -> show other performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification1"]').click();
    cy.get(
      '[data-cy="MeasurementSpecification-OtherMeasurementSpecificationDescription"]'
    ).should("be.visible");
    cy.get('[data-cy="Other Performance Measure"]').should("be.visible");
  });

  it("should show correct child radio buttons in Definition of Population Included in the Measure", () => {
    cy.get("#DefinitionOfDenominator-DenominatorIncCHIPPop").should(
      "have.text",
      "Denominator includes CHIP (Title XXI) population only"
    );
    cy.get("#DefinitionOfDenominator-DenominatorIncMedicaidPop").should(
      "have.text",
      "Denominator includes Medicaid (Title XIX) population only"
    );
    cy.get("#DefinitionOfDenominator-DenominatorIncMedicaidAndCHIPPop").should(
      "have.text",
      "Denominator includes CHIP and Medicaid (Title XIX)"
    );
  });

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').should(
      "have.attr",
      "aria-readonly",
      "true"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').should(
      "not.have.attr",
      "aria-readonly",
      "true"
    );
  });

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );

  it("calculates rates correctly", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("4");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').should(
      "have.value",
      "80.0"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').type("50");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').should(
      "not.have.attr",
      "aria-readonly",
      "true"
    );
  });

  it("displays a warning when N=0, D>0, and user enters a rate > 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("0");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').type("10.0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Performance Measure/Other Performance Measure ErrorManually entered rate should be 0 if numerator is 0"
    );
  });

  it("displays a warning when N>0, D>0, and user enters a rate of 0", () => {
    cy.get('[data-cy="MeasurementSpecification0"').click();
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type(
      "10"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "12"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').clear();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.rate"]').type("0");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-testid="measure-wrapper-form"]').should(
      "include.text",
      "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
    );
  });

  it("contains values in the Total age range when one or more NDR sets contain values", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("7");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.numerator"]').should(
      "have.value",
      "7"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.denominator"]').should(
      "have.value",
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.rate"]').should(
      "have.value",
      "77.8"
    );
  });

  it("auto-calculates Total NDR set from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("7");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "9"
    );
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.numerator"]').type("2");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.denominator"]').type(
      "4"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.numerator"]').should(
      "have.value",
      "9"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.denominator"]').should(
      "have.value",
      "13"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.2.rate"]').should(
      "have.value",
      "69.2"
    );
  });

  it("allows user to manually override the Total NDR set", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').type("1");
    cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
    cy.get('[data-cy="DateRange.endDate-month"]').type("12");
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.denominator"]').type(
      "4"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(".chakra-alert").should(
      "include.text",
      "The measure has been validated successfully"
    );
  });

  it("automatically applies Total NDR set for OMS sections nested in checkbox", () => {
    cy.get(
      '[data-cy="MeasurementPeriodAdhereToCoreSetSpecification1"]'
    ).click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DateRange.startDate-month"]').type("1");
    cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
    cy.get('[data-cy="DateRange.endDate-month"]').type("12");
    cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
    cy.get('[data-cy="DataSource0"]').click();
    cy.get(
      '[data-cy="DataSourceSelections.AdministrativeData0.selected0"] > .chakra-checkbox__control'
    ).click();
    cy.get('[data-cy="DefinitionOfDenominator0"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check();
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.0.denominator"]').type(
      "2"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.numerator"]').type("3");
    cy.get('[data-cy="PerformanceMeasure.rates.tMt8gW.1.denominator"]').type(
      "4"
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#OptionalMeasureStratification\\.options0-checkbox").check();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options2"] > .chakra-checkbox__control'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.BlackorAfricanAmerican.rateData.rates.tMt8gW.Total.0.numerator"]'
    ).type("12");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.BlackorAfricanAmerican.rateData.rates.tMt8gW.Total.0.denominator"]'
    ).type("14");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.BlackorAfricanAmerican.rateData.rates.tMt8gW.Total.0.rate"]'
    ).should("have.value", "85.7");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(".chakra-alert").should(
      "have.text",
      "SuccessThe measure has been validated successfully"
    );
  });
});
