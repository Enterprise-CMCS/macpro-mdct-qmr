describe("Measure: DEV-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("DEV-CH");
  });

  it("Ensure correct sections display if user is/not reporting", () => {
    cy.displaysSectionsWhenUserNotReporting();
    cy.displaysSectionsWhenUserIsReporting();
  });

  it("If not reporting and not why not -> show error", () => {
    cy.get('[data-cy="DidReport1"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Why Are You Not Reporting On This Measure Error"]'
    ).should("have.text", "Why Are You Not Reporting On This Measure Error");
  });

  it("should show correct data source options", () => {
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Record (EHR) Data");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Paper");
    cy.get(
      '[data-cy="DataSource2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get("#MeasurementSpecification-OHSU").should(
      "have.text",
      "Oregon Health and Science University (OHSU)"
    );
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get('[data-cy="Children screened by 12 months of age"]').should(
      "have.text",
      "Children screened by 12 months of age"
    );
    cy.get('[data-cy="Children screened by 24 months of age"]').should(
      "have.text",
      "Children screened by 24 months of age"
    );
    cy.get('[data-cy="Children screened by 36 months of age"]').should(
      "have.text",
      "Children screened by 36 months of age"
    );
    cy.get('[data-cy="Children Total"]').should("have.text", "Children Total");
  });

  it("at least one dnr set if reporting and measurement spec or error.", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="Performance Measure/Other Performance Measure Error"]'
    ).should("be.visible");
  });

  it("if yes for combined rates → and no additional selection → show warning", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="CombinedRates0"]').click();
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."]'
    ).should(
      "have.text",
      "You must select at least one option for Combined Rate(s) Details if Yes is selected."
    );
  });

  it("Ensure that numerical value after decimal is rounded up/down for auto calculated rate.", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("555");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("10000");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "5.6"
    );
  });

  it("Ensure that “Total” NDR set is auto calculated from the according age ranges", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).should("have.value", "6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).should("have.value", "6");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.rate"]').should(
      "have.value",
      "100.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("16");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).should("have.value", "22");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.rate"]').should(
      "have.value",
      "63.6"
    );
  });

  it("Ensure that user can manually override the “Total” NDR set", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).should("not.have.attr", "aria-readonly");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).should("not.have.attr", "aria-readonly");
  });
});
