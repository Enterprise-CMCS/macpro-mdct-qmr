interface Measure {
  [year: number]: MeasureMetaData[];
}

export const stateAbbreviations = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export interface MeasureMetaData {
  type: "A" | "C" | "H";
  description: string;
  measure: string;
  autocompleteOnCreation?: boolean;
}

export const measures: Measure = {
  2021: [
    {
      type: "A",
      description: "Adult Qualifiers",
      measure: "CSQ",
    },
    {
      type: "C",
      description: "Child Qualifiers",
      measure: "CSQ",
    },
    {
      type: "H",
      description: "Health Home Qualifiers",
      measure: "CSQ",
    },
    {
      type: "A",
      description: "Antidepressant Medication Management",
      measure: "AMM-AD",
    },
    {
      type: "A",
      description: "Asthma Medication Ratio: Ages 19 to 64",
      measure: "AMR-AD",
    },
    {
      type: "A",
      description: "Breast Cancer Screening",
      measure: "BCS-AD",
    },
    {
      type: "A",
      description: "Controlling High Blood Pressure",
      measure: "CBP-AD",
    },
    {
      type: "A",
      description: "Contraceptive Care - Postpartum Women Ages 21 to 44",
      measure: "CCP-AD",
    },
    {
      type: "A",
      description: "Cervical Cancer Screening",
      measure: "CCS-AD",
    },
    {
      type: "A",
      description: "Contraceptive Care - All Women Ages 21 to 44",
      measure: "CCW-AD",
    },
    {
      type: "A",
      description:
        "Screening for Depression and Follow-Up Plan: Age 18 and Older",
      measure: "CDF-AD",
    },
    {
      type: "A",
      description: "Chlamydia Screening in Women Ages 21 to 24",
      measure: "CHL-AD",
    },
    {
      type: "A",
      description: "Concurrent Use of Opioids and Benzodiazepines",
      measure: "COB-AD",
    },
    {
      type: "A",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)",
      measure: "CPA-AD",
    },
    {
      type: "A",
      description:
        "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-AD",
    },
    {
      type: "A",
      description:
        "Follow-up after Hospitalization for Mental Illness: Age 18 and Older",
      measure: "FUH-AD",
    },
    {
      type: "A",
      description:
        "Follow-Up after Emergency Department Visit for Mental Illness",
      measure: "FUM-AD",
    },
    {
      type: "A",
      description: "Flu Vaccinations for Adults Ages 18 to 64",
      measure: "FVA-AD",
    },
    {
      type: "A",
      description:
        "Comprehensive Diabetes Care: Hemoglobin A1c (HbA1c) Poor Control (> 9.0%)",
      measure: "HPC-AD",
    },
    {
      type: "A",
      description:
        "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measure: "HPCMI-AD",
    },
    {
      type: "A",
      description: "HIV Viral Load Suppression",
      measure: "HVL-AD",
    },
    {
      type: "A",
      description:
        "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-AD",
    },
    {
      type: "A",
      description: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measure: "MSC-AD",
    },
    {
      type: "A",
      description: "National Core Indicators Survey",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      description: "Use of Opioids at High Dosage in Persons Without Cancer",
      measure: "OHD-AD",
    },
    {
      type: "A",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-AD",
    },
    {
      type: "A",
      description: "PC-01: Elective Delivery",
      measure: "PC01-AD",
    },
    {
      type: "A",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-AD",
    },
    {
      type: "A",
      description: "Prenatal and Postpartum Care: Postpartum Care",
      measure: "PPC-AD",
    },
    {
      type: "A",
      description: "PQI 01: Diabetes Short-Term Complications Admission Rate",
      measure: "PQI01-AD",
    },
    {
      type: "A",
      description:
        "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measure: "PQI05-AD",
    },
    {
      type: "A",
      description: "PQI 08: Heart Failure Admission Rate",
      measure: "PQI08-AD",
    },
    {
      type: "A",
      description: "PQI 15: Asthma in Younger Adults Admission Rate",
      measure: "PQI15-AD",
    },
    {
      type: "A",
      description:
        "Adherence to Antipsychotic Medications for Individuals With Schizophrenia",
      measure: "SAA-AD",
    },
    {
      type: "A",
      description:
        "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measure: "SSD-AD",
    },
    {
      type: "C",
      description:
        "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measure: "ADD-CH",
    },
    {
      type: "C",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-CH",
    },
    {
      type: "C",
      description: "Asthma Medication Ratio: Ages 5 to 18",
      measure: "AMR-CH",
    },
    {
      type: "C",
      description:
        "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measure: "APM-CH",
    },
    {
      type: "C",
      description:
        "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measure: "APP-CH",
    },
    {
      type: "C",
      description: "Audiological Diagnosis No Later than 3 Months of Age",
      measure: "AUD-CH",
    },
    {
      type: "C",
      description: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measure: "CCP-CH",
    },
    {
      type: "C",
      description: "Contraceptive Care - All Women Ages 15 to 20",
      measure: "CCW-CH",
    },
    {
      type: "C",
      description: "Screening for Depression and Follow-Up Plan: Ages 12 to 17",
      measure: "CDF-CH",
    },
    {
      type: "C",
      description: "Chlamydia Screening in Women Ages 16 to 20",
      measure: "CHL-CH",
    },
    {
      type: "C",
      description: "Childhood Immunization Status",
      measure: "CIS-CH",
    },
    {
      type: "C",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measure: "CPC-CH",
    },
    {
      type: "C",
      description: "Developmental Screening in the First Three Years of Life",
      measure: "DEV-CH",
    },
    {
      type: "C",
      description:
        "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measure: "FUH-CH",
    },
    {
      type: "C",
      description: "Immunizations for Adolescents",
      measure: "IMA-CH",
    },
    {
      type: "C",
      description: "Live Births Weighing Less Than 2,500 Grams",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      description: "Low-Risk Cesarean Delivery",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      description:
        "Percentage of Eligibles Who Received Preventive Dental Services",
      measure: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      description: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measure: "PPC-CH",
    },
    {
      type: "C",
      description: "Sealant Receipt on Permanent First Molars",
      measure: "SFM-CH",
    },
    {
      type: "C",
      description: "Well-Child Visits in the First 30 Months of Life",
      measure: "W30-CH",
    },
    {
      type: "C",
      description:
        "Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents",
      measure: "WCC-CH",
    },
    {
      type: "C",
      description: "Child and Adolescent Well-Care Visits",
      measure: "WCV-CH",
    },
    {
      type: "H",
      description: "Admission to an Institution from the Community",
      measure: "AIF-HH",
    },
    {
      type: "H",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-HH",
    },
    {
      type: "H",
      description: "Controlling High Blood Pressure",
      measure: "CBP-HH",
    },
    {
      type: "H",
      description: "Screening for Depression and Follow-Up Plan",
      measure: "CDF-HH",
    },
    {
      type: "H",
      description:
        "Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-HH",
    },
    {
      type: "H",
      description: "Follow-Up after Hospitalization for Mental Illness",
      measure: "FUH-HH",
    },
    {
      type: "H",
      description:
        "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-HH",
    },
    {
      type: "H",
      description: "Inpatient Utilization",
      measure: "IU-HH",
    },
    {
      type: "H",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-HH",
    },
    {
      type: "H",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-HH",
    },
    {
      type: "H",
      description:
        "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measure: "PQI92-HH",
    },
  ],
  2022: [
    {
      type: "A",
      description: "Adult Qualifiers",
      measure: "CSQ",
    },
    {
      type: "C",
      description: "Child Qualifiers",
      measure: "CSQ",
    },
    {
      type: "H",
      description: "Health Home Qualifiers",
      measure: "CSQ",
    },
    {
      type: "A",
      description: "Antidepressant Medication Management",
      measure: "AMM-AD",
    },
    {
      type: "A",
      description: "Asthma Medication Ratio: Ages 19 to 64",
      measure: "AMR-AD",
    },
    {
      type: "A",
      description: "Breast Cancer Screening",
      measure: "BCS-AD",
    },
    {
      type: "A",
      description: "Controlling High Blood Pressure",
      measure: "CBP-AD",
    },
    {
      type: "A",
      description: "Contraceptive Care - Postpartum Women Ages 21 to 44",
      measure: "CCP-AD",
    },
    {
      type: "A",
      description: "Cervical Cancer Screening",
      measure: "CCS-AD",
    },
    {
      type: "A",
      description: "Contraceptive Care - All Women Ages 21 to 44",
      measure: "CCW-AD",
    },
    {
      type: "A",
      description:
        "Screening for Depression and Follow-Up Plan: Age 18 and Older",
      measure: "CDF-AD",
    },
    {
      type: "A",
      description: "Chlamydia Screening in Women Ages 21 to 24",
      measure: "CHL-AD",
    },
    {
      type: "A",
      description: "Concurrent Use of Opioids and Benzodiazepines",
      measure: "COB-AD",
    },
    {
      type: "A",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)",
      measure: "CPA-AD",
    },
    {
      type: "A",
      description:
        "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-AD",
    },
    {
      type: "A",
      description:
        "Follow-up after Hospitalization for Mental Illness: Age 18 and Older",
      measure: "FUH-AD",
    },
    {
      type: "A",
      description:
        "Follow-Up after Emergency Department Visit for Mental Illness",
      measure: "FUM-AD",
    },
    {
      type: "A",
      description: "Flu Vaccinations for Adults Ages 18 to 64",
      measure: "FVA-AD",
    },
    {
      type: "A",
      description:
        "Comprehensive Diabetes Care: Hemoglobin A1c (HbA1c) Poor Control (> 9.0%)",
      measure: "HPC-AD",
    },
    {
      type: "A",
      description:
        "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measure: "HPCMI-AD",
    },
    {
      type: "A",
      description: "HIV Viral Load Suppression",
      measure: "HVL-AD",
    },
    {
      type: "A",
      description:
        "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-AD",
    },
    {
      type: "A",
      description: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measure: "MSC-AD",
    },
    {
      type: "A",
      description: "National Core Indicators Survey",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      description: "Use of Opioids at High Dosage in Persons Without Cancer",
      measure: "OHD-AD",
    },
    {
      type: "A",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-AD",
    },
    {
      type: "A",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-AD",
    },
    {
      type: "A",
      description: "Prenatal and Postpartum Care: Postpartum Care",
      measure: "PPC-AD",
    },
    {
      type: "A",
      description: "PQI 01: Diabetes Short-Term Complications Admission Rate",
      measure: "PQI01-AD",
    },
    {
      type: "A",
      description:
        "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measure: "PQI05-AD",
    },
    {
      type: "A",
      description: "PQI 08: Heart Failure Admission Rate",
      measure: "PQI08-AD",
    },
    {
      type: "A",
      description: "PQI 15: Asthma in Younger Adults Admission Rate",
      measure: "PQI15-AD",
    },
    {
      type: "A",
      description:
        "Adherence to Antipsychotic Medications for Individuals With Schizophrenia",
      measure: "SAA-AD",
    },
    {
      type: "A",
      description:
        "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measure: "SSD-AD",
    },
    {
      type: "C",
      description:
        "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measure: "ADD-CH",
    },
    {
      type: "C",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-CH",
    },
    {
      type: "C",
      description: "Asthma Medication Ratio: Ages 5 to 18",
      measure: "AMR-CH",
    },
    {
      type: "C",
      description:
        "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measure: "APM-CH",
    },
    {
      type: "C",
      description:
        "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measure: "APP-CH",
    },
    {
      type: "C",
      description: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measure: "CCP-CH",
    },
    {
      type: "C",
      description: "Contraceptive Care - All Women Ages 15 to 20",
      measure: "CCW-CH",
    },
    {
      type: "C",
      description: "Screening for Depression and Follow-Up Plan: Ages 12 to 17",
      measure: "CDF-CH",
    },
    {
      type: "C",
      description: "Chlamydia Screening in Women Ages 16 to 20",
      measure: "CHL-CH",
    },
    {
      type: "C",
      description: "Childhood Immunization Status",
      measure: "CIS-CH",
    },
    {
      type: "C",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measure: "CPC-CH",
    },
    {
      type: "C",
      description: "Developmental Screening in the First Three Years of Life",
      measure: "DEV-CH",
    },
    {
      type: "C",
      description:
        "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measure: "FUH-CH",
    },
    {
      type: "C",
      description: "Immunizations for Adolescents",
      measure: "IMA-CH",
    },
    {
      type: "C",
      description: "Live Births Weighing Less Than 2,500 Grams",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      description: "Low-Risk Cesarean Delivery",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      description: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measure: "PPC-CH",
    },
    {
      type: "C",
      description: "Sealant Receipt on Permanent First Molars",
      measure: "SFM-CH",
    },
    {
      type: "C",
      description: "Prevention: Topical Fluoride for Children",
      measure: "TFL-CH",
    },
    {
      type: "C",
      description: "Well-Child Visits in the First 30 Months of Life",
      measure: "W30-CH",
    },
    {
      type: "C",
      description:
        "Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents",
      measure: "WCC-CH",
    },
    {
      type: "C",
      description: "Child and Adolescent Well-Care Visits",
      measure: "WCV-CH",
    },
    {
      type: "H",
      description: "Admission to an Institution from the Community",
      measure: "AIF-HH",
    },
    {
      type: "H",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-HH",
    },
    {
      type: "H",
      description: "Controlling High Blood Pressure",
      measure: "CBP-HH",
    },
    {
      type: "H",
      description: "Screening for Depression and Follow-Up Plan",
      measure: "CDF-HH",
    },
    {
      type: "H",
      description:
        "Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-HH",
    },
    {
      type: "H",
      description: "Follow-Up after Hospitalization for Mental Illness",
      measure: "FUH-HH",
    },
    {
      type: "H",
      description:
        "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-HH",
    },
    {
      type: "H",
      description: "Inpatient Utilization",
      measure: "IU-HH",
    },
    {
      type: "H",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-HH",
    },
    {
      type: "H",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-HH",
    },
    {
      type: "H",
      description:
        "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measure: "PQI92-HH",
    },
  ],
};
