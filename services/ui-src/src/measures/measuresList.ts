export interface MeasureList {
  [year: string]: MeasuresListItem[];
}

export type MeasureType = "A" | "C" | "H";

export interface MeasuresListItem {
  type: MeasureType;
  name: string;
  measureId: string;
  autocompleteOnCreation?: boolean;
}

export const measuresList: MeasureList = {
  "2021": [
    {
      type: "A",
      name: "Antidepressant Medication Management",
      measureId: "AMM-AD",
    },
    {
      type: "A",
      name: "Asthma Medication Ratio: Ages 19 to 64",
      measureId: "AMR-AD",
    },
    {
      type: "A",
      name: "Breast Cancer Screening",
      measureId: "BCS-AD",
    },
    {
      type: "A",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-AD",
    },
    {
      type: "A",
      name: "Contraceptive Care - Postpartum Women Ages 21 to 44",
      measureId: "CCP-AD",
    },
    {
      type: "A",
      name: "Cervical Cancer Screening",
      measureId: "CCS-AD",
    },
    {
      type: "A",
      name: "Contraceptive Care - All Women Ages 21 to 44",
      measureId: "CCW-AD",
    },
    {
      type: "A",
      name: "Screening for Depression and Follow-Up Plan: Age 18 and Older",
      measureId: "CDF-AD",
    },
    {
      type: "A",
      name: "Chlamydia Screening in Women Ages 21 to 24",
      measureId: "CHL-AD",
    },
    {
      type: "A",
      name: "Concurrent Use of Opioids and Benzodiazepines",
      measureId: "COB-AD",
    },
    {
      type: "A",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)",
      measureId: "CPA-AD",
    },
    {
      type: "A",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-AD",
    },
    {
      type: "A",
      name: "Follow-Up After Hospitalization for Mental Illness: Age 18 and Older",
      measureId: "FUH-AD",
    },
    {
      type: "A",
      name: "Follow-Up after Emergency Department Visit for Mental Illness",
      measureId: "FUM-AD",
    },
    {
      type: "A",
      name: "Flu Vaccinations for Adults Ages 18 to 64",
      measureId: "FVA-AD",
    },
    {
      type: "A",
      name: "Comprehensive Diabetes Care: Hemoglobin A1c (HbA1c) Poor Control (> 9.0%)",
      measureId: "HPC-AD",
    },
    {
      type: "A",
      name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measureId: "HPCMI-AD",
    },
    {
      type: "A",
      name: "HIV Viral Load Suppression",
      measureId: "HVL-AD",
    },
    {
      type: "A",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-AD",
    },
    {
      type: "A",
      name: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measureId: "MSC-AD",
    },
    {
      type: "A",
      name: "National Core Indicators Survey",
      measureId: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      name: "Use of Opioids at High Dosage in Persons Without Cancer",
      measureId: "OHD-AD",
    },
    {
      type: "A",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-AD",
    },
    {
      type: "A",
      name: "PC-01: Elective Delivery",
      measureId: "PC01-AD",
    },
    {
      type: "A",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-AD",
    },
    {
      type: "A",
      name: "Prenatal and Postpartum Care: Postpartum Care",
      measureId: "PPC-AD",
    },
    {
      type: "A",
      name: "PQI 01: Diabetes Short-Term Complications Admission Rate",
      measureId: "PQI01-AD",
    },
    {
      type: "A",
      name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measureId: "PQI05-AD",
    },
    {
      type: "A",
      name: "PQI 08: Heart Failure Admission Rate",
      measureId: "PQI08-AD",
    },
    {
      type: "A",
      name: "PQI 15: Asthma in Younger Adults Admission Rate",
      measureId: "PQI15-AD",
    },
    {
      type: "A",
      name: "Adherence to Antipsychotic Medications for Individuals With Schizophrenia",
      measureId: "SAA-AD",
    },
    {
      type: "A",
      name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measureId: "SSD-AD",
    },
    {
      type: "C",
      name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measureId: "ADD-CH",
    },
    {
      type: "C",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-CH",
    },
    {
      type: "C",
      name: "Asthma Medication Ratio: Ages 5 to 18",
      measureId: "AMR-CH",
    },
    {
      type: "C",
      name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measureId: "APM-CH",
    },
    {
      type: "C",
      name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measureId: "APP-CH",
    },
    {
      type: "C",
      name: "Audiological Diagnosis No Later than 3 Months of Age",
      measureId: "AUD-CH",
    },
    {
      type: "C",
      name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measureId: "CCP-CH",
    },
    {
      type: "C",
      name: "Contraceptive Care - All Women Ages 15 to 20",
      measureId: "CCW-CH",
    },
    {
      type: "C",
      name: "Screening for Depression and Follow-Up Plan: Ages 12 to 17",
      measureId: "CDF-CH",
    },
    {
      type: "C",
      name: "Chlamydia Screening in Women Ages 16 to 20",
      measureId: "CHL-CH",
    },
    {
      type: "C",
      name: "Childhood Immunization Status",
      measureId: "CIS-CH",
    },
    {
      type: "C",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measureId: "CPC-CH",
    },
    {
      type: "C",
      name: "Developmental Screening in the First Three Years of Life",
      measureId: "DEV-CH",
    },
    {
      type: "C",
      name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measureId: "FUH-CH",
    },
    {
      type: "C",
      name: "Immunizations for Adolescents",
      measureId: "IMA-CH",
    },
    {
      type: "C",
      name: "Live Births Weighing Less Than 2,500 Grams",
      measureId: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      name: "Low-Risk Cesarean Delivery",
      measureId: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      name: "Percentage of Eligibles Who Received Preventive Dental Services",
      measureId: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measureId: "PPC-CH",
    },
    {
      type: "C",
      name: "Sealant Receipt on Permanent First Molars",
      measureId: "SFM-CH",
    },
    {
      type: "C",
      name: "Well-Child Visits in the First 30 Months of Life",
      measureId: "W30-CH",
    },
    {
      type: "C",
      name: "Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents",
      measureId: "WCC-CH",
    },
    {
      type: "C",
      name: "Child and Adolescent Well-Care Visits",
      measureId: "WCV-CH",
    },
    {
      type: "H",
      name: "Admission to an Institution from the Community",
      measureId: "AIF-HH",
    },
    {
      type: "H",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-HH",
    },
    {
      type: "H",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-HH",
    },
    {
      type: "H",
      name: "Screening for Depression and Follow-Up Plan",
      measureId: "CDF-HH",
    },
    {
      type: "H",
      name: "Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-HH",
    },
    {
      type: "H",
      name: "Follow-Up after Hospitalization for Mental Illness",
      measureId: "FUH-HH",
    },
    {
      type: "H",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-HH",
    },
    {
      type: "H",
      name: "Inpatient Utilization",
      measureId: "IU-HH",
    },
    {
      type: "H",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-HH",
    },
    {
      type: "H",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-HH",
    },
    {
      type: "H",
      name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measureId: "PQI92-HH",
    },
  ],

  // New Measures will need to be added below in this static list
  "2022": [
    {
      type: "A",
      name: "Antidepressant Medication Management",
      measureId: "AMM-AD",
    },
    {
      type: "A",
      name: "Asthma Medication Ratio: Ages 19 to 64",
      measureId: "AMR-AD",
    },
    {
      type: "A",
      name: "Breast Cancer Screening",
      measureId: "BCS-AD",
    },
    {
      type: "A",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-AD",
    },
    {
      type: "A",
      name: "Contraceptive Care - Postpartum Women Ages 21 to 44",
      measureId: "CCP-AD",
    },
    {
      type: "A",
      name: "Cervical Cancer Screening",
      measureId: "CCS-AD",
    },
    {
      type: "A",
      name: "Contraceptive Care - All Women Ages 21 to 44",
      measureId: "CCW-AD",
    },
    {
      type: "A",
      name: "Screening for Depression and Follow-Up Plan: Age 18 and Older",
      measureId: "CDF-AD",
    },
    {
      type: "A",
      name: "Chlamydia Screening in Women Ages 21 to 24",
      measureId: "CHL-AD",
    },
    {
      type: "A",
      name: "Concurrent Use of Opioids and Benzodiazepines",
      measureId: "COB-AD",
    },
    {
      type: "A",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H, Adult Version (Medicaid)",
      measureId: "CPA-AD",
    },
    {
      type: "A",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-AD",
    },
    {
      type: "A",
      name: "Follow-Up After Hospitalization for Mental Illness: Age 18 and Older",
      measureId: "FUH-AD",
    },
    {
      type: "A",
      name: "Follow-Up after Emergency Department Visit for Mental Illness",
      measureId: "FUM-AD",
    },
    {
      type: "A",
      name: "Flu Vaccinations for Adults Ages 18 to 64",
      measureId: "FVA-AD",
    },
    {
      type: "A",
      name: "Comprehensive Diabetes Care: Hemoglobin A1c (HbA1c) Poor Control (> 9.0%)",
      measureId: "HPC-AD",
    },
    {
      type: "A",
      name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measureId: "HPCMI-AD",
    },
    {
      type: "A",
      name: "HIV Viral Load Suppression",
      measureId: "HVL-AD",
    },
    {
      type: "A",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-AD",
    },
    {
      type: "A",
      name: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measureId: "MSC-AD",
    },
    {
      type: "A",
      name: "National Core Indicators Survey",
      measureId: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      name: "Use of Opioids at High Dosage in Persons Without Cancer",
      measureId: "OHD-AD",
    },
    {
      type: "A",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-AD",
    },
    {
      type: "A",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-AD",
    },
    {
      type: "A",
      name: "Prenatal and Postpartum Care: Postpartum Care",
      measureId: "PPC-AD",
    },
    {
      type: "A",
      name: "PQI 01: Diabetes Short-Term Complications Admission Rate",
      measureId: "PQI01-AD",
    },
    {
      type: "A",
      name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measureId: "PQI05-AD",
    },
    {
      type: "A",
      name: "PQI 08: Heart Failure Admission Rate",
      measureId: "PQI08-AD",
    },
    {
      type: "A",
      name: "PQI 15: Asthma in Younger Adults Admission Rate",
      measureId: "PQI15-AD",
    },
    {
      type: "A",
      name: "Adherence to Antipsychotic Medications for Individuals With Schizophrenia",
      measureId: "SAA-AD",
    },
    {
      type: "A",
      name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measureId: "SSD-AD",
    },
    {
      type: "C",
      name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measureId: "ADD-CH",
    },
    {
      type: "C",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-CH",
    },
    {
      type: "C",
      name: "Asthma Medication Ratio: Ages 5 to 18",
      measureId: "AMR-CH",
    },
    {
      type: "C",
      name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measureId: "APM-CH",
    },
    {
      type: "C",
      name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measureId: "APP-CH",
    },
    {
      type: "C",
      name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measureId: "CCP-CH",
    },
    {
      type: "C",
      name: "Contraceptive Care - All Women Ages 15 to 20",
      measureId: "CCW-CH",
    },
    {
      type: "C",
      name: "Screening for Depression and Follow-Up Plan: Ages 12 to 17",
      measureId: "CDF-CH",
    },
    {
      type: "C",
      name: "Chlamydia Screening in Women Ages 16 to 20",
      measureId: "CHL-CH",
    },
    {
      type: "C",
      name: "Childhood Immunization Status",
      measureId: "CIS-CH",
    },
    {
      type: "C",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS®) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measureId: "CPC-CH",
    },
    {
      type: "C",
      name: "Developmental Screening in the First Three Years of Life",
      measureId: "DEV-CH",
    },
    {
      type: "C",
      name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measureId: "FUH-CH",
    },
    {
      type: "C",
      name: "Immunizations for Adolescents",
      measureId: "IMA-CH",
    },
    {
      type: "C",
      name: "Live Births Weighing Less Than 2,500 Grams",
      measureId: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      name: "Low-Risk Cesarean Delivery",
      measureId: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measureId: "PPC-CH",
    },
    {
      type: "C",
      name: "Sealant Receipt on Permanent First Molars",
      measureId: "SFM-CH",
    },
    {
      type: "C",
      name: "Well-Child Visits in the First 30 Months of Life",
      measureId: "W30-CH",
    },
    {
      type: "C",
      name: "Weight Assessment and Counseling for Nutrition and Physical Activity for Children/Adolescents",
      measureId: "WCC-CH",
    },
    {
      type: "C",
      name: "Child and Adolescent Well-Care Visits",
      measureId: "WCV-CH",
    },
    {
      type: "H",
      name: "Admission to an Institution from the Community",
      measureId: "AIF-HH",
    },
    {
      type: "H",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measureId: "AMB-HH",
    },
    {
      type: "H",
      name: "Controlling High Blood Pressure",
      measureId: "CBP-HH",
    },
    {
      type: "H",
      name: "Screening for Depression and Follow-Up Plan",
      measureId: "CDF-HH",
    },
    {
      type: "H",
      name: "Follow-Up after Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measureId: "FUA-HH",
    },
    {
      type: "H",
      name: "Follow-Up after Hospitalization for Mental Illness",
      measureId: "FUH-HH",
    },
    {
      type: "H",
      name: "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
      measureId: "IET-HH",
    },
    {
      type: "H",
      name: "Inpatient Utilization",
      measureId: "IU-HH",
    },
    {
      type: "H",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measureId: "OUD-HH",
    },
    {
      type: "H",
      name: "Plan All-Cause Readmissions",
      measureId: "PCR-HH",
    },
    {
      type: "H",
      name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measureId: "PQI92-HH",
    },
  ],
};
