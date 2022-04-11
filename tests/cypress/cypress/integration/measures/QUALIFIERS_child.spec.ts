describe("Child Measure Qualifier: CH", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Child Core Set Measures: Combined", () => {
    cy.goToChildCoreSetMeasures();
    cy.get('[data-cy="core-set-qualifiers-link"]').click();
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
      "As of September 30, 2020 what percentage of your Medicaid/CHIP enrollees (under age 21) were enrolled in each delivery system?"
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
      "Were any of the Core Set measures audited or validated?"
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
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-AUD-CH - Audiological Diagnosis No Later than 3 Months of Age"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCP-CH - Contraceptive Care - Postpartum Women Ages 15 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CCW-CH - Contraceptive Care - All Women Ages 15 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CDF-CH - Screening for Depression and Follow-Up Plan: Ages 12 to 17"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CHL-CH - Chlamydia Screening in Women Ages 16 to 20"]'
    ).should("be.visible");
    cy.get(
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CIS-CH - Childhood Immunization Status"]'
    ).should("be.visible");
    //cy.get(
    // '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-CPC-CH - Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items"]'
    //).should("be.visible");
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
      '[data-cy="CoreSetMeasuresAuditedOrValidatedDetails.0.MeasuresAuditedOrValidated-WCC-CH - Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents"]'
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
