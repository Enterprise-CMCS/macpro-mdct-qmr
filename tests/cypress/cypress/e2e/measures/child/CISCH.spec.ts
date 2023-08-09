describe("Measure: CIS-CH", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear("2021");
    cy.goToChildCoreSetMeasures();
    cy.goToMeasure("CIS-CH");
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
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Hybrid (Administrative and Medical Records Data)");
    cy.get(
      '[data-cy="DataSource2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Records");
    cy.get(
      '[data-cy="DataSource3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    /* ==== End Cypress Studio ==== */
  });

  it.skip("fill out the CIS-CH form until PM section with NDR verification", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="MeasurementSpecification-HEDISVersion"]').select(
      "HEDIS MY 2020"
    );
    cy.get('[data-cy="DataSource3"]').click();
    cy.get("#DataSource3-checkbox").check();
    cy.get(
      '[data-cy="DataSourceSelections.OtherDataSource.description"]'
    ).click();
    cy.get('[data-cy="DateRange.startDate-month"]').clear();
    cy.get('[data-cy="DateRange.startDate-month"]').type("10");
    cy.get('[data-cy="DateRange.startDate-year"]').clear();
    cy.get('[data-cy="DateRange.startDate-year"]').type("2019");
    cy.get('[data-cy="DateRange.endDate-month"]').clear();
    cy.get('[data-cy="DateRange.endDate-month"]').type("10");
    cy.get('[data-cy="DateRange.endDate-year"]').clear();
    cy.get('[data-cy="DateRange.endDate-year"]').type("2020");
    cy.get('[data-cy="DefinitionOfDenominator2"]').click();
    cy.get('[data-cy="ChangeInPopulationExplanation"]').click();
    cy.get("#DenominatorDefineTotalTechSpec-no").should(
      "have.text",
      "No, this denominator does not represent the total measure-eligible population as defined by the Technical Specifications for this measure."
    );
    cy.get('[data-cy="DenominatorDefineTotalTechSpec1"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Explanation"]').click();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').clear();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').type("12");
    cy.get('[data-cy="HybridMeasurePopulationIncluded"]').clear();
    cy.get('[data-cy="HybridMeasurePopulationIncluded"]').type("12");
    cy.get('[data-cy="HybridMeasureSampleSize"]').clear();
    cy.get('[data-cy="HybridMeasureSampleSize"]').type("12");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Fee-for-Service (FFS)");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Primary Care Case Management (PCCM)");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Managed Care Organization/Pre-paid Inpatient Health Plan (MCO/PIHP)"
    );
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Integrated Care Models (ICM)");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator0-checkbox").check({
      force: true,
    });
    cy.get("#DeliverySys-FeeForService-yes").should(
      "have.text",
      "Yes, all of our measure-eligible Fee-for-Service (FFS) population are included in this measure."
    );
    cy.get('[data-cy="DeliverySys-FeeForService1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator1"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator1-checkbox").check({
      force: true,
    });
    cy.get('[data-cy="DeliverySys-PrimaryCareManagement1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator2-checkbox").check({
      force: true,
    });
    cy.get('[data-cy="DeliverySys-MCO_PIHP1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator3"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator3-checkbox").check({
      force: true,
    });
    cy.get('[data-cy="DeliverySys-IntegratedCareModel1"]').click();
    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator4"] > .chakra-checkbox__control'
    ).click();
    cy.get("#DeliverySysRepresentationDenominator4-checkbox").check();
    cy.get('[data-cy="PerformanceMeasure.explanation"]').click();
    cy.get('[data-cy="PerformanceMeasure.hybridExplanation"]').click();
    /* ==== NDR section verification ==== */
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "10.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').should(
      "have.value",
      "15.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.numerator"]'
    ).type("3");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).type("40");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.2.rate"]').should(
      "have.value",
      "7.5"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.3.denominator"]'
    ).type("20");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.3.rate"]').should(
      "have.value",
      "30.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.4.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.5.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.5.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.5.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.5.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.6.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.numerator"]'
    ).type("8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.denominator"]'
    ).type("2");
    cy.get(
      '[data-cy="Numerator: 8 cannot be greater than Denominator: 2"]'
    ).should("have.text", "Numerator: 8 cannot be greater than Denominator: 2");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.7.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.numerator"]'
    ).type("10");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.8.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.numerator"]'
    ).type("40");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="Numerator: 40 cannot be greater than Denominator: 20"]'
    ).should(
      "have.text",
      "Numerator: 40 cannot be greater than Denominator: 20"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.9.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.10.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.10.numerator"]'
    ).type("9");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.10.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.10.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.11.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.11.numerator"]'
    ).type("9");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.11.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.11.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.12.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.12.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.12.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.12.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.13.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.13.numerator"]'
    ).type("4");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.13.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.13.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.14.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.14.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.14.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.14.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.15.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.15.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.15.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.15.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.16.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.16.numerator"]'
    ).type("8");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.16.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.16.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.17.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.17.numerator"]'
    ).type("6");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.17.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.17.denominator"]'
    ).type("20");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.18.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.18.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.18.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.18.denominator"]'
    ).type("20");
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get(
      '[data-cy="The following categories must have the same denominator:"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.2.denominator"]'
    ).type("20");
    cy.get("div.css-0 > :nth-child(3) > .chakra-stack").click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("0");
    cy.get('[data-cy="IPV"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.value",
      "0.0"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]'
    ).clear();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.1.rate"]').type(
      "99"
    );
    cy.get('[data-cy="Validate Measure"]').click();
    cy.get('[data-cy="The measure has been validated successfully"]').should(
      "have.text",
      "The measure has been validated successfully"
    );
    /* ==== End Cypress Studio ==== */
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
    cy.get('[data-cy="DataSource0"] > .chakra-checkbox__control').click();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("5");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("5");
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "have.attr",
      "readonly"
    );
    cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
    cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').should(
      "not.have.attr",
      "readonly"
    );
  });

  it("verify OMS section", () => {});

  it(
    "at least one dnr set if reporting and measurement spec or error.",
    cy.showErrorIfReportingAndNoNdrSet
  );

  it(
    "if yes for combined rates → and no additional selection → show warning",
    cy.showErrorIfCombinedRatesAndNoAdditionalSelection
  );
});
