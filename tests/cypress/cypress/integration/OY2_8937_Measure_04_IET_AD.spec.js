const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 8937 Measure 04 IET AD", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
  });

  it("Screen Enhancement", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(20) > :nth-child(1) > a > .chakra-text").click();
    cy.get(".chakra-container > :nth-child(2) > .chakra-form__label").should(
      "have.text",
      "Are you reporting on this measure?"
    );
    cy.get(".css-itvw0n").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_Help@cms.hhs.gov. For content-related questions about measure specifications, or what information to enter in each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get("#DidReport-Yes\\,\\ I\\ am\\ reporting").should(
      "have.text",
      "Yes, I am reporting Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment (IET-AD) for FFY 2021 quality measure reporting."
    );
    cy.get("#DidReport-No\\,\\ I\\ am\\ not\\ reporting").should(
      "have.text",
      "No, I am not reporting Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment (IET-AD) for FFY 2021 quality measure reporting."
    );
    cy.get(":nth-child(3) > .css-1ddmh30").should(
      "have.text",
      "Status of Data Reported"
    );
    cy.get("#field-176-label").should(
      "have.text",
      "What is the status of the data being reported?"
    );
    cy.get("#DataStatus-I\\ am\\ reporting\\ provisional\\ data\\.").should(
      "have.text",
      "I am reporting provisional data."
    );
    cy.get("#DataStatus-I\\ am\\ reporting\\ final\\ data\\.").should(
      "have.text",
      "I am reporting final data."
    );
    cy.xpath("//label[contains(text(),'Measurement Specification')]").should(
      "have.text",
      "Measurement Specification"
    );
    cy.get("#MeasurementSpecification-NCQAHEDIS").should(
      "have.text",
      "National Committee for Quality Assurance (NCQA)/Healthcare Effectiveness Data and Information Set (HEDIS)"
    );
    cy.get("#MeasurementSpecification-Other").should("have.text", "Other");
    cy.get(":nth-child(5) > .css-1ddmh30").should("have.text", "Data Source");
    cy.get("#field-184-label").should(
      "have.text",
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
    );
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Administrative Data");
    cy.get(
      '[data-cy="DataSource1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Electronic Health Records");
    cy.get(
      '[data-cy="DataSource2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other Data Source");
    cy.get(":nth-child(6) > .css-1ddmh30").should("have.text", "Date Range");
    cy.get(".css-1u5a18p > :nth-child(1)").should(
      "have.text",
      "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
    );
    cy.get(".css-1u5a18p > :nth-child(2)").should("have.class", "chakra-text");
    cy.get(".css-rxodum").should("have.text", "Start Date");
    cy.get("#field-186-label").should("have.text", "Month:");
    cy.get("#field-187-label").should("have.text", "Year:");
    cy.get("#field-186").should("be.visible");
    cy.get("#field-187").should("be.visible");
    cy.get(
      ":nth-child(6) > :nth-child(3) > :nth-child(1) > :nth-child(2)"
    ).click();
    cy.get(".css-foph78").should("have.text", "End Date");
    cy.get("#field-190-label").should("have.text", "Month:");
    cy.get("#field-191-label").should("have.text", "Year:");
    cy.get("#field-190").should("be.visible");
    cy.get("#field-191").should("be.visible");
    cy.get(":nth-child(7) > .css-1ddmh30").should(
      "have.text",
      "Definition of Population Included in the Measure"
    );
    cy.get(".css-9f6g39").should("have.text", "Definition of denominator");
    cy.get(".css-1art13b").should(
      "have.text",
      "Please select all populations that are included. For example, if your data include both non-dual Medicaid enrollees and Medicare and Medicaid Dual Eligibles, select both:"
    );
    cy.get(".css-14tgbft > :nth-child(1)").should(
      "have.text",
      "Denominator includes Medicaid population"
    );
    cy.get(".css-14tgbft > :nth-child(2)").should(
      "have.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Denominator includes Medicaid population");
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Denominator includes CHIP population (e.g. pregnant women)"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator2"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Denominator includes Medicare and Medicaid Dually-Eligible population"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get("#field-195-label").should(
      "have.text",
      "If there has been a change in the included population from the previous reporting year, please provide any available context below:"
    );
    cy.get('[data-cy="ChangeInPopulationExplanation"]').should("be.visible");
    cy.get("#field-196-label").should(
      "have.text",
      "Does this denominator represent your total measure-eligible population as defined by the Technical Specifications for this measure?"
    );
    cy.get(
      "#DenominatorDefineTotalTechSpec-YesRepresentsTotalEligiblePop"
    ).should(
      "have.text",
      "Yes, this denominator represents the total measure-eligible population as defined by the Technical Specifications for this measure."
    );
    cy.get(
      "#DenominatorDefineTotalTechSpec-NoRepresentsTotalEligiblePop"
    ).should(
      "have.text",
      "No, this denominator does not represent the total measure-eligible population as defined by the Technical Specifications for this measure."
    );
    cy.get(".css-17qnj1m > .chakra-heading").should(
      "have.text",
      "Which delivery systems are represented in the denominator?"
    );
    cy.get("#field-200-label").should(
      "have.text",
      "Select all delivery systems that apply in your state (must select at least one); for each delivery system selected, enter the percentage of the measure-eligible population represented by that service delivery system."
    );
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
    cy.get(":nth-child(8) > .css-1ddmh30").should(
      "have.text",
      "Combined Rate(s) from Multiple Reporting Units"
    );
    cy.get("#field-201-label").should(
      "have.text",
      "Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?"
    );
    cy.get("#field-205-label").click();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get("#field-205-label").click();
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').click();
    cy.get("#CombinedRates-Yes\\,\\ combine").should(
      "have.text",
      "Yes, we combined rates from multiple reporting units to create a State-Level rate."
    );
    cy.get("#CombinedRates-No\\,\\ did\\ not\\ combine").should(
      "have.text",
      "No, we did not combine rates from multiple reporting units to create a State-Level rate."
    );
    cy.get(":nth-child(9) > .css-1ddmh30").should(
      "have.text",
      "Additional Notes/Comments on the measure (optional)"
    );
    cy.get("#field-205-label").should(
      "have.text",
      "Please add any additional notes or comments on the measure not otherwise captured above:"
    );
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').should("be.visible");
    cy.get(".css-1bpnzr3 > .css-0").should(
      "have.text",
      "If you need additional space to include comments or supplemental information, please attach further documentation below."
    );
    cy.get(".chakra-stack > img").should("be.visible");
    cy.get(".css-1h4ws66 > .chakra-heading").should(
      "have.text",
      "Complete the Measure"
    );
    cy.get(".css-thvrsi").should(
      "have.text",
      'Please select "Validate Measure" to check any error present on the measure prior to completion'
    );
    cy.get(".css-1xpb69n").should(
      "have.text",
      "Complete the measure and mark it for submission to CMS for review"
    );
    cy.get('[data-cy="Validate Measure"]').should(
      "have.text",
      "Validate Measure"
    );
    cy.get('[data-cy="Validate Measure"]').should("be.enabled");
    cy.get('[data-cy="Complete Measure"]').should("be.enabled");
    cy.get('[data-cy="Complete Measure"]').should(
      "have.text",
      "Complete Measure"
    );
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?"
    );
    cy.get(".css-ltugf9 > .css-0").should(
      "have.text",
      "For technical questions regaring use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );

    cy.get(".css-1wkcrv6").should(
      "have.text",
      "PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS) collects this mandatory information in accordance with (42 U.S.C. 1396a) and (42 CFR 430.12); which sets forth the authority for the submittal and collection of state plans and plan amendment information in a format defined by CMS for the purpose of improving the state application and federal review processes, improve federal program management of Medicaid programs and Children’s Health Insurance Program, and to standardize Medicaid program data which covers basic requirements, and individual content that reflects the characteristics of the particular state’s program. The information will be used to monitor and analyze performance metrics related to the Medicaid and Children’s Health Insurance Program in efforts to boost program integrity efforts, improve performance and accountability across the programs. Under the Privacy Act of 1974 any personally identifying information obtained will be kept private to the extent of the law. According to the Paperwork Reduction Act of 1995, no persons are required to respond to a collection of information unless it displays a valid OMB control number. The valid OMB control number for this information collection is 0938-1188. The time required to complete and review the information collection is estimated to range from 1 hour to 80 hours per response (see below), including the time to review instructions, search existing data resources, gather the data needed, and completeand review the information collection. If you have comments concerning the accuracy of the time estimate(s) or suggestions for imprving this form, please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clerance Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850."
    );

    /* ==== End Cypress Studio ==== */
  });

  it("Second Enhancement", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(13) > :nth-child(1) > a > .chakra-text").click();
    cy.get("#DidReport-Yes\\,\\ I\\ am\\ reporting").click({ force: true });
    cy.get("#radio-174").check();
    cy.get("#DataStatus-I\\ am\\ reporting\\ provisional\\ data\\.").click();
    cy.get("#radio-178").check();
    cy.get("#field-206-label").should(
      "have.text",
      "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
    );
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get("#radio-182").check();
    cy.get(".css-zhlq69 > .chakra-text").should(
      "have.text",
      "NCQA, the measure steward, changed its naming convention. HEDIS MY 2020 refers to a different federal fiscal year (FFY) than HEDIS 2020. Please note the FFY Core Set specification above."
    );
    cy.get("#field-207-label").should(
      "have.text",
      "Specify the version of HEDIS measurement year used:"
    );
    cy.get("#field-184-label").should(
      "have.text",
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below."
    );

    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.xpath("//p[contains(text(),'Administrative Data')]").click({
      force: true,
    });

    cy.get(":nth-child(6) > .css-1ddmh30").should("have.text", "Date Range");
    cy.get(".css-1u5a18p > :nth-child(1)").should(
      "have.text",
      "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
    );
    cy.get(".css-1u5a18p > :nth-child(2)").should(
      "have.text",
      "More information about the Start and End Date for each measure is available in the Measurement Period Table resource."
    );
    cy.get(".css-rxodum").should("have.text", "Start Date");
    cy.get(".css-rxodum").click();
    cy.get(":nth-child(7) > .css-1ddmh30").should(
      "have.text",
      "Definition of Population Included in the Measure"
    );
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.xpath(
      "//p[contains(text(),'Denominator includes Medicaid population')]"
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator1"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.xpath(
      "//p[contains(text(),'Denominator includes Medicare and Medicaid Dually-')]"
    ).click();

    cy.get(
      "#DenominatorDefineTotalTechSpec-YesRepresentsTotalEligiblePop"
    ).click();
    cy.get("#radio-198").check();
    cy.get(
      "#DenominatorDefineTotalTechSpec-NoRepresentsTotalEligiblePop"
    ).click();
    cy.get("#radio-199").check();
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Explanation"]').should(
      "be.visible"
    );
    cy.get('[data-cy="DenominatorDefineTotalTechSpec-No-Size"]').should(
      "be.visible"
    );

    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).click();

    cy.get(
      '[data-cy="DeliverySysRepresentationDenominator2"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.xpath(
      "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/div[1]/form[1]/section[1]/div[6]/div[4]/div[1]/div[1]/div[3]/label[1]/span[2]/p[1]"
    ).click();

    /* ==== End Cypress Studio ==== */
  });
  it("First Calculation Test With Yes Option", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(20) > :nth-child(1) > a > .chakra-text").click();
    cy.xpath("//p[@id='DidReport-Yes, I am reporting']").click({ force: true });
    cy.get("#radio-174").check();
    cy.get("#DataStatus-I\\ am\\ reporting\\ provisional\\ data\\.").click();
    cy.get("#radio-178").check();
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get("#radio-182").check();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get('[data-cy="DataSource0"] > #DataSource').check();
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > #DefinitionOfDenominator'
    ).check();
    cy.get(
      "#DenominatorDefineTotalTechSpec-YesRepresentsTotalEligiblePop"
    ).click();
    cy.get("#radio-198").check();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).type("2134567");
    cy.get(".chakra-alert__title").should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.rate"]'
    ).should("have.value", "100.0");
    /* ==== End Cypress Studio ==== */
  });
  it("Second Calculation Test With Yes Option on all fields", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(20) > :nth-child(1) > a > .chakra-text").click();
    cy.xpath("//p[@id='DidReport-Yes, I am reporting']").click({ force: true });
    cy.get("#radio-174").check();
    cy.get("#DataStatus-I\\ am\\ reporting\\ provisional\\ data\\.").click();
    cy.get("#radio-178").check();
    cy.get("#MeasurementSpecification-NCQAHEDIS").click();
    cy.get("#radio-182").check();
    cy.get(
      '[data-cy="DataSource0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get('[data-cy="DataSource0"] > #DataSource').check();
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > .chakra-checkbox__label > .chakra-text'
    ).click();
    cy.get(
      '[data-cy="DefinitionOfDenominator0"] > #DefinitionOfDenominator'
    ).check();
    cy.get(
      "#DenominatorDefineTotalTechSpec-YesRepresentsTotalEligiblePop"
    ).click();
    cy.get("#radio-198").check();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).type("2134567");
    cy.get(".chakra-alert__title").should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.denominator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.0.rate"]'
    ).should("have.value", "100.0");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Alcohol.1.denominator"]'
    ).type("2134567");
    cy.get(".chakra-alert__title").should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(9) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.denominator"]'
    ).type("1234567");
    cy.get(
      ":nth-child(10) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.denominator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Alcohol.1.rate"]'
    ).should("have.value", "100.0");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(12) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.rate"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(13) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Opioid.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(15) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.numerator"]'
    ).click();
    cy.get("#field-230-label").click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.numerator"]'
    ).click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(16) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.denominator"]'
    ).type("21345677");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Opioid.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(18) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(19) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Other.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.numerator"]'
    ).type("12345678");
    cy.get(":nth-child(21) > .chakra-stack > :nth-child(2)").click();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(21) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(22) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Other.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.numerator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(26) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.0.rate"]'
    ).should("have.value", "100.0");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(27) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Initiation-Total.1.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.numerator"]'
    ).type("12345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(29) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.0.rate"]'
    ).should("have.value", "57.8");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.numerator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.numerator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.denominator"]'
    ).type("2134567");
    cy.get(
      ":nth-child(30) > .chakra-alert > .css-0 > .chakra-alert__title"
    ).should("have.text", "Rate Error");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.denominator"]'
    ).clear();
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.denominator"]'
    ).type("21345678");
    cy.get(
      '[data-cy="PerformanceMeasure-AgeRates-Engagement-Total.1.rate"]'
    ).should("have.value", "100.0");
    /* ==== End Cypress Studio ==== */
  });
  it("Test With No option", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("a > .chakra-text").click();
    cy.get(":nth-child(20) > :nth-child(1) > a > .chakra-text").click();
    cy.xpath("//p[@id='DidReport-No, I am not reporting']").click({
      force: true,
    });
    cy.get(":nth-child(3) > .chakra-form__label").should(
      "have.text",
      "Why are you not reporting on this measure?"
    );
    cy.xpath(
      "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/div[1]/form[1]/section[1]/div[2]/div[1]/div[1]"
    ).should("have.text", "Select all that apply:");
    cy.get(
      '[data-cy="WhyAreYouNotReporting0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Service not covered");
    cy.get(
      '[data-cy="WhyAreYouNotReporting1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Population not covered");
    cy.get(
      '[data-cy="WhyAreYouNotReporting2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data not available");
    cy.get(
      '[data-cy="WhyAreYouNotReporting3"] > .chakra-checkbox__label > .chakra-text'
    ).should(
      "have.text",
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
    );
    cy.get(
      '[data-cy="WhyAreYouNotReporting4"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Small sample size (less than 30)");
    cy.get(
      '[data-cy="WhyAreYouNotReporting5"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(":nth-child(4) > .css-1ddmh30").should(
      "have.text",
      "Additional Notes/Comments on the measure (optional)"
    );
    cy.xpath(
      "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/div[1]/form[1]/section[1]/div[3]/div[1]/label[1]"
    ).should(
      "have.text",
      "Please add any additional notes or comments on the measure not otherwise captured above:"
    );
    cy.get('[data-cy="AdditionalNotes-AdditionalNotes"]').should("be.visible");
    cy.get(".css-1bpnzr3 > .css-0").should(
      "have.text",
      "If you need additional space to include comments or supplemental information, please attach further documentation below."
    );
    cy.get(".css-i3jkqk").should("have.text", "Drag & drop or browse");
    cy.get(".css-1h4ws66 > .chakra-heading").should(
      "have.text",
      "Complete the Measure"
    );
    /* ==== End Cypress Studio ==== */
  });
});
