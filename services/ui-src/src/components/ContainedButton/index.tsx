import * as CUI from "@chakra-ui/react";
import { FaPlusCircle, FaPrint } from "react-icons/fa";
interface ContainedButtonProps {
  buttonText: any;
  buttonProps?: CUI.ButtonProps;
  disabledStatus?: boolean;
  helperText?: string;
  helperTextProps?: CUI.TextProps;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const measuresList = [
  {
    Type: "Adult",
    Name: "Antidepressant Medication Management",
    Abbreviation: "AMM-AD",
  },
  {
    Type: "Adult",
    Name: "Asthma Medication Ratio: Ages 19 to 64",
    Abbreviation: "AMR-AD",
  },
  {
    Type: "Adult",
    Name: "Breast Cancer Screening",
    Abbreviation: "BCS-AD",
  },
  {
    Type: "Adult",
    Name: "Controlling High Blood Pressure",
    Abbreviation: "CBP-AD",
  },
  {
    Type: "Adult",
    Name: "Contraceptive Care Postpartum Women Ages 21-44",
    Abbreviation: "CCP-AD",
  },
  {
    Type: "Adult",
    Name: "Cervical Cancer Screening",
    Abbreviation: "CCS-AD",
  },
  {
    Type: "Adult",
    Name: "Contraceptive Care - All Women Ages 21 to 44",
    Abbreviation: "CCW-AD",
  },
  {
    Type: "Adult",
    Name: "Screening for Depression and Follow-Up Plan: Age 18 and older",
    Abbreviation: "CDF-AD",
  },
  {
    Type: "Adult",
    Name: "Chlamydia Screening in Women Ages 21-24",
    Abbreviation: "CHL-AD",
  },
  {
    Type: "Adult",
    Name: "Concurrent Use of Opioids and Benzodiazepines",
    Abbreviation: "COB-AD",
  },
  {
    Type: "Adult",
    Name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.10H, Adult Version (Medicaid)",
    Abbreviation: "CPA-AD",
  },
  {
    Type: "Adult",
    Name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
    Abbreviation: "FUA-AD",
  },
  {
    Type: "Adult",
    Name: "Follow-up after Hospitalization for Mental Illness: Age 18 and older",
    Abbreviation: "FUH-AD",
  },
  {
    Type: "Adult",
    Name: "Follow-Up after Emergency Department Visit for Mental Illness",
    Abbreviation: "FUM-AD",
  },
  {
    Type: "Adult",
    Name: "Flu Vaccinations for Adults Ages 18 to 64",
    Abbreviation: "FVA-AD",
  },
  {
    Type: "Adult",
    Name: "Comprehensive Diabetes Care: Hemoglobin A1c Poor Control (>9.0%)",
    Abbreviation: "HPC-AD",
  },
  {
    Type: "Adult",
    Name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
    Abbreviation: "HPCMI-AD",
  },
  {
    Type: "Adult",
    Name: "HIV Viral Loan Suppression",
    Abbreviation: "HVL-AD",
  },
  {
    Type: "Adult",
    Name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
    Abbreviation: "IET-AD",
  },
  {
    Type: "Adult",
    Name: "Medical Assistance with Smoking and Tobacco Use Cessation",
    Abbreviation: "MSC-AD",
  },
  {
    Type: "Adult",
    Name: "National Core Indicators",
    Abbreviation: "NCIDDS-AD",
  },
  {
    Type: "Adult",
    Name: "User of Opioids at High Dosage in Persons Without Cancer",
    Abbreviation: "OHD-AD",
  },
  {
    Type: "Adult",
    Name: "Use of Pharmacotherapy for Opioid Use Disorder",
    Abbreviation: "OUD-AD",
  },
  {
    Type: "Adult",
    Name: "PC-01: Elective Delivery",
    Abbreviation: "PC01-AD",
  },
  {
    Type: "Adult",
    Name: "Plan All-Cause Readmissions",
    Abbreviation: "PCR-AD",
  },
  {
    Type: "Adult",
    Name: "Prenatal and PostPartum Care: Postpartum Care",
    Abbreviation: "PPC-AD",
  },
  {
    Type: "Adult",
    Name: "PQI 01: Diabetes Short-term Complications Admission Rate",
    Abbreviation: "PQI01-AD",
  },
  {
    Type: "Adult",
    Name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
    Abbreviation: "PQI05-AD",
  },
  {
    Type: "Adult",
    Name: "PQI 08: Heart Failure Admission Rate",
    Abbreviation: "PQI08-AD",
  },
  {
    Type: "Adult",
    Name: "PQI 15: Asthma in Younger Adults Admission Rate",
    Abbreviation: "PQI15-AD",
  },
  {
    Type: "Adult",
    Name: "Adherence to Antipsychotic Medications for Individuals with Schizophrenia",
    Abbreviation: "SAA-AD",
  },
  {
    Type: "Adult",
    Name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
    Abbreviation: "SSD-AD",
  },
  {
    Type: "Child",
    Name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
    Abbreviation: "ADD-CH",
  },
  {
    Type: "Child",
    Name: "Ambulatory Care: Emergency Department (ED) Visits",
    Abbreviation: "AMB-CH",
  },
  {
    Type: "Child",
    Name: "Asthma Medication Ratio: Ages 5 to 18",
    Abbreviation: "AMR-CH",
  },
  {
    Type: "Child",
    Name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
    Abbreviation: "APM-CH",
  },
  {
    Type: "Child",
    Name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
    Abbreviation: "APP-CH",
  },
  {
    Type: "Child",
    Name: "Audiological Diagnosis No Later Than 3 Months of Age",
    Abbreviation: "AUD-CH",
  },
  {
    Type: "Child",
    Name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
    Abbreviation: "CCP-CH",
  },
  {
    Type: "Child",
    Name: "Contraceptive Care - All Women Ages 15-20",
    Abbreviation: "CCW-CH",
  },
  {
    Type: "Child",
    Name: "Screening for Depression and Follow-up Plan: Ages 12 to 17",
    Abbreviation: "CDF-CH",
  },
  {
    Type: "Child",
    Name: "Chlamydia Screening in Women Ages 16 to 20",
    Abbreviation: "CHL-CH",
  },
  {
    Type: "Child",
    Name: "Childhood Immunization Status",
    Abbreviation: "CIS-CH",
  },
  {
    Type: "Child",
    Name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
    Abbreviation: "CPC-CH",
  },
  {
    Type: "Child",
    Name: "Developmental Screening in the First Three Years of Life",
    Abbreviation: "DEV-CH",
  },
  {
    Type: "Child",
    Name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
    Abbreviation: "FUH-CH",
  },
  {
    Type: "Child",
    Name: "Immunizations for Adolescents",
    Abbreviation: "IMA-CH",
  },
  {
    Type: "Child",
    Name: "Live Births Weighing Less Than 2,500 Grams",
    Abbreviation: "LBW-CH",
  },
  {
    Type: "Child",
    Name: "Low-Risk Cesarean Delivery",
    Abbreviation: "LRCD-CH",
  },
  {
    Type: "Child",
    Name: "Percentage of Eligibles Who Received Preventive Dental Services",
    Abbreviation: "PDENT-CH",
  },
  {
    Type: "Child",
    Name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
    Abbreviation: "PPC-CH",
  },
  {
    Type: "Child",
    Name: "Sealant Receipt on Permanent First Molars",
    Abbreviation: "SFM-CH",
  },
  {
    Type: "Child",
    Name: "Well-Child Visits in the First 30 Months of Life",
    Abbreviation: "W30-CH",
  },
  {
    Type: "Child",
    Name: "Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents",
    Abbreviation: "WCC-CH",
  },
  {
    Type: "Child",
    Name: "Child and Adolescent Well-Care Visits",
    Abbreviation: "WCV-CH",
  },
  {
    Type: "Health Homes",
    Name: "Admission to an Institution from the Community",
    Abbreviation: "AIF-HH",
  },
  {
    Type: "Health Homes",
    Name: "Ambulatory Care: Emergency Department (ED) Visits",
    Abbreviation: "AMB-HH",
  },
  {
    Type: "Health Homes",
    Name: "Controlling High Blood Pressure",
    Abbreviation: "CBP-HH",
  },
  {
    Type: "Health Homes",
    Name: "Screening for Depression and Follow-Up Plan",
    Abbreviation: "CDF-HH",
  },
  {
    Type: "Health Homes",
    Name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
    Abbreviation: "FUA-HH",
  },
  {
    Type: "Health Homes",
    Name: "Follow-Up after Hosptialization for Mental Illness",
    Abbreviation: "FUH-HH",
  },
  {
    Type: "Health Homes",
    Name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
    Abbreviation: "IET-HH",
  },
  {
    Type: "Health Homes",
    Name: "Inpatient Hospitalization",
    Abbreviation: "IU-HH",
  },
  {
    Type: "Health Homes",
    Name: "Use of Pharmacotherapy for Opioid Use Disorder",
    Abbreviation: "OUD-HH",
  },
  {
    Type: "Health Homes",
    Name: "Plan All-Cause Readmissions",
    Abbreviation: "PCR-HH",
  },
  {
    Type: "Health Homes",
    Name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
    Abbreviation: "PQI92-HH",
  },
];

export const ContainedButton = ({
  disabledStatus,
  buttonText,
  buttonProps,
  helperText,
  helperTextProps,
  icon,
  onClick,
}: ContainedButtonProps) => {
  const printIcon = icon === "print" ? <FaPrint /> : undefined;
  const plusIcon = icon === "plus" ? <FaPlusCircle /> : undefined;

  return (
    <CUI.Box>
      <CUI.Button
        leftIcon={printIcon}
        rightIcon={plusIcon}
        onClick={onClick}
        disabled={disabledStatus}
        borderRadius="sm"
        {...buttonProps}
      >
        {buttonText}
      </CUI.Button>
      {helperText && <CUI.Text {...helperTextProps}>{helperText}</CUI.Text>}
    </CUI.Box>
  );
};
