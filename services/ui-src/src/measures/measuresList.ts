export interface MeasureList {
  [year: string]: MeasuresListItem[];
}

export type MeasureType = "AD" | "CH" | "HH";

export interface MeasuresListItem {
  type: MeasureType;
  name: string;
  measureId: string;
  autocompleteOnCreation?: boolean;
}

export const measuresList: MeasureList = {
  "2021": [
    {
      type: "AD",
      name: "Antidepressant Medication Management",
      measureId: "AMM-AD",
    },
    {
      type: "AD",
      name: "Asthma Medication Ratio: Ages 19 to 64",
      measureId: "AMR-AD",
    },
    {
      type: "AD",
      name: "Breast Cancer Screening",
      measureId: "BCS-AD",
    },
    {
      type: "AD",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-AD",
    },
    {
      type: "AD",
      name: "Contraceptive Care - Postpartum Women Ages 21 to 44",
      measureId: "CCP-AD",
    },
    {
      type: "AD",
      name: "Cervical Cancer Screening",
      measureId: "CCS-AD",
    },
    {
      type: "AD",
      name: "Contraceptive Care - All Women Ages 21 to 44",
      measureId: "CCW-AD",
    },
    {
      type: "AD",
      name: "Screening for Depression and Follow-Up Plan: Age 18 and Older",
      measureId: "CDF-AD",
    },
    {
      type: "AD",
      name: "Chlamydia Screening in Women Ages 21 to 24",
      measureId: "CHL-AD",
    },
    {
      type: "AD",
      name: "Concurrent Use of Opioids and Benzodiazepines",
      measureId: "COB-AD",
    },
    {
      type: "AD",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)",
      measureId: "CPA-AD",
    },
    {
      type: "AD",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-AD",
    },
    {
      type: "AD",
      name: "Follow-Up After Hospitalization for Mental Illness: Age 18 and Older",
      measureId: "FUH-AD",
    },
    {
      type: "AD",
      name: "Follow-Up after Emergency Department Visit for Mental Illness",
      measureId: "FUM-AD",
    },
    {
      type: "AD",
      name: "Flu Vaccinations for Adults Ages 18 to 64",
      measureId: "FVA-AD",
    },
    {
      type: "AD",
      name: "Comprehensive Diabetes Care: Hemoglobin A1c (HbA1c) Poor Control (> 9.0%)",
      measureId: "HPC-AD",
    },
    {
      type: "AD",
      name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measureId: "HPCMI-AD",
    },
    {
      type: "AD",
      name: "HIV Viral Load Suppression",
      measureId: "HVL-AD",
    },
    {
      type: "AD",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-AD",
    },
    {
      type: "AD",
      name: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measureId: "MSC-AD",
    },
    {
      type: "AD",
      name: "National Core Indicators Survey",
      measureId: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "AD",
      name: "Use of Opioids at High Dosage in Persons Without Cancer",
      measureId: "OHD-AD",
    },
    {
      type: "AD",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-AD",
    },
    {
      type: "AD",
      name: "PC-01: Elective Delivery",
      measureId: "PC01-AD",
    },
    {
      type: "AD",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-AD",
    },
    {
      type: "AD",
      name: "Prenatal and Postpartum Care: Postpartum Care",
      measureId: "PPC-AD",
    },
    {
      type: "AD",
      name: "PQI 01: Diabetes Short-Term Complications Admission Rate",
      measureId: "PQI01-AD",
    },
    {
      type: "AD",
      name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measureId: "PQI05-AD",
    },
    {
      type: "AD",
      name: "PQI 08: Heart Failure Admission Rate",
      measureId: "PQI08-AD",
    },
    {
      type: "AD",
      name: "PQI 15: Asthma in Younger Adults Admission Rate",
      measureId: "PQI15-AD",
    },
    {
      type: "AD",
      name: "Adherence to Antipsychotic Medications for Individuals With Schizophrenia",
      measureId: "SAA-AD",
    },
    {
      type: "AD",
      name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measureId: "SSD-AD",
    },
    {
      type: "CH",
      name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measureId: "ADD-CH",
    },
    {
      type: "CH",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-CH",
    },
    {
      type: "CH",
      name: "Asthma Medication Ratio: Ages 5 to 18",
      measureId: "AMR-CH",
    },
    {
      type: "CH",
      name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measureId: "APM-CH",
    },
    {
      type: "CH",
      name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measureId: "APP-CH",
    },
    {
      type: "CH",
      name: "Audiological Diagnosis No Later Than 3 Months of Age",
      measureId: "AUD-CH",
    },
    {
      type: "CH",
      name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measureId: "CCP-CH",
    },
    {
      type: "CH",
      name: "Contraceptive Care - All Women Ages 15 to 20",
      measureId: "CCW-CH",
    },
    {
      type: "CH",
      name: "Screening for Depression and Follow-Up Plan: Ages 12 to 17",
      measureId: "CDF-CH",
    },
    {
      type: "CH",
      name: "Chlamydia Screening in Women Ages 16 to 20",
      measureId: "CHL-CH",
    },
    {
      type: "CH",
      name: "Childhood Immunization Status",
      measureId: "CIS-CH",
    },
    {
      type: "CH",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measureId: "CPC-CH",
    },
    {
      type: "CH",
      name: "Developmental Screening in the First Three Years of Life",
      measureId: "DEV-CH",
    },
    {
      type: "CH",
      name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measureId: "FUH-CH",
    },
    {
      type: "CH",
      name: "Immunizations for Adolescents",
      measureId: "IMA-CH",
    },
    {
      type: "CH",
      name: "Live Births Weighing Less Than 2,500 Grams",
      measureId: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "CH",
      name: "Low-Risk Cesarean Delivery",
      measureId: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "CH",
      name: "Percentage of Eligibles Who Received Preventive Dental Services",
      measureId: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "CH",
      name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measureId: "PPC-CH",
    },
    {
      type: "CH",
      name: "Sealant Receipt on Permanent First Molars",
      measureId: "SFM-CH",
    },
    {
      type: "CH",
      name: "Well-Child Visits in the First 30 Months of Life",
      measureId: "W30-CH",
    },
    {
      type: "CH",
      name: "Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents",
      measureId: "WCC-CH",
    },
    {
      type: "CH",
      name: "Child and Adolescent Well-Care Visits",
      measureId: "WCV-CH",
    },
    {
      type: "HH",
      name: "Admission to an Institution from the Community",
      measureId: "AIF-HH",
    },
    {
      type: "HH",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-HH",
    },
    {
      type: "HH",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-HH",
    },
    {
      type: "HH",
      name: "Screening for Depression and Follow-Up Plan",
      measureId: "CDF-HH",
    },
    {
      type: "HH",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-HH",
    },
    {
      type: "HH",
      name: "Follow-Up after Hosptialization for Mental Illness",
      measureId: "FUH-HH",
    },
    {
      type: "HH",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-HH",
    },
    {
      type: "HH",
      name: "Inpatient Hospitalization",
      measureId: "IU-HH",
    },
    {
      type: "HH",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-HH",
    },
    {
      type: "HH",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-HH",
    },
    {
      type: "HH",
      name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measureId: "PQI92-HH",
    },
  ],
};
