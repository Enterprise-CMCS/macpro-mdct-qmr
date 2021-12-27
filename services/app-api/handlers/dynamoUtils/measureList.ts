interface Measure {
  [year: number]: MeasureMetaData[];
}

export interface MeasureMetaData {
  type: string;
  description: string;
  measure: string;
}

export const measures: Measure = {
  2021: [
    {
      type: "AC",
      description: "Antidepressant Medication Management",
      measure: "AMM-AD",
    },
    {
      type: "AC",
      description: "Asthma Medication Ratio: Ages 19 to 64",
      measure: "AMR-AD",
    },
    {
      type: "AC",
      description: "Breast Cancer Screening",
      measure: "BCS-AD",
    },
    {
      type: "AC",
      description: "Controlling High Blood Pressure",
      measure: "CBP-AD",
    },
    {
      type: "AC",
      description: "Contraceptive Care Postpartum Women Ages 21-44",
      measure: "CCP-AD",
    },
    {
      type: "AC",
      description: "Cervical Cancer Screening",
      measure: "CCS-AD",
    },
    {
      type: "AC",
      description: "Contraceptive Care - All Women Ages 21 to 44",
      measure: "CCW-AD",
    },
    {
      type: "AC",
      description:
        "Screening for Depression and Follow-Up Plan: Age 18 and older",
      measure: "CDF-AD",
    },
    {
      type: "AC",
      description: "Chlamydia Screening in Women Ages 21-24",
      measure: "CHL-AD",
    },
    {
      type: "AC",
      description: "Concurrent Use of Opioids and Benzodiazepines",
      measure: "COB-AD",
    },
    {
      type: "AC",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.10H, Adult Version (Medicaid)",
      measure: "CPA-AD",
    },
    {
      type: "AC",
      description:
        "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-AD",
    },
    {
      type: "AC",
      description:
        "Follow-up after Hospitalization for Mental Illness: Age 18 and older",
      measure: "FUH-AD",
    },
    {
      type: "AC",
      description:
        "Follow-Up after Emergency Department Visit for Mental Illness",
      measure: "FUM-AD",
    },
    {
      type: "AC",
      description: "Flu Vaccinations for Adults Ages 18 to 64",
      measure: "FVA-AD",
    },
    {
      type: "AC",
      description:
        "Comprehensive Diabetes Care: Hemoglobin A1c Poor Control (>9.0%)",
      measure: "HPC-AD",
    },
    {
      type: "AC",
      description:
        "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measure: "HPCMI-AD",
    },
    {
      type: "AC",
      description: "HIV Viral Loan Suppression",
      measure: "HVL-AD",
    },
    {
      type: "AC",
      description:
        "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-AD",
    },
    {
      type: "AC",
      description: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measure: "MSC-AD",
    },
    {
      type: "AC",
      description: "National Core Indicators",
      measure: "NCIDDS-AD",
    },
    {
      type: "AC",
      description: "User of Opioids at High Dosage in Persons Without Cancer",
      measure: "OHD-AD",
    },
    {
      type: "AC",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-AD",
    },
    {
      type: "AC",
      description: "PC-01: Elective Delivery",
      measure: "PC01-AD",
    },
    {
      type: "AC",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-AD",
    },
    {
      type: "AC",
      description: "Prenatal and PostPartum Care: Postpartum Care",
      measure: "PPC-AD",
    },
    {
      type: "AC",
      description: "PQI 01: Diabetes Short-term Complications Admission Rate",
      measure: "PQI01-AD",
    },
    {
      type: "AC",
      description:
        "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measure: "PQI05-AD",
    },
    {
      type: "AC",
      description: "PQI 08: Heart Failure Admission Rate",
      measure: "PQI08-AD",
    },
    {
      type: "AC",
      description: "PQI 15: Asthma in Younger Adults Admission Rate",
      measure: "PQI15-AD",
    },
    {
      type: "AC",
      description:
        "Adherence to Antipsychotic Medications for Individuals with Schizophrenia",
      measure: "SAA-AD",
    },
    {
      type: "AC",
      description:
        "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measure: "SSD-AD",
    },
    {
      type: "CH",
      description:
        "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measure: "ADD-CH",
    },
    {
      type: "CH",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-CH",
    },
    {
      type: "CH",
      description: "Asthma Medication Ratio: Ages 5 to 18",
      measure: "AMR-CH",
    },
    {
      type: "CH",
      description:
        "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measure: "APM-CH",
    },
    {
      type: "CH",
      description:
        "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measure: "APP-CH",
    },
    {
      type: "CH",
      description: "Audiological Diagnosis No Later Than 3 Months of Age",
      measure: "AUD-CH",
    },
    {
      type: "CH",
      description: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measure: "CCP-CH",
    },
    {
      type: "CH",
      description: "Contraceptive Care - All Women Ages 15-20",
      measure: "CCW-CH",
    },
    {
      type: "CH",
      description: "Screening for Depression and Follow-up Plan: Ages 12 to 17",
      measure: "CDF-CH",
    },
    {
      type: "CH",
      description: "Chlamydia Screening in Women Ages 16 to 20",
      measure: "CHL-CH",
    },
    {
      type: "CH",
      description: "Childhood Immunization Status",
      measure: "CIS-CH",
    },
    {
      type: "CH",
      description:
        "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measure: "CPC-CH",
    },
    {
      type: "CH",
      description: "Developmental Screening in the First Three Years of Life",
      measure: "DEV-CH",
    },
    {
      type: "CH",
      description:
        "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measure: "FUH-CH",
    },
    {
      type: "CH",
      description: "Immunizations for Adolescents",
      measure: "IMA-CH",
    },
    {
      type: "CH",
      description: "Live Births Weighing Less Than 2,500 Grams",
      measure: "LBW-CH",
    },
    {
      type: "CH",
      description: "Low-Risk Cesarean Delivery",
      measure: "LRCD-CH",
    },
    {
      type: "CH",
      description:
        "Percentage of Eligibles Who Received Preventive Dental Services",
      measure: "PDENT-CH",
    },
    {
      type: "CH",
      description: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measure: "PPC-CH",
    },
    {
      type: "CH",
      description: "Sealant Receipt on Permanent First Molars",
      measure: "SFM-CH",
    },
    {
      type: "CH",
      description: "Well-Child Visits in the First 30 Months of Life",
      measure: "W30-CH",
    },
    {
      type: "CH",
      description:
        "Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents",
      measure: "WCC-CH",
    },
    {
      type: "CH",
      description: "Child and Adolescent Well-Care Visits",
      measure: "WCV-CH",
    },
    {
      type: "HH",
      description: "Admission to an Institution from the Community",
      measure: "AIF-HH",
    },
    {
      type: "HH",
      description: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-HH",
    },
    {
      type: "HH",
      description: "Controlling High Blood Pressure",
      measure: "CBP-HH",
    },
    {
      type: "HH",
      description: "Screening for Depression and Follow-Up Plan",
      measure: "CDF-HH",
    },
    {
      type: "HH",
      description:
        "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-HH",
    },
    {
      type: "HH",
      description: "Follow-Up after Hosptialization for Mental Illness",
      measure: "FUH-HH",
    },
    {
      type: "HH",
      description:
        "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-HH",
    },
    {
      type: "HH",
      description: "Inpatient Hospitalization",
      measure: "IU-HH",
    },
    {
      type: "HH",
      description: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-HH",
    },
    {
      type: "HH",
      description: "Plan All-Cause Readmissions",
      measure: "PCR-HH",
    },
    {
      type: "HH",
      description:
        "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measure: "PQI92-HH",
    },
  ],
  2022: [],
};
