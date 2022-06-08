describe("Health Home Measure Qualifier: HH", () => {
  beforeEach(() => {
    cy.loginHealthHome();
  });

  it("Health Home Core Set Measures", () => {
    cy.goToHealthHomeSetMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get(".css-1wb0lb9 > .css-0").should(
      "contain.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content-related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );

    cy.get(".css-1hx6vl7").should(
      "contain.text",
      "The Health Home provision, authorized by section 2703 of the Affordable Care Act (section 1945 of the Social Security Act), provides an opportunity to build a person-centered care delivery model that focuses on improving outcomes and disease management for beneficiaries with chronic conditions. The Health Home core set of quality measures will be used to evaluate care across all state Health Home programs. Specifically, section 2703 requires Health Home providers to report health care quality measures in order to receive payment. The recommended Health Home core set will require reporting at the Health Home provider level which the state will collect and aggregate at the Health Home program level."
    );

    //testing section 1 with fields inside it

    cy.get(":nth-child(1) > .chakra-stack > .css-722v25").should(
      "contain.text",
      "Administrative Questions"
    );
    cy.get(':nth-child(2) > [data-cy="[object Object]"]').click();
    cy.get(':nth-child(2) > [data-cy="[object Object]"]').should(
      "contain.text",
      "What is the total annual number of adults in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfAdults"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfAdults"]').type("2");
    cy.get(':nth-child(3) > [data-cy="[object Object]"]').click();
    cy.get(':nth-child(3) > [data-cy="[object Object]"]').should(
      "contain.text",
      "The minimum age of an adult in the program is:"
    );
    cy.get('[data-cy="AdministrativeData.minAgeOfAdults"]').clear();
    cy.get('[data-cy="AdministrativeData.minAgeOfAdults"]').type("123");
    cy.get(':nth-child(4) > [data-cy="[object Object]"]').click();
    cy.get(':nth-child(4) > [data-cy="[object Object]"]').should(
      "contain.text",
      "What is the total annual number of children in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfChildren"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfChildren"]').type(
      "1234567890"
    );
    cy.get(':nth-child(5) > [data-cy="[object Object]"]').click();
    cy.get(':nth-child(5) > [data-cy="[object Object]"]').should(
      "contain.text",
      "The maximum age of a child in the program is:"
    );
    cy.get('[data-cy="AdministrativeData.maxAgeChildren"]').clear();
    cy.get('[data-cy="AdministrativeData.maxAgeChildren"]').type("123");
    cy.get(':nth-child(6) > [data-cy="[object Object]"]').should(
      "contain.text",
      "What is the total annual number of individuals in the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').type(
      "1234567890"
    );
    cy.get(':nth-child(7) > [data-cy="[object Object]"]').should(
      "contain.text",
      "What is the number of providers operating under the Health Home program?"
    );
    cy.get('[data-cy="AdministrativeData.numberOfProviders"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfProviders"]').type(
      "1234567890"
    );

    //testing section 2 with fields inside it
    cy.get(":nth-child(2) > .css-1vvfi3 > .css-722v25").should(
      "contain.text",
      "Cost Savings Data"
    );
    cy.get('[data-cy="Amount of cost savings for FFY 2020"]').should(
      "contain.text",
      "Amount of cost savings for FFY 2020"
    );
    cy.get('[data-cy="yearlyCostSavings"]').clear();
    cy.get('[data-cy="yearlyCostSavings"]').type("1234567890");
    cy.get('[data-cy="Please describe your cost savings methodology:"]').should(
      "contain.text",
      "Please describe your cost savings methodology:"
    );
    cy.get(".css-1bpnzr3 > .css-0").should(
      "contain.text",
      "If you need additional space to provide information regarding cost savings data, please attach further documentation below."
    );
    const browseBtn = "//u[contains(text(),'browse')]";
    cy.xpath(browseBtn).attachFile("/files/adobe.pdf", {
      subjectType: "drag-n-drop",
    });

    //testing section 3 with fields inside it
    cy.get(":nth-child(3) > .chakra-stack > .css-722v25").should(
      "contain.text",
      "Delivery System"
    );
    cy.get(
      ':nth-child(3) > .chakra-stack > [data-cy="qualifier-header-description"]'
    ).should(
      "contain.text",
      "As of September 30, 2020 what percentage of your Medicaid Health Home enrollees were enrolled in each delivery system (optional)?"
    );
    cy.get("tr.css-0 > :nth-child(2) > .chakra-text").should(
      "contain.text",
      "Ages 0 to 17"
    );
    cy.get("tr.css-0 > :nth-child(3) > .chakra-text").should(
      "contain.text",
      "Ages 18 to 64"
    );
    cy.get("tr.css-0 > :nth-child(4) > .chakra-text").should(
      "contain.text",
      "Age 65 and older"
    );
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
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.EighteenToSixtyFour"]'
    ).type("102");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFive"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFive"]'
    ).type("103");
    cy.get('tbody.css-0 > .css-0 > [data-cy="+ Add Another"]').should(
      "be.enabled"
    );

    //testing section 4 with fields inside it
    cy.get(":nth-child(4) > .css-1vvfi3 > .css-722v25").should(
      "contain.text",
      "Audit or Validation of Measures"
    );
    cy.get(
      ':nth-child(4) > .css-1vvfi3 > [data-cy="qualifier-header-description"]'
    ).should(
      "contain.text",
      "Were any of the Core Set measures audited or validated (optional)?"
    );
    cy.get('[data-cy="CoreSetMeasuresAuditedOrValidated0"]').click();

    cy.get('[data-cy="Who conducted the audit or validation?"]').should(
      "contain.text",
      "Who conducted the audit or validation?"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.WhoConductedAuditOrValidation"]'
    ).clear();
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.WhoConductedAuditOrValidation"]'
    ).type("Alexa");
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "contain.text",
      "Which measures did they audit or validate?"
    );
    cy.get(
      ".chakra-form-control > :nth-child(1) > .chakra-checkbox__label > .chakra-text"
    ).should("contain.text", "Select All");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AIF-HH - Admission to an Institution from the Community"]'
    ).should(
      "contain.text",
      "AIF-HH - Admission to an Institution from the Community"
    );
    cy.get(
      ".chakra-form-control > :nth-child(4) > .chakra-checkbox > .chakra-checkbox__control"
    ).click({ force: true });
    cy.get(
      ".chakra-form-control > :nth-child(4) > .chakra-checkbox > .chakra-checkbox__input"
    ).check();

    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMB-HH - Ambulatory Care: Emergency Department (ED) Visits"]'
    ).should(
      "contain.text",
      "AMB-HH - Ambulatory Care: Emergency Department (ED) Visits"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CBP-HH - Controlling High Blood Pressure"]'
    ).should("contain.text", "CBP-HH - Controlling High Blood Pressure");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-HH - Screening for Depression and Follow-Up Plan"]'
    ).should(
      "contain.text",
      "CDF-HH - Screening for Depression and Follow-Up Plan"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUA-HH - Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence"]'
    ).should(
      "contain.text",
      "FUA-HH - Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUH-HH - Follow-Up after Hospitalization for Mental Illness"]'
    ).should(
      "contain.text",
      "FUH-HH - Follow-Up after Hospitalization for Mental Illness"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IET-HH - Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment"]'
    ).should(
      "contain.text",
      "IET-HH - Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IU-HH - Inpatient Utilization"]'
    ).should("contain.text", "IU-HH - Inpatient Utilization");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-OUD-HH - Use of Pharmacotherapy for Opioid Use Disorder"]'
    ).should(
      "contain.text",
      "OUD-HH - Use of Pharmacotherapy for Opioid Use Disorder"
    );
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PCR-HH - Plan All-Cause Readmissions"]'
    ).should("contain.text", "PCR-HH - Plan All-Cause Readmissions");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PQI92-HH - Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite"]'
    ).should(
      "contain.text",
      "PQI92-HH - Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite"
    );
    cy.get('.css-zhlq69 > .css-0 > [data-cy="+ Add Another"]').should(
      "be.enabled"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-No\\,\\ none\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "contain.text",
      "No, none of the Core Set measures have been audited or validated"
    );

    //testing section 5 with fields inside it
    cy.get('[data-cy="complete-CoreSet"] > .css-1vvfi3 > .css-722v25').should(
      "contain.text",
      "Complete all Health Home Core Set Questions and Health Home Core Set Measures to submit to CMS"
    );
    cy.get(
      '[data-cy="complete-CoreSet"] > .css-1vvfi3 > [data-cy="qualifier-header-description"]'
    ).should(
      "contain.text",
      "Complete all Health Home Core Set Questions and Health Home Core Set Measures to submit to CMS for review."
    );
    cy.get('[data-cy="validate-core-set-questions-button"]').should(
      "be.enabled"
    );
    cy.get('[data-cy="validate-core-set-questions-button"]').click();
    cy.get(
      '[data-cy="Entries for Ages 0 to 17 column must total 100"] > .chakra-text'
    ).should("have.text", "Entries for Ages 0 to 17 column must total 100");
    cy.get(
      '[data-cy="Entries for Ages 18 to 64 column must total 100"] > .chakra-text'
    ).should("have.text", "Entries for Ages 18 to 64 column must total 100");
    cy.get(
      '[data-cy="Entries for Age 65 and Older column must total 100"] > .chakra-text'
    ).should("have.text", "Entries for Age 65 and Older column must total 100");
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
    cy.get(".css-nejllv").should(
      "contain.text",
      "Do you have questions or need support?"
    );
    cy.get(".css-ltugf9 > .css-0").should(
      "contain.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content-related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );

    cy.get(".css-ipuaqi").should(
      "contain.text",
      "PRA Disclosure Statement: Centers for Medicare & Medicaid Services (CMS) collects this mandatory information in accordance with (42 U.S.C. 1396a) and (42 CFR 430.12); which sets forth the authority for the submittal and collection of state plans and plan amendment information in a format defined by CMS for the purpose of improving the state application and federal review processes, improve federal program management of Medicaid programs and Children’s Health Insurance Program, and to standardize Medicaid program data which covers basic requirements, and individual content that reflects the characteristics of the particular state’s program. The information will be used to monitor and analyze performance metrics related to the Medicaid and Children’s Health Insurance Program in efforts to boost program integrity efforts, improve performance and accountability across the programs. Under the Privacy Act of 1974 any personally identifying information obtained will be kept private to the extent of the law. According to the Paperwork Reduction Act of 1995, no persons are required to respond to a collection of information unless it displays a valid OMB control number. The valid OMB control number for this information collection is 0938-1188. The time required to complete and review the information collection is estimated to range from 1 hour to 80 hours per response (see below), including the time to review instructions, search existing data resources, gather the data needed, and completeand review the information collection. If you have comments concerning the accuracy of the time estimate(s) or suggestions for imprving this form, please write to: CMS, 7500 Security Boulevard, Attn: PRA Reports Clerance Office, Mail Stop C4-26-05, Baltimore, Maryland 21244-1850."
    );

    cy.get('[data-cy="upload-delete-btn-0"]').click();
  });

  it("Health Home Core Set Measures", () => {
    cy.goToHealthHomeSetMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.EighteenToSixtyFour"]'
    ).clear();

    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.GreaterThanSixtyFive"]'
    ).clear();
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').clear();
    cy.get('[data-cy="AdministrativeData.numberOfIndividuals"]').type(
      "1234567892"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.ZeroToSeventeen"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.ZeroToSeventeen"]'
    ).type("2");
    cy.get('[data-cy="CoreSetMeasuresAuditedOrValidated1"]').click();
    cy.get('[data-cy="validate-core-set-questions-button"]').click();
    cy.get(
      '[data-cy="The Qualifier has been validated successfully"] > .chakra-text'
    ).should("have.text", "The Qualifier has been validated successfully");
  });
});
