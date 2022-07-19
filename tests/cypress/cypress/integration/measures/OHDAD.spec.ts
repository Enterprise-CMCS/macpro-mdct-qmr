describe("Measure: OHD-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.goToAdultMeasures();
    cy.goToMeasure("OHD-AD");
  });

  it("Has correct text", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="DidReport0"]').click();
    cy.get("#DidReport-yes").should(
      "have.text",
      "Yes, I am reporting Use of Opioids at High Dosage in Persons Without Cancer (OHD-AD) for FFY 2021 quality measure reporting."
    );
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get("#DataStatus-ReportingProvisionalData").should(
      "have.text",
      "I am reporting provisional data."
    );
    cy.get(
      '[data-cy="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"]'
    ).click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get(
      '[data-cy="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"]'
    ).should(
      "have.text",
      "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
    );
    cy.get("#MeasurementSpecification-PQA").click();
    cy.get("#MeasurementSpecification-PQA").should(
      "have.text",
      "Pharmacy Quality Alliance (PQA)"
    );
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."]'
    ).should(
      "have.text",
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
    );
    cy.get(".css-1u5a18p > :nth-child(1)").should(
      "have.text",
      "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
    );
    cy.get(".css-1art13b").should(
      "have.text",
      "Please select all populations that are included. For example, if your data include both non-dual Medicaid beneficiaries and Medicare and Medicaid Dual Eligibles, select both:"
    );
    cy.get(".css-14tgbft > :nth-child(1)").should(
      "have.text",
      "Denominator includes Medicaid population"
    );
    cy.get(".css-14tgbft > :nth-child(2)").should(
      "have.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get(".css-n21gh5 > .chakra-text").should(
      "have.text",
      "The percentage of beneficiaries age 18 and older who received prescriptions for opioids with an average daily dosage greater than or equal to 90 morphine milligram equivalents (MME) over a period of 90 days or more. Beneficiaries with a cancer diagnosis, sickle cell disease diagnosis, or in hospice are excluded."
    );
    cy.get(
      '[data-cy="If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"]'
    ).should(
      "have.text",
      "If this measure has been reported by the state previously and there has been a substantial change in the rate or measure-eligible population, please provide any available context below:"
    );
    cy.get(".css-35ezg3").should(
      "have.text",
      "Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?"
    );
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
    ).type("1");
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
    ).type("1");

    cy.get(":nth-child(12) > :nth-child(2)").should(
      "have.text",
      "If this measure is also reported by additional classifications/sub-categories, e.g. racial, ethnic, sex, language, disability status, or geography, complete the following as applicable. If your state reported for classifications/sub-categories other than those listed below, or reported for different rate sets, please click on “Add Another” to add Additional/Alternative Classification/Sub-categories as needed."
    );
    cy.get(
      '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.additionalSubCategoriesButton"]'
    ).click();
    cy.get(
      '[data-cy="Define the Alternative Classification/Sub-category"]'
    ).should("have.text", "Define the Alternative Classification/Sub-category");
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.additionalCategoriesButton"]'
    ).click();
    cy.get(
      ":nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > .css-9515vv"
    ).should("have.text", "Additional Race (Non-Hispanic)");

    cy.get(".css-ipuaqi").should(
      "have.text",
      "PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS) collects this mandatory information in accordance with (42 U.S.C. 1396a) and (42 CFR 430.12); which sets forth the authority for the submittal and collection of state plans and plan amendment information in a format defined by CMS for the purpose of improving the state application and federal review processes, improve federal program management of Medicaid programs and Children’s Health Insurance Program, and to standardize Medicaid program data which covers basic requirements, and individual content that reflects the characteristics of the particular state’s program. The information will be used to monitor and analyze performance metrics related to the Medicaid and Children’s Health Insurance Program in efforts to boost program integrity efforts, improve performance and accountability across the programs. Under the Privacy Act of 1974 any personally identifying information obtained will be kept private to the extent of the law. According to the Paperwork Reduction Act of 1995, no persons are required to respond to a collection of information unless it displays a valid OMB control number. The valid OMB control number for this information collection is 0938-1188. The time required to complete and review the information collection is estimated to range from 1 hour to 80 hours per response (see below), including the time to review instructions, search existing data resources, gather the data needed, and completeand review the information collection. If you have comments concerning the accuracy of the time estimate(s) or suggestions for imprving this form, please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clerance Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850."
    );
  });

  describe("Is Reporting Validation", () => {
    it("Ensure correct sections display if user is reporting", () => {
      cy.displaysSectionsWhenUserIsReporting();
    });

    it("Ensure correct sections display if user is not reporting", () => {
      cy.displaysSectionsWhenUserNotReporting();
    });
  });

  describe("Data Source Validation", () => {
    it("Ensure Data Source question includes Administrative Data, and Other Data Source selections.", () => {
      cy.get(
        '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
      ).should("be.visible");

      cy.get(
        '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
      ).should("be.visible");
    });
  });

  describe("Combined Rate Validation", () => {
    it('Must have a subselection for Combined Rate if "yes" selected', () => {
      cy.get("#CombinedRates-yes").click();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."] > .chakra-text'
      ).should("be.visible");
      cy.get("[data-cy=CombinedRates-CombinedRates0]").click();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="You must select at least one option for Combined Rate(s) Details if Yes is selected."] > .chakra-text'
      ).should("not.exist");
    });
  });

  describe("Date Range Validation", () => {
    it("Must have a filled date with appropriate range", () => {
      cy.clickValidateMeasure();
      cy.get('[data-cy="Date Range must be completed"] > .chakra-text').should(
        "be.visible"
      );
      cy.get('[data-cy="DateRange.startDate-month"]').clear();
      cy.get('[data-cy="DateRange.startDate-month"]').type("1");
      cy.get('[data-cy="DateRange.startDate-year"]').clear();
      cy.get('[data-cy="DateRange.startDate-year"]').type("2021");
      cy.get('[data-cy="DateRange.endDate-month"]').clear();
      cy.get('[data-cy="DateRange.endDate-month"]').type("7");
      cy.get('[data-cy="DateRange.endDate-year"]').clear();
      cy.get('[data-cy="DateRange.endDate-year"]').type("2021");
      cy.clickValidateMeasure();
      cy.get('[data-cy="Date Range must be completed"] > .chakra-text').should(
        "not.exist"
      );
    });
  });

  describe("Performance Measure Validations", () => {
    it("Must have one PM filled", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Performance Measure/Other Performance Measure Error"]'
      ).should("be.visible");
      cy.get(
        '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Performance Measure/Other Performance Measure Error"]'
      ).should("not.exist");
      cy.get(
        '[data-cy="At least one Performance Measure Numerator, Denominator, and Rate must be completed"] > .chakra-text'
      ).should("not.exist");
    });

    it("must have lower numerator than denominator", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
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
      ).type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Performance Measure/Other Performance Measure Error"]'
      ).should("be.visible");
      cy.get(
        '[data-cy="Numerators must be less than Denominators for all applicable performance measures"] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Performance Measure/Other Performance Measure Error"]'
      ).should("not.exist");
      cy.get(
        '[data-cy="Numerators must be less than Denominators for all applicable performance measures"] > .chakra-text'
      ).should("not.exist");
    });

    it("Must have a correct manually entered rate", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get('[data-cy="DataSource1"] > .chakra-checkbox__control').click();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("0");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
      ).clear();
      cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
        "1"
      );
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
      ).click();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
      ).clear();
      cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
        "0"
      );
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]'
      ).clear();
      cy.get('[data-cy="PerformanceMeasure.rates.singleCategory.0.rate"]').type(
        "100"
      );
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("not.exist");
    });
  });

  describe("OMS Validations", () => {
    it("Must have a proper rate if manually entered", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get(
        '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();

      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.wait(1000);
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).type("0");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("be.visible");
      cy.wait(1000);
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).type("0");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.rate"]'
      ).type("1");
      cy.clickValidateMeasure();

      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("be.visible");
      cy.wait(1000);
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).type("1");
      cy.clickValidateMeasure();
      /* ==== End Cypress Studio ==== */
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("not.exist");
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("not.exist");
    });

    it("Must have NDRs filled in OMS if a selection is made", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.options1"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) Error"]'
      ).should("be.visible");
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White - Ages 18 to 64 Error"]'
      ).should("be.visible");
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White - Age 65 and older Error"]'
      ).should("be.visible");
      cy.wait(1000);
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Ages18to64.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.RaceNonHispanic.selections.White.rateData.rates.Age65andolder.singleCategory.0.denominator"]'
      ).type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) Error"]'
      ).should("not.exist");
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White - Ages 18 to 64 Error"]'
      ).should("not.exist");
      cy.get(
        '[data-cy="Optional Measure Stratification: Race (Non-Hispanic) - White - Age 65 and older Error"]'
      ).should("not.exist");
    });
  });

  describe("Deviation of Measure Spec Validations", () => {
    it("Must have at least one NDR filled", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).clear();
      cy.get(
        '[data-cy="PerformanceMeasure.rates.singleCategory.1.denominator"]'
      ).type("1");
      cy.get("#DidCalculationsDeviate-yes").click();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="At least one item must be selected and completed (Numerator, Denominator, or Other)"] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="DeviationOptions0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="DeviationOptions0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="DeviationOptions0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get(
        '[data-cy="Deviations.Ages18to64.RateDeviationsSelected0"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get('[data-cy="Deviations.Ages18to64.numerator"]').type("test");
      cy.get(
        '[data-cy="Deviations.Ages18to64.RateDeviationsSelected1"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get('[data-cy="Deviations.Ages18to64.denominator"]').type("test");
      cy.get(
        '[data-cy="Deviations.Ages18to64.RateDeviationsSelected2"] > .chakra-checkbox__label > .chakra-text'
      ).click();
      cy.get('[data-cy="Deviations.Ages18to64.other"]').type("test");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="At least one item must be selected and completed (Numerator, Denominator, or Other)"] > .chakra-text'
      ).should("not.exist");
    });
  });
});
