describe("Measure: PPC-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("PPC-CH");
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
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Medicaid Management Information System (MMIS)");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Vital Records");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData0.selected2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Record (EHR) Data");
    cy.get(
      '[data-cy="What is the Medical Records Data Source? (Both can be selected)"]'
    ).should(
      "have.text",
      "What is the Medical Records Data Source? (Both can be selected)"
    );
    cy.get(
      '[data-cy="DataSourceSelections.HybridAdministrativeandMedicalRecordsData1.selected1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Paper");
    cy.get(
      '[data-cy="DataSource2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    /* ==== End Cypress Studio ==== */
  });

  it("if primary measurement spec is selected -> show performance measures", () => {
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get(`#MeasurementSpecification-NCQAHEDIS`).should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get('[data-cy="Performance Measure"]').should(
      "have.text",
      "Performance Measure"
    );
    cy.get(
      '[data-cy="Prenatal care visit in the first trimester, on or before the enrollment start date, or within 42 days of enrollment in Medicaid/CHIP."]'
    ).should(
      "have.text",
      "Prenatal care visit in the first trimester, on or before the enrollment start date, or within 42 days of enrollment in Medicaid/CHIP."
    );
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
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.attr",
      "aria-readonly"
    );
  });
});
