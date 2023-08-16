import { testingYear } from "../../../../support/constants";

describe("Health Home Measure Qualifier: HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
    cy.selectYear(testingYear);
  });

  it("Health Home Core Set Measures", () => {
    cy.goToHealthHomeSetMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get("body").should(
      "include.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content-related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );

    cy.get("body").should(
      "include.text",
      "The health home provision, authorized by section 2703 of the Affordable Care Act (section 1945 of the Social Security Act), provides an opportunity to build a person-centered care delivery model that focuses on improving outcomes and disease management for beneficiaries with chronic conditions. The Health Home Core Set of quality measures will be used to evaluate care across all state health home programs. Specifically, section 2703 requires health home providers to report health care quality measures in order to receive payment. The recommended Health Home Core Set will require reporting at the health home provider level which the state will collect and aggregate at the health home program level."
    );

    //testing section 1 with fields inside it

    cy.get("body").should("include.text", "Administrative Questions");
    cy.get("body").click();
    cy.get("body").should(
      "include.text",
      "What is the total annual number of adults in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfAdults"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfAdults"]').type("2");
    cy.get("body").click();
    cy.get("body").should(
      "include.text",
      "The minimum age of an adult in the program is:"
    );
    cy.get('[data-cy="AdministrativeData.minAgeOfAdults"]').clear();
    cy.get('[data-cy="AdministrativeData.minAgeOfAdults"]').type("123");
    cy.get("body").click();
    cy.get("body").should(
      "include.text",
      "What is the total annual number of children in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfChildren"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfChildren"]').type(
      "1234567890"
    );
    cy.get("body").click();
    cy.get("body").should(
      "include.text",
      "The maximum age of a child in the program is:"
    );
    cy.get('[data-cy="AdministrativeData.maxAgeChildren"]').clear();
    cy.get('[data-cy="AdministrativeData.maxAgeChildren"]').type("123");
    cy.get("body").should(
      "include.text",
      "What is the total annual number of individuals in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').type(
      "1234567890"
    );
    cy.get("body").should(
      "include.text",
      "What is the number of providers operating under the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfProviders"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfProviders"]').type(
      "1234567890"
    );

    //testing section 2 with fields inside it
    cy.get("body").should("include.text", "Cost Savings Data");
    cy.get('[data-cy="Amount of cost savings for FFY 2022"]').should(
      "include.text",
      "Amount of cost savings for FFY 2022"
    );
    cy.get('[data-cy="yearlyCostSavings"]').clear();
    cy.get('[data-cy="yearlyCostSavings"]').type("1234567890");
    cy.get('[data-cy="Please describe your cost savings methodology:"]').should(
      "include.text",
      "Please describe your cost savings methodology:"
    );
    cy.get("body").should(
      "include.text",
      "If you need additional space to provide information regarding cost savings data, please attach further documentation below."
    );
    const filePath = "fixtures/files/";
    cy.get('[data-testid="upload-stack"]').scrollIntoView();
    cy.get('[data-testid="upload-component"]')
      .invoke("show")
      .selectFile(`${filePath}adobe.pdf`);

    //testing section 3 with fields inside it
    cy.get("body").should("include.text", "Delivery System");
    cy.get("body").should(
      "include.text",
      "As of September 30, 2022 what percentage of your Medicaid Health Home enrollees were enrolled in each delivery system?"
    );
    cy.get("body").should("include.text", "Ages 0 to 17");
    cy.get("body").should("include.text", "Ages 18 to 64");
    cy.get("body").should("include.text", "Age 65 and older");
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.0.label"]').should(
      "have.value",
      "Fee-for-Service"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.1.label"]').should(
      "have.value",
      "PCCM"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.2.label"]').should(
      "have.value",
      "Managed Care"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.3.label"]').should(
      "have.value",
      "Integrated Care Model (ICM)"
    );
    cy.get('[data-cy="+ Add Another"]').should("be.enabled");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.ZeroToSeventeen"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.ZeroToSeventeen"]'
    ).type("98");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.EighteenToSixtyFour"]'
    ).clear({ force: true });
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.EighteenToSixtyFour"]'
    ).type("102");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFive"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFive"]'
    ).type("103");
    cy.get('[data-cy="+ Add Another"]').should("be.enabled");

    //testing section 4 with fields inside it
    cy.get("body").should("include.text", "Audit or Validation of Measures");
    cy.get("body").should(
      "include.text",
      "Were any of the Core Set measures audited or validated (optional)?"
    );
    cy.get('[data-cy="CoreSetMeasuresAuditedOrValidated0"]').click();

    cy.get('[data-cy="Who conducted the audit or validation?"]').should(
      "include.text",
      "Who conducted the audit or validation?"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.WhoConductedAuditOrValidation"]'
    ).type("Alexa");
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "include.text",
      "Which measures did they audit or validate?"
    );

    cy.get(".chakra-checkbox__control").eq(1).click();

    cy.get("body").should("include.text", "Select All");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AIF-HH - Admission to a Facility from the Community"]'
    ).should(
      "include.text",
      "AIF-HH - Admission to a Facility from the Community"
    );

    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMB-HH - Ambulatory Care: Emergency Department (ED) Visits"]'
    ).should(
      "include.text",
      "AMB-HH - Ambulatory Care: Emergency Department (ED) Visits"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CBP-HH - Controlling High Blood Pressure"]'
    ).should("include.text", "CBP-HH - Controlling High Blood Pressure");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-HH - Screening for Depression and Follow-Up Plan"]'
    ).should(
      "include.text",
      "CDF-HH - Screening for Depression and Follow-Up Plan"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUA-HH - Follow-Up After Emergency Department Visit for Substance Use"]'
    ).should(
      "include.text",
      "FUA-HH - Follow-Up After Emergency Department Visit for Substance Use"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUH-HH - Follow-Up After Hospitalization for Mental Illness"]'
    ).should(
      "include.text",
      "FUH-HH - Follow-Up After Hospitalization for Mental Illness"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IET-HH - Initiation and Engagement of Substance Use Disorder Treatment"]'
    ).should(
      "include.text",
      "IET-HH - Initiation and Engagement of Substance Use Disorder Treatment"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IU-HH - Inpatient Utilization"]'
    ).should("include.text", "IU-HH - Inpatient Utilization");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-OUD-HH - Use of Pharmacotherapy for Opioid Use Disorder"]'
    ).should(
      "include.text",
      "OUD-HH - Use of Pharmacotherapy for Opioid Use Disorder"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PCR-HH - Plan All-Cause Readmissions"]'
    ).should("include.text", "PCR-HH - Plan All-Cause Readmissions");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PQI92-HH - Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite"]'
    ).should(
      "include.text",
      "PQI92-HH - Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite"
    );
    cy.get('[data-cy="+ Add Another"]').should("be.enabled");
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-No\\,\\ none\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "include.text",
      "No, none of the Core Set measures have been audited or validated"
    );

    //testing section 5 with fields inside it
    cy.get('[data-cy="complete-CoreSet"] > .css-1vvfi3 > .css-722v25').should(
      "include.text",
      "Complete all Health Home Core Set Questions and Health Home Core Set Measures to submit to CMS"
    );
    cy.get(
      '[data-cy="complete-CoreSet"] > .css-1vvfi3 > [data-cy="qualifier-header-description"]'
    ).should(
      "include.text",
      "Complete all Health Home Core Set Questions and Health Home Core Set Measures to submit to CMS for review."
    );
    cy.get('[data-cy="validate-core-set-questions-button"]').should(
      "be.enabled"
    );
    cy.get('[data-cy="validate-core-set-questions-button"]').click();
    // cy.get('[data-cy="ZeroToSeventeen-total"]').should(
    //   "have.text",
    //   "Entries for Ages 0 to 17 column must total 100"
    // );
    // cy.get(
    //   '[data-cy="Entries for Ages 18 to 64 column must total 100"] > .chakra-text'
    // ).should("have.text", "Entries for Ages 18 to 64 column must total 100");
    // cy.get(
    //   '[data-cy="Entries for Age 65 and Older column must total 100"] > .chakra-text'
    // ).should("have.text", "Entries for Age 65 and Older column must total 100");
    cy.get(
      '[data-cy="The sum of adults and children did not equal total individuals"] > .chakra-text'
    ).should(
      "have.text",
      "The sum of adults and children did not equal total individuals"
    );
    cy.get('[data-cy="complete-core-set-questions-button"]').should(
      "be.enabled"
    );

    //Generic questions and PRA statement
    cy.get("body").should(
      "include.text",
      "Do you have questions or need support?"
    );
    cy.get("body").should(
      "include.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content-related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );

    cy.get("body").should(
      "include.text",
      "PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS) collects this mandatory information in accordance with (42 U.S.C. 1396a) and (42 CFR 430.12); which sets forth the authority for the submittal and collection of state plans and plan amendment information in a format defined by CMS for the purpose of improving the state application and federal review processes, improve federal program management of Medicaid programs and Children’s Health Insurance Program, and to standardize Medicaid program data which covers basic requirements, and individual content that reflects the characteristics of the particular state’s program. The information will be used to monitor and analyze performance metrics related to the Medicaid and Children’s Health Insurance Program in efforts to boost program integrity efforts, improve performance and accountability across the programs. Under the Privacy Act of 1974 any personally identifying information obtained will be kept private to the extent of the law. According to the Paperwork Reduction Act of 1995, no persons are required to respond to a collection of information unless it displays a valid OMB control number. The valid OMB control number for this information collection is 0938-1188. The time required to complete and review the information collection is estimated to range from 1 hour to 80 hours per response (see below), including the time to review instructions, search existing data resources, gather the data needed, and completeand review the information collection. If you have comments concerning the accuracy of the time estimate(s) or suggestions for imprving this form, please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clerance Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850."
    );
  });
});
