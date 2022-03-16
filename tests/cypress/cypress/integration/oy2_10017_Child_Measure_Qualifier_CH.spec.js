import { testConfig } from "../../test-config.js";
const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 10017 Child Measure Qualifier: CH", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type(testConfig.TEST_USER_1);
    cy.xpath(passwordForCognito).type(testConfig.TEST_PASSWORD_1);
    cy.get('[data-cy="login-with-cognito-button"]').click();
    cy.deleteChildCoreSets();
  });

  it.skip("Screen Enhancement and adding child core set seperate", () => {
    cy.wait(3000);
    cy.get('[data-cy="Add Child Core Set"]').click(); //asserting text
    cy.get("#ChildCoreSet-ReportType-separate").should(
      "have.text",
      "Reporting Medicaid and CHIP measures in separate Core sets"
    ); //asserting text
    cy.get("#ChildCoreSet-ReportType-combined").should(
      "have.text",
      "Reporting Medicaid and CHIP measures in combined Core sets"
    ); //asserting text
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //clicking on create
    cy.get('[data-cy="Create"]').click(); //adding seperate child core set
    cy.get(":nth-child(1) > .chakra-stack > .chakra-text").should(
      "have.text",
      "Need to report on Child data?"
    ); //asserting text
    cy.get(":nth-child(2) > .chakra-stack > .chakra-text").should(
      "have.text",
      "Need to report on Health Home data?"
    ); //asserting text
    cy.get(":nth-child(3) > :nth-child(1) > a > .chakra-text").should(
      "have.text",
      "Child Core Set Questions: CHIP"
    ); //asserting text
    /* ==== End Cypress Studio ==== */
  });
  it("Adding child core set combined", () => {
    cy.get('[data-cy="Add Child Core Set"]').click(); // clicking on adding child core set measures
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true }); //selecting combined core set
    cy.get('[data-cy="Create"]').click(); //clicking create
    cy.get(":nth-child(2) > :nth-child(1) > a > .chakra-text").should(
      "have.text",
      "Child Core Set Measures: Medicaid & CHIP"
    ); //asserting text
    /* ==== End Cypress Studio ==== */
  });
  it.skip("Child Core Set Measures: Medicaid", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="Add Child Core Set"]').click(); //clicking on add child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //clicking on combined
    cy.get('[data-cy="Create"]').click(); //clicking create
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(3) > :nth-child(1) > a > .chakra-text").click(); //clicking on child core set measure medicaid
    cy.get('[data-cy="core-set-qualifiers-link"]').click(); //click on questions on the top

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
    cy.get(".css-yfsr0f > .chakra-text").should("have.text", "Under Age 21");
    cy.get('[data-cy="+ Add Another"]').should("have.text", "+ Add Another");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOne"]'
    ).clear({ force: true });
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.0.UnderTwentyOne"]'
    ).type("11.1");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.1.UnderTwentyOne"]'
    ).type("21");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.2.UnderTwentyOne"]'
    ).type("00");
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.3.UnderTwentyOne"]'
    ).type("12");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.label"]'
    ).clear();
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.4.label"]').type(
      "Random"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.UnderTwentyOne"]'
    ).type("99");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.label"]'
    ).clear();
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.5.label"]').type(
      "Test"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.UnderTwentyOne"]'
    ).type("0");
    cy.get(
      ':nth-child(6) > .css-xumdn4 > .css-79elbk > [data-testid="delete-wrapper"]'
    ).click();
    cy.get("tbody.css-0 > .css-0").click();

    cy.get('[data-cy="+ Add Another"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.label"]'
    ).clear();
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.4.label"]').type(
      "Random"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.4.UnderTwentyOne"]'
    ).type("99");
    cy.get('[data-cy="+ Add Another"]').click();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.label"]'
    ).clear();
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.5.label"]').type(
      "Test"
    );
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.UnderTwentyOne"]'
    ).clear();
    cy.get(
      '[data-cy="PercentageEnrolledInEachDeliverySystem.5.UnderTwentyOne"]'
    ).type("0");
    cy.get(
      ':nth-child(6) > .css-xumdn4 > .css-79elbk > [data-testid="delete-wrapper"]'
    ).click({ force: true });
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "Yes, some of the Core Set measures have been audited or validated"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-No\\,\\ none\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "No, none of the Core Set measures have been audited or validated"
    );

    //Validating Yes Option Under 2 section
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).click({ force: true });
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.WhoConductedAuditOrValidation"]'
    ).clear();
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.WhoConductedAuditOrValidation"]'
    ).type("no one");
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "have.text",
      "Which measures did they audit or validate?"
    );
    cy.get(
      ".chakra-form-control > :nth-child(1) > .chakra-checkbox__label > .chakra-text"
    ).click({ force: true });
    //asserting text on all options under yes
    cy.get(
      ".chakra-form-control > :nth-child(1) > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "Select All");

    //adding another under the same section and asserting all text
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-zhlq69 > .css-0 > [data-cy="+ Add Another"]').click({
      forece: true,
    });
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.1.WhoConductedAuditOrValidation"]'
    ).clear();
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.1.WhoConductedAuditOrValidation"]'
    ).type("test");
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "have.text",
      "Which measures did they audit or validate?"
    );
    cy.get(
      ":nth-child(2) > .css-r4358i > .css-15inwrb > .chakra-stack > .chakra-form-control > :nth-child(1) > .chakra-checkbox__control"
    ).click({ force: true });
    /* ==== Generated with Cypress Studio ==== */
    cy.xpath(
      "//body/div[@id='root']/div[@id='app-wrapper']/main[@id='main-wrapper']/div[2]/form[1]/section[1]/ol[1]/li[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[2]/label[1]/span[2]/p[1]"
    ).should("have.text", "Select All");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMR-CH - Asthma Medication Ratio: Ages 5 to 18"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCW-CH - Contraceptive Care - All Women Ages 15-20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CHL-CH - Chlamydia Screening in Women Ages 16 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CIS-CH - Childhood Immunization Status"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-DEV-CH - Developmental Screening in the First Three Years of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IMA-CH - Immunizations for Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-SFM-CH - Sealant Receipt on Permanent First Molars"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-W30-CH - Well-Child Visits in the First 30 Months of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCV-CH - Child and Adolescent Well-Care Visits"]'
    ).should("be.visible");
    //testing section 3. External Contractor

    cy.get(":nth-child(3) > .css-1vvfi3 > .css-722v25").should(
      "have.text",
      "External Contractor"
    );
    cy.get(":nth-child(3) > .css-1vvfi3 > .css-0").should(
      "have.text",
      "Please indicate whether your state obtained assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data (optional)."
    );
    cy.get("#WasExternalContractorUsed-yes").should(
      "have.text",
      "Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data."
    );
    cy.get("#WasExternalContractorUsed-no").should(
      "have.text",
      "No, we calculated all the measures internally."
    );
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#WasExternalContractorUsed-yes").click({ force: true });
    cy.get(
      '#WasExternalContractorUsed_radiogroup > :nth-child(1) > :nth-child(1) > [style="overflow: initial; display: block; opacity: 1; height: auto;"] > .css-zhlq69 > .css-0'
    ).should("have.text", "Select all that apply:");
    cy.get(
      '[data-cy="ExternalContractorsUsed0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "External Quality Review Organization (EQRO)");
    cy.get(
      '[data-cy="ExternalContractorsUsed1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "MMIS Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data Analytics Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    cy.get(
      '[data-cy="ExternalContractorsUsed3"] > .chakra-checkbox__label > .chakra-text'
    ).click({ force: true });
    cy.xpath(
      "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/form[1]/section[1]/ol[1]/li[3]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/label[1]"
    ).should("have.text", "Please explain:");
    cy.get('[data-cy="OtherContractorDetails"]').click();
    //THIS is section 4. Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS

    cy.get(":nth-child(4) > .chakra-stack > .css-722v25").should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS"
    );
    cy.get(
      "[data-cy='complete-CoreSet']  [data-cy='qualifier-header-description']"
    ).should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS for review"
    );
    cy.get('[data-cy="complete-core-set-questions-button"]').should(
      "be.enabled"
    );
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?"
    );
    /* ==== End Cypress Studio ==== */
  });
  it("Child Core Set Measures: Chip", () => {
    //Adding Child Core Set Measure, combined
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true });
    cy.get('[data-cy="Create"]').click();
    cy.get(":nth-child(2) > :nth-child(1) > a > .chakra-text").click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    //testing Page Assertions, will test sections 1-4 and all text associated with it. Functionality was checked in prior scenario.
    cy.get(".css-1j31nc9").should(
      "have.text",
      "Child Core Set Questions: CHIP"
    );
    cy.get(".css-1wb0lb9 > .css-0").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get(".css-2lzsxm > .chakra-stack > .css-722v25").should(
      "have.text",
      "Delivery System"
    );
    cy.get(".css-2lzsxm > .chakra-stack > .css-0").should(
      "have.text",
      "As of September 30, 2021 what percentage of your CHIP enrollees (under age 21) were enrolled in each delivery system?"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.0.label"]').should(
      "be.visible"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.1.label"]').should(
      "be.visible"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.2.label"]').should(
      "be.visible"
    );
    cy.get('[data-cy="PercentageEnrolledInEachDeliverySystem.3.label"]').should(
      "be.visible"
    );
    cy.get('[data-cy="+ Add Another"]').should("be.enabled");
    cy.get(".css-itvw0n").should("have.text", "Under Age 21");
    cy.get(":nth-child(2) > .css-1vvfi3 > .css-722v25").should(
      "have.text",
      "Audit or Validation of Measures"
    );
    cy.get(":nth-child(2) > .css-1vvfi3 > .css-0").should(
      "have.text",
      "Were any of the Core Set meaures audited or validated?"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "Yes, some of the Core Set measures have been audited or validated"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-No\\,\\ none\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "No, none of the Core Set measures have been audited or validated"
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).click({ force: true });
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "have.text",
      "Which measures did they audit or validate?"
    );
    //TESTING SECTION 2. WITH YES OPTION
    cy.get(
      ".chakra-form-control > :nth-child(1) > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "Select All");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMR-CH - Asthma Medication Ratio: Ages 5 to 18"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCW-CH - Contraceptive Care - All Women Ages 15-20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CHL-CH - Chlamydia Screening in Women Ages 16 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CIS-CH - Childhood Immunization Status"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-DEV-CH - Developmental Screening in the First Three Years of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IMA-CH - Immunizations for Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-SFM-CH - Sealant Receipt on Permanent First Molars"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-W30-CH - Well-Child Visits in the First 30 Months of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCV-CH - Child and Adolescent Well-Care Visits"]'
    ).should("be.visible");
    cy.get('.css-zhlq69 > .css-0 > [data-cy="+ Add Another"]').should(
      "be.enabled"
    );
    //testing 3.0 External Contractors
    cy.get(":nth-child(3) > .css-1vvfi3 > .css-722v25").should(
      "have.text",
      "External Contractor"
    );
    cy.get(":nth-child(3) > .css-1vvfi3 > .css-0").should(
      "have.text",
      "Please indicate whether your state obtained assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data (optional)."
    );
    cy.get("#WasExternalContractorUsed-yes").should(
      "have.text",
      "Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data."
    );
    cy.get("#WasExternalContractorUsed-no").should(
      "have.text",
      "No, we calculated all the measures internally."
    );
    //Testing under yes option
    cy.get("#WasExternalContractorUsed-yes").click({ force: true });
    cy.get(
      '#WasExternalContractorUsed_radiogroup > :nth-child(1) > :nth-child(1) > [style="overflow: initial; display: block; opacity: 1; height: auto;"] > .css-zhlq69 > .css-0'
    ).should("have.text", "Select all that apply:");
    cy.get(
      '[data-cy="ExternalContractorsUsed0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "External Quality Review Organization (EQRO)");
    cy.get(
      '[data-cy="ExternalContractorsUsed1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "MMIS Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data Analytics Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    //testing section 4 Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS

    cy.get(":nth-child(4) > .chakra-stack > .css-722v25").should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS"
    );
    cy.get(
      "[data-cy='complete-CoreSet']  [data-cy='qualifier-header-description']"
    ).should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS for review"
    );
    cy.get('[data-cy="complete-core-set-questions-button"]').should(
      "be.enabled"
    );
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?"
    );
  });
  it("Child Core Set Measures: Combined", () => {
    //creating child core set combined and navigating to questions page
    cy.get('[data-cy="Add Child Core Set"]').click();
    cy.get("#ChildCoreSet-ReportType-combined").click({ force: true });
    cy.get('[data-cy="Create"]').click();
    cy.get(":nth-child(2) > :nth-child(1) > a > .chakra-text").click();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
    //testing section 1 with the fields inside it
    cy.get(".css-1j31nc9").should(
      "have.text",
      "Child Core Set Questions: Medicaid & CHIP"
    );
    cy.get(".css-1wb0lb9 > .css-0").should(
      "have.text",
      "For technical questions regarding use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    );
    cy.get(".css-2lzsxm > .chakra-stack > .css-722v25").should(
      "have.text",
      "Delivery System"
    );
    cy.get(".css-2lzsxm > .chakra-stack > .css-0").should(
      "have.text",
      "As of September 30, 2021 what percentage of your Medicaid/CHIP enrollees (under age 21) were enrolled in each delivery system?"
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
    cy.get("tr.css-0 > :nth-child(2) > .css-0").should("have.text", "Medicaid");
    cy.get("tr.css-0 > :nth-child(3) > .css-0").should("have.text", "CHIP");
    cy.get('[data-cy="+ Add Another"]').should("be.enabled");
    //testing section 2 with fields inside it including yes option
    cy.get(":nth-child(2) > .css-1vvfi3 > .css-722v25").should(
      "have.text",
      "Audit or Validation of Measures"
    );
    cy.get(":nth-child(2) > .css-1vvfi3 > .css-0").should(
      "have.text",
      "Were any of the Core Set meaures audited or validated?"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "Yes, some of the Core Set measures have been audited or validated"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-No\\,\\ none\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).should(
      "have.text",
      "No, none of the Core Set measures have been audited or validated"
    );
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).click({ force: true });
    cy.get('[data-cy="which-measures-did-they-audit-0"]').should(
      "have.text",
      "Which measures did they audit or validate?"
    );

    // begining of checking multiselect for values

    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AMR-CH - Asthma Medication Ratio: Ages 5 to 18"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCW-CH - Contraceptive Care - All Women Ages 15-20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CHL-CH - Chlamydia Screening in Women Ages 16 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CIS-CH - Childhood Immunization Status"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-DEV-CH - Developmental Screening in the First Three Years of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-IMA-CH - Immunizations for Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-SFM-CH - Sealant Receipt on Permanent First Molars"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-W30-CH - Well-Child Visits in the First 30 Months of Life"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCV-CH - Child and Adolescent Well-Care Visits"]'
    ).should("be.visible");
    // end of checking multiselect for values

    cy.get('.css-zhlq69 > .css-0 > [data-cy="+ Add Another"]').should(
      "be.enabled"
    );
    //testing section 3 with fields inside it
    cy.get(":nth-child(3) > .css-1vvfi3 > .css-722v25").should(
      "have.text",
      "External Contractor"
    );
    cy.get(":nth-child(3) > .css-1vvfi3 > .css-0").should(
      "have.text",
      "Please indicate whether your state obtained assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data (optional)."
    );
    cy.get("#WasExternalContractorUsed-yes").should(
      "have.text",
      "Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data."
    );
    cy.get("#WasExternalContractorUsed-no").should(
      "have.text",
      "No, we calculated all the measures internally."
    );
    cy.get("#WasExternalContractorUsed-yes").click({ force: true });
    cy.get(
      '[data-cy="ExternalContractorsUsed0"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "External Quality Review Organization (EQRO)");
    cy.get(
      '[data-cy="ExternalContractorsUsed1"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "MMIS Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed2"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Data Analytics Contractor");
    cy.get(
      '[data-cy="ExternalContractorsUsed3"] > .chakra-checkbox__label > .chakra-text'
    ).should("have.text", "Other");
    //testing sections 4 and rest of page
    cy.get(":nth-child(4) > .chakra-stack > .css-722v25").should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS"
    );
    cy.get(
      "[data-cy='complete-CoreSet']  [data-cy='qualifier-header-description']"
    ).should(
      "have.text",
      "Complete all Child Core Set Questions and Child Core Set Measures to submit to CMS for review"
    );
    cy.get('[data-cy="complete-core-set-questions-button"]').should(
      "be.enabled"
    );
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?"
    );
  });
});
