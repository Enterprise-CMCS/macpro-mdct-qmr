import { testingYear } from "../../../../support/constants";

describe("Measure: FUH-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("FUH-CH");
  });

  it(
    "If not reporting and not why not -> show error",
    cy.showErrorIfNotReportingAndNotWhy
  );

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

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
    cy.get(
      '[data-cy="PerformanceMeasure.rates.FollowUpwithin7daysafterdischarge.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.FollowUpwithin7daysafterdischarge.0.denominator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.FollowUpwithin7daysafterdischarge.0.rate"]'
    ).should("have.attr", "readonly");
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.FollowUpwithin7daysafterdischarge.0.rate"]'
    ).should("not.have.attr", "readonly");
  });

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );
});
