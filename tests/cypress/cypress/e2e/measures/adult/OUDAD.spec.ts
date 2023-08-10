import { testingYear } from "../../../../support/constants";

describe("Measure: OUD-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("OUD-AD");
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
    cy.get("#MeasurementSpecification-CMS").should(
      "have.text",
      "Centers for Medicare & Medicaid Services (CMS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="Performance Measure"]').should("be.visible");
    cy.get('[data-cy="Total Rate"]').should("be.visible");
    cy.get('[data-cy="Buprenorphine"]').should("be.visible");
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.numerator"]').type("6");
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.denominator"]').type(
      "6"
    );
    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
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

  it("if only admin data cannot override, if anything else, rate is editable", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.numerator"]').type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.denominator"]').type(
      "5"
    );
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.rate"]').should(
      "have.attr",
      "readonly"
    );
    cy.get('[data-cy="DataSource1"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.t75kZB.0.rate"]').should(
      "not.have.attr",
      "readonly"
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
});
