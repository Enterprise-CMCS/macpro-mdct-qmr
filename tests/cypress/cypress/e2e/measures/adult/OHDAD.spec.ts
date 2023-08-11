import { testingYear } from "../../../../support/constants";

describe("Measure: OHD-AD", () => {
  beforeEach(() => {
    cy.login();
    cy.selectYear(testingYear);
    cy.goToAdultMeasures();
    cy.goToMeasure("OHD-AD");
  });

  it("Has correct text", () => {
    cy.get('[data-cy="DidReport0"]').click();
    cy.get('[data-cy="DataStatus0"]').click();
    cy.get('[data-cy="DataStatus-ProvisionalExplanation"]').click();
    cy.get(
      '[data-cy="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"]'
    ).should(
      "have.text",
      "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
    );
    cy.get('[data-cy="MeasurementSpecification0"]').click();
    cy.get('[data-cy="DataSource0"]').click();
    cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type("1");
    cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
      "1"
    );

    cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.options0"]'
    ).click();
    cy.get(
      '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options0"]'
    ).click();

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
      cy.get('[data-cy="DataSource0"]').should("be.visible");

      cy.get('[data-cy="DataSource1"]').should("be.visible");
    });
  });

  describe("Combined Rate Validation", () => {
    it('Must have a subselection for Combined Rate if "yes" selected', () => {
      cy.get('[data-cy="CombinedRates0"]').click();
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
      cy.get(
        '[data-cy="Date Range answer must be selected"] > .chakra-text'
      ).should("be.visible");
      cy.enterValidDateRange();
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Date Range answer must be selected"] > .chakra-text'
      ).should("not.exist");
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
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.denominator"]').type(
        "1"
      );
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
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "2"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
        "1"
      );
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Performance Measure/Other Performance Measure Error"]'
      ).should("be.visible");
      cy.get(
        '[data-cy="Numerators must be less than Denominators for all applicable performance measures"] > .chakra-text'
      ).should("be.visible");
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').clear();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "1"
      );
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
      cy.get('[data-cy="DataSource1"]').click();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "0"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').clear();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("be.visible");
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').clear();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').type("0");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("be.visible");
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').clear();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.rate"]').type("100");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("not.exist");
    });
  });

  describe("OMS Validations", () => {
    it("Must have a proper rate if manually entered", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get('[data-cy="DataSource1"]').click();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.options0"]'
      ).click();

      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options0"]'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).type("0");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).type("0");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.rate"]'
      ).type("1");
      cy.clickValidateMeasure();

      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("be.visible");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).clear();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).type("1");
      cy.clickValidateMeasure();
      cy.get(
        '[data-cy="Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."] > .chakra-text'
      ).should("not.exist");
      cy.get(
        '[data-cy="Manually entered rate should be 0 if numerator is 0"] > .chakra-text'
      ).should("not.exist");
    });

    it("Must have NDRs filled in OMS if a selection is made", () => {
      cy.get('[data-cy="MeasurementSpecification0"]').click();
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.0.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.numerator"]').type(
        "1"
      );
      cy.get('[data-cy="PerformanceMeasure.rates.aeOiMF.1.denominator"]').type(
        "1"
      );
      cy.get('[data-cy="OptionalMeasureStratification.options0"]').click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.options0"]'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options0"]'
      ).click();
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.options1"]'
      ).click();
      cy.clickValidateMeasure();
      cy.get('[data-cy="Optional Measure Stratification: Race Error"]').should(
        "be.visible"
      );
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.NyGIus.0.denominator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.23IWY1.0.numerator"]'
      ).type("1");
      cy.get(
        '[data-cy="OptionalMeasureStratification.selections.Race.selections.AmericanIndianorAlaskaNative.rateData.rates.aeOiMF.23IWY1.0.denominator"]'
      ).type("1");
      cy.clickValidateMeasure();
      cy.get('[data-cy="Optional Measure Stratification: Race Error"]').should(
        "not.exist"
      );
    });
  });
});
