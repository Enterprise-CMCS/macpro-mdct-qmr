export interface MeasureList {
  [year: string]: MeasuresListItem[];
}

export type MeasureType = "AD" | "CH" | "HH";

export interface MeasuresListItem {
  type: MeasureType;
  name: string;
  measure: string;
}

export const measuresList: MeasureList = {
  "2021": [
    {
      type: "AD",
      name: "Antidepressant Medication Management",
      measure: "AMM-AD",
    },
    {
      type: "AD",
      name: "Asthma Medication Ratio: Ages 19 to 64",
      measure: "AMR-AD",
    },
    {
      type: "AD",
      name: "Breast Cancer Screening",
      measure: "BCS-AD",
    },
    {
      type: "AD",
      name: "Controlling High Blood Pressure",
      measure: "CBP-AD",
    },
    {
      type: "AD",
      name: "Contraceptive Care Postpartum Women Ages 21-44",
      measure: "CCP-AD",
    },
    {
      type: "AD",
      name: "Cervical Cancer Screening",
      measure: "CCS-AD",
    },
    {
      type: "AD",
      name: "Contraceptive Care - All Women Ages 21 to 44",
      measure: "CCW-AD",
    },
    {
      type: "AD",
      name: "Screening for Depression and Follow-Up Plan: Age 18 and older",
      measure: "CDF-AD",
    },
    {
      type: "AD",
      name: "Chlamydia Screening in Women Ages 21-24",
      measure: "CHL-AD",
    },
    {
      type: "AD",
      name: "Concurrent Use of Opioids and Benzodiazepines",
      measure: "COB-AD",
    },
    {
      type: "AD",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.10H, Adult Version (Medicaid)",
      measure: "CPA-AD",
    },
    {
      type: "AD",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-AD",
    },
    {
      type: "AD",
      name: "Follow-up after Hospitalization for Mental Illness: Age 18 and older",
      measure: "FUH-AD",
    },
    {
      type: "AD",
      name: "Follow-Up after Emergency Department Visit for Mental Illness",
      measure: "FUM-AD",
    },
    {
      type: "AD",
      name: "Flu Vaccinations for Adults Ages 18 to 64",
      measure: "FVA-AD",
    },
    {
      type: "AD",
      name: "Comprehensive Diabetes Care: Hemoglobin A1c Poor Control (>9.0%)",
      measure: "HPC-AD",
    },
    {
      type: "AD",
      name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measure: "HPCMI-AD",
    },
    {
      type: "AD",
      name: "HIV Viral Loan Suppression",
      measure: "HVL-AD",
    },
    {
      type: "AD",
      name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-AD",
    },
    {
      type: "AD",
      name: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measure: "MSC-AD",
    },
    {
      type: "AD",
      name: "National Core Indicators",
      measure: "NCIDDS-AD",
    },
    {
      type: "AD",
      name: "User of Opioids at High Dosage in Persons Without Cancer",
      measure: "OHD-AD",
    },
    {
      type: "AD",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-AD",
    },
    {
      type: "AD",
      name: "PC-01: Elective Delivery",
      measure: "PC01-AD",
    },
    {
      type: "AD",
      name: "Plan All-Cause Readmissions",
      measure: "PCR-AD",
    },
    {
      type: "AD",
      name: "Prenatal and PostPartum Care: Postpartum Care",
      measure: "PPC-AD",
    },
    {
      type: "AD",
      name: "PQI 01: Diabetes Short-term Complications Admission Rate",
      measure: "PQI01-AD",
    },
    {
      type: "AD",
      name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measure: "PQI05-AD",
    },
    {
      type: "AD",
      name: "PQI 08: Heart Failure Admission Rate",
      measure: "PQI08-AD",
    },
    {
      type: "AD",
      name: "PQI 15: Asthma in Younger Adults Admission Rate",
      measure: "PQI15-AD",
    },
    {
      type: "AD",
      name: "Adherence to Antipsychotic Medications for Individuals with Schizophrenia",
      measure: "SAA-AD",
    },
    {
      type: "AD",
      name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measure: "SSD-AD",
    },
    {
      type: "CH",
      name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measure: "ADD-CH",
    },
    {
      type: "CH",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-CH",
    },
    {
      type: "CH",
      name: "Asthma Medication Ratio: Ages 5 to 18",
      measure: "AMR-CH",
    },
    {
      type: "CH",
      name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measure: "APM-CH",
    },
    {
      type: "CH",
      name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measure: "APP-CH",
    },
    {
      type: "CH",
      name: "Audiological Diagnosis No Later Than 3 Months of Age",
      measure: "AUD-CH",
    },
    {
      type: "CH",
      name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measure: "CCP-CH",
    },
    {
      type: "CH",
      name: "Contraceptive Care - All Women Ages 15-20",
      measure: "CCW-CH",
    },
    {
      type: "CH",
      name: "Screening for Depression and Follow-up Plan: Ages 12 to 17",
      measure: "CDF-CH",
    },
    {
      type: "CH",
      name: "Chlamydia Screening in Women Ages 16 to 20",
      measure: "CHL-CH",
    },
    {
      type: "CH",
      name: "Childhood Immunization Status",
      measure: "CIS-CH",
    },
    {
      type: "CH",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measure: "CPC-CH",
    },
    {
      type: "CH",
      name: "Developmental Screening in the First Three Years of Life",
      measure: "DEV-CH",
    },
    {
      type: "CH",
      name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measure: "FUH-CH",
    },
    {
      type: "CH",
      name: "Immunizations for Adolescents",
      measure: "IMA-CH",
    },
    {
      type: "CH",
      name: "Live Births Weighing Less Than 2,500 Grams",
      measure: "LBW-CH",
    },
    {
      type: "CH",
      name: "Low-Risk Cesarean Delivery",
      measure: "LRCD-CH",
    },
    {
      type: "CH",
      name: "Percentage of Eligibles Who Received Preventive Dental Services",
      measure: "PDENT-CH",
    },
    {
      type: "CH",
      name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measure: "PPC-CH",
    },
    {
      type: "CH",
      name: "Sealant Receipt on Permanent First Molars",
      measure: "SFM-CH",
    },
    {
      type: "CH",
      name: "Well-Child Visits in the First 30 Months of Life",
      measure: "W30-CH",
    },
    {
      type: "CH",
      name: "Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents",
      measure: "WCC-CH",
    },
    {
      type: "CH",
      name: "Child and Adolescent Well-Care Visits",
      measure: "WCV-CH",
    },
    {
      type: "HH",
      name: "Admission to an Institution from the Community",
      measure: "AIF-HH",
    },
    {
      type: "HH",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-HH",
    },
    {
      type: "HH",
      name: "Controlling High Blood Pressure",
      measure: "CBP-HH",
    },
    {
      type: "HH",
      name: "Screening for Depression and Follow-Up Plan",
      measure: "CDF-HH",
    },
    {
      type: "HH",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-HH",
    },
    {
      type: "HH",
      name: "Follow-Up after Hosptialization for Mental Illness",
      measure: "FUH-HH",
    },
    {
      type: "HH",
      name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-HH",
    },
    {
      type: "HH",
      name: "Inpatient Hospitalization",
      measure: "IU-HH",
    },
    {
      type: "HH",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-HH",
    },
    {
      type: "HH",
      name: "Plan All-Cause Readmissions",
      measure: "PCR-HH",
    },
    {
      type: "HH",
      name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measure: "PQI92-HH",
    },
  ],
  "2022": [],
};
