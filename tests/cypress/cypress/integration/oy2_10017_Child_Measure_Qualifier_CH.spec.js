const emailForCognito = "//input[@name='email']";
const passwordForCognito = "//input[@name='password']";

describe("OY2 10017 Child Measure Qualifier: CH", () => {
  beforeEach(() => {
    // Seed database with test data
    cy.visit("/");
    cy.xpath(emailForCognito).type("stateuser1@test.com");
    cy.xpath(passwordForCognito).type("p@55W0rd!");
    cy.get('[data-cy="login-with-cognito-button"]').click();
    cy.deleteChildCoreSets();
  });

  it("Screen Enhancement and adding child core set seperate", () => {
    cy.get('[data-cy="Add Child Core Set"]').click(); //asserting text
    cy.get(".css-1au6mu0 > .chakra-heading").should(
      "have.text",
      "Child Core Set Details"
    ); //asserting text
    cy.get(".css-1au6mu0 > .chakra-text.css-0").should(
      "have.text",
      "Complete the details below and when finished create the additional Child Core Set report(s)."
    ); //asserting text
    cy.get("#field-5-label").should(
      "have.text",
      "1. How are you reporting Child Core Set measures?"
    ); //asserting text
    cy.get("#ChildCoreSet-ReportType-separate").should(
      "have.text",
      "Reporting Medicaid and CHIP measures in separate core sets"
    ); //asserting text
    cy.get("#ChildCoreSet-ReportType-combined").should(
      "have.text",
      "Reporting Medicaid and CHIP measures in combined core sets"
    ); //asserting text
    cy.get(".css-35ezg3").should(
      "have.text",
      "2. Finish to create the Child Core Set report(s)"
    ); //asserting text
    cy.get(".css-103jp41").should(
      "have.text",
      "Remember to complete all Child Core Set Questions and Child Core Set Measures to submit for CMS review."
    ); //asserting text
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?" //asserting text
    );
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //clicking on create
    cy.get('[data-cy="Create"]').click(); //adding seperate child core set

    cy.get(".css-1a48qf7 > .chakra-heading").should(
      "have.text",
      "FFY 2021 Core Set Measures Reporting"
    ); //asserting text
    cy.get(":nth-child(1) > .chakra-stack > .chakra-text").should(
      "have.text",
      "Need to report on Child data?"
    ); //asserting text
    cy.get(":nth-child(2) > .chakra-stack > .chakra-text").should(
      "have.text",
      "Need to report on Health Homes data?"
    ); //asserting text
    cy.get(".css-nejllv").should(
      "have.text",
      "Do you have questions or need support?"
    ); //asserting text
    cy.get(".css-uwro2k > .chakra-text").should(
      "have.text",
      "Only one group of Adult Core Set Measures can be submitted per FFY"
    ); //asserting text
    cy.get(":nth-child(3) > :nth-child(1) > a > .chakra-text").should(
      "have.text",
      "Child Core Set Measures: Medicaid"
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
  it("Child Core Set Measures: Medicaid", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="Add Child Core Set"]').click(); //clicking on add child core set measures
    cy.get("#ChildCoreSet-ReportType-separate").click({ force: true }); //clicking on combined
    cy.get('[data-cy="Create"]').click(); //clicking create
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(3) > :nth-child(1) > a > .chakra-text").click(); //clicking on child core set measure medicaid
    cy.get('[data-cy="core-set-qualifiers-link"]').click(); //click on questions on the top
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".css-1j31nc9").should(
      "have.text",
      "Child Core Set Questions: Medicaid"
    ); //asserting text
    cy.get(".css-1wb0lb9 > .css-0").should(
      "have.text",
      "For technical questions regaring use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
    ); //asserting text on top of screen
    cy.get(".css-2lzsxm > .chakra-stack > .css-722v25").should(
      "have.text",
      "Delivery System"
    ); // asserting text on 1. delivery system
    //Asserting 1.Delivery Sysyem and everything inside it.
    cy.get(".css-2lzsxm > .chakra-stack > .css-0").should(
      "have.text",
      "As of September 30, 2021 what percentage of your Medicaid enrollees (under age 21) were enrolled in each delivery system?"
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

    //Asserting 2. Audit or Validation of Measures
    /* ==== Generated with Cypress Studio ==== */
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

    //Validating Yes Option Under 2 section
    cy.get(
      "#CoreSetMeasuresAuditedOrValidated-Yes\\,\\ some\\ of\\ the\\ Core\\ Set\\ measures\\ have\\ been\\ audited\\ or\\ validated"
    ).click({ force: true });
    cy.xpath(
      "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/form[1]/section[1]/ol[1]/li[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/label[1]"
    ).should("have.text", "Who conducted the audit or validation?");
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
    cy.get(
      ".chakra-form-control > :nth-child(2) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"
    );
    cy.get(
      ":nth-child(3) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"
    );
    cy.get(
      ":nth-child(4) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "AMR-CH - Asthma Medication Ratio: Ages 5 to 18");
    cy.get(
      ":nth-child(5) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      ":nth-child(6) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      ":nth-child(7) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"
    );
    cy.get(
      ":nth-child(8) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.class", "chakra-text");
    cy.get(
      ":nth-child(9) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CCW-CH - Contraceptive Care - All Women Ages 15-20");
    cy.get(
      ":nth-child(10) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"
    );
    cy.get(
      ":nth-child(11) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CHL-CH - Chlamydia Screening in Women Ages 16 to 20"
    );
    cy.get(
      ":nth-child(12) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CIS-CH - Childhood Immunization Status");
    cy.get(
      ":nth-child(13) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"
    );
    cy.get(
      ":nth-child(14) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "DEV-CH - Developmental Screening in the First Three Years of Life"
    );
    cy.get(
      ":nth-child(15) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"
    );
    cy.get(
      ":nth-child(16) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "IMA-CH - Immunizations for Adolescents");
    cy.get(
      ":nth-child(17) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "LBW-CH - Live Births Weighing Less Than 2,500 Grams"
    );
    cy.get(
      ":nth-child(18) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "LRCD-CH - Low-Risk Cesarean Delivery");
    cy.get(
      ":nth-child(19) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PDENT-CH - Percentage of Eligibles Who Received Preventive Dental Services"
    );
    cy.get(
      ":nth-child(20) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"
    );
    cy.get(
      ":nth-child(21) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "SFM-CH - Sealant Receipt on Permanent First Molars");
    cy.get(
      ":nth-child(22) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "W30-CH - Well-Child Visits in the First 30 Months of Life"
    );
    cy.get(
      ":nth-child(23) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"
    );
    cy.get(
      ":nth-child(24) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "WCV-CH - Child and Adolescent Well-Care Visits");
    //adding another under the same section and asserting all text
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-zhlq69 > .css-0 > [data-cy="+ Add Another"]').click({
      forece: true,
    });
    cy.xpath(
      "/html[1]/body[1]/div[1]/div[1]/main[1]/div[2]/form[1]/section[1]/ol[1]/li[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/label[1]"
    ).should("have.text", "Who conducted the audit or validation?");
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
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(2) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(3) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(4) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "AMR-CH - Asthma Medication Ratio: Ages 5 to 18");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(5) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(5) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(6) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(7) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(8) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(9) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "CCW-CH - Contraceptive Care - All Women Ages 15-20");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(10) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(11) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "CHL-CH - Chlamydia Screening in Women Ages 16 to 20"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(12) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "CIS-CH - Childhood Immunization Status");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(13) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(14) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "DEV-CH - Developmental Screening in the First Three Years of Life"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(15) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(16) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "IMA-CH - Immunizations for Adolescents");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(17) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "LBW-CH - Live Births Weighing Less Than 2,500 Grams"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(18) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "LRCD-CH - Low-Risk Cesarean Delivery");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(19) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "PDENT-CH - Percentage of Eligibles Who Received Preventive Dental Services"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(20) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(21) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "SFM-CH - Sealant Receipt on Permanent First Molars");
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(22) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "W30-CH - Well-Child Visits in the First 30 Months of Life"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(23) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should(
      "have.text",
      "WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"
    );
    cy.get(
      "body.chakra-ui-light:nth-child(2) div.chakra-container.css-4hb9ch section.css-1c54vx9 ol.css-1dg6mvm li.css-0:nth-child(2) div.chakra-stack.css-n21gh5:nth-child(3) div.css-1rwovhe div.chakra-form-control.css-1kxonj9 div.chakra-radio-group.css-0 div.chakra-stack.css-n21gh5 div.css-79elbk:nth-child(1) div.chakra-collapse div.css-zhlq69 div.chakra-stack.css-87vs99 div.css-j43fqm:nth-child(2) div.css-r4358i div.css-15inwrb div.chakra-stack.css-6pejbm div.chakra-form-control.css-1kxonj9 div.css-1xv6f1u:nth-child(24) label.chakra-checkbox.css-1uiwwan span.chakra-checkbox__label.css-7venl8 > p.chakra-text.css-1m49yyc"
    ).should("have.text", "WCV-CH - Child and Adolescent Well-Care Visits");
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
    cy.get(":nth-child(4) > .chakra-stack > .css-0").should(
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
      "For technical questions regaring use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
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
      ".chakra-form-control > :nth-child(2) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "ADD-CH - Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication"
    );
    cy.get(
      ":nth-child(3) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "AMB-CH - Ambulatory Care: Emergency Department (ED) Visits"
    );
    cy.get(
      ":nth-child(4) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "AMR-CH - Asthma Medication Ratio: Ages 5 to 18");
    cy.get(
      ":nth-child(5) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "APM-CH - Metabolic Monitoring for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      ":nth-child(6) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "APP-CH - Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics"
    );
    cy.get(
      ":nth-child(7) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "AUD-CH - Audiological Diagnosis No Later Than 3 Months of Age"
    );
    cy.get(
      ":nth-child(8) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"
    );
    cy.get(
      ":nth-child(9) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CCW-CH - Contraceptive Care - All Women Ages 15-20");
    cy.get(
      ":nth-child(10) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CDF-CH - Screening for Depression and Follow-up Plan: Ages 12 to 17"
    );
    cy.get(
      ":nth-child(11) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CHL-CH - Chlamydia Screening in Women Ages 16 to 20"
    );
    cy.get(
      ":nth-child(12) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CIS-CH - Childhood Immunization Status");
    cy.get(
      ":nth-child(13) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"
    );
    cy.get(".chakra-form-control > :nth-child(14)").should(
      "have.text",
      "DEV-CH - Developmental Screening in the First Three Years of Life"
    );
    cy.get(
      ":nth-child(15) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "FUH-CH - Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17"
    );
    cy.get(
      ":nth-child(16) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "IMA-CH - Immunizations for Adolescents");
    cy.get(
      ":nth-child(17) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "LBW-CH - Live Births Weighing Less Than 2,500 Grams"
    );
    cy.get(
      ":nth-child(18) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "LRCD-CH - Low-Risk Cesarean Delivery");
    cy.get(
      ":nth-child(19) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PDENT-CH - Percentage of Eligibles Who Received Preventive Dental Services"
    );
    cy.get(
      ":nth-child(20) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PPC-CH - Prenatal and Postpartum Care: Timeliness of Prenatal Care"
    );
    cy.get(
      ":nth-child(21) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "SFM-CH - Sealant Receipt on Permanent First Molars");
    cy.get(
      ":nth-child(22) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "W30-CH - Well-Child Visits in the First 30 Months of Life"
    );
    cy.get(
      ":nth-child(23) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "WCC-CH - Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents"
    );
    cy.get(
      ":nth-child(24) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "WCV-CH - Child and Adolescent Well-Care Visits");
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
    cy.get(":nth-child(4) > .chakra-stack > .css-0").should(
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
      "For technical questions regaring use of this application, please reach out to MDCT_help@cms.hhs.gov. For content related questions, such as about measure specifications or what information to enter into each field, please reach out to MACQualityTA@cms.hhs.gov."
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
    cy.get(
      ".chakra-form-control > :nth-child(1) > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "Select All");
    cy.get(
      ".chakra-form-control > :nth-child(2) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "AMM-AD - Antidepressant Medication Management");
    cy.get(
      ":nth-child(3) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "AMR-AD - Asthma Medication Ratio: Ages 19 to 64");
    cy.get(
      ":nth-child(4) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "BCS-AD - Breast Cancer Screening");
    cy.get(
      ":nth-child(5) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CBP-AD - Controlling High Blood Pressure");
    cy.get(
      ":nth-child(6) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CCP-AD - Contraceptive Care - Postpartum Women Ages 21 to 44"
    );
    cy.get(
      ":nth-child(7) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CCS-AD - Cervical Cancer Screening");
    cy.get(
      ":nth-child(8) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CCW-AD - Contraceptive Care - All Women Ages 21 to 44"
    );
    cy.get(
      ":nth-child(9) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CDF-AD - Screening for Depression and Follow-Up Plan: Age 18 and older"
    );
    cy.get(
      ":nth-child(10) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "CHL-AD - Chlamydia Screening in Women Ages 21-24");
    cy.get(
      ":nth-child(11) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "COB-AD - Concurrent Use of Opioids and Benzodiazepines"
    );
    cy.get(
      ":nth-child(12) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "CPA-AD - Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)"
    );
    cy.get(
      ":nth-child(13) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "FUA-AD - Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence"
    );
    cy.get(
      ":nth-child(14) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "FUH-AD - Follow-up after Hospitalization for Mental Illness: Age 18 and older"
    );
    cy.get(
      ":nth-child(15) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "FUM-AD - Follow-Up after Emergency Department Visit for Mental Illness"
    );
    cy.get(
      ":nth-child(16) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "FVA-AD - Flu Vaccinations for Adults Ages 18 to 64");
    cy.get(
      ":nth-child(17) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "HPC-AD - Comprehensive Diabetes Care: Hemoglobin A1c Poor Control (>9.0%)"
    );
    cy.get(
      ":nth-child(18) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "HPCMI-AD - Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)"
    );
    cy.get(
      ":nth-child(19) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "HVL-AD - HIV Viral Loan Suppression");
    cy.get(
      ":nth-child(20) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "IET-AD - Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment"
    );
    cy.get(
      ":nth-child(21) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "MSC-AD - Medical Assistance with Smoking and Tobacco Use Cessation"
    );
    cy.get(
      ":nth-child(22) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "NCIDDS-AD - National Core Indicators Survey");
    cy.get(
      ":nth-child(23) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "OHD-AD - User of Opioids at High Dosage in Persons Without Cancer"
    );
    cy.get(
      ":nth-child(24) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "OUD-AD - Use of Pharmacotherapy for Opioid Use Disorder"
    );
    cy.get(
      ":nth-child(25) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "PC01-AD - PC-01: Elective Delivery");
    cy.get(
      ":nth-child(26) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "PCR-AD - Plan All-Cause Readmissions");
    cy.get(
      ":nth-child(27) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PPC-AD - Prenatal and PostPartum Care: Postpartum Care"
    );
    cy.get(
      ":nth-child(28) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PQI01-AD - PQI 01: Diabetes Short-Term Complications Admission Rate"
    );
    cy.get(
      ":nth-child(29) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PQI05-AD - PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate"
    );
    cy.get(
      ":nth-child(30) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should("have.text", "PQI08-AD - PQI 08: Heart Failure Admission Rate");
    cy.get(
      ":nth-child(31) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "PQI15-AD - PQI 15: Asthma in Younger Adults Admission Rate"
    );
    cy.get(
      ":nth-child(32) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "SAA-AD - Adherence to Antipsychotic Medications for Individuals with Schizophrenia"
    );
    cy.get(
      ":nth-child(33) > .chakra-checkbox > .chakra-checkbox__label > .chakra-text"
    ).should(
      "have.text",
      "SSD-AD - Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications"
    );
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
      "Complete all Adult Core Set Questions and Adult Core Set Measures to submit to CMS"
    );
    cy.get(":nth-child(4) > .chakra-stack > .css-0").should(
      "have.text",
      "Complete all Adult Core Set Questions and Adult Core Set Measures to submit to CMS for review"
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
