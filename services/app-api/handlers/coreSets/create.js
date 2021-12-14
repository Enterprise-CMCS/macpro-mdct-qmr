import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import { create } from "domain";
import { type } from "os";

export const createCoreSet = handler(async (event, context) => {
  // The State Year and ID are all part of the path
  const state = event.pathParameters.state;
  const year = event.pathParameters.year;
  const coreSet = event.pathParameters.coreSet;
  // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
  const dynamoKey = `${state}${year}${coreSet}`;

  const params = {
    TableName: process.env.coreSetTableName,
    Item: {
      compoundKey: dynamoKey,
      state: state,
      year: year,
      coreSet: coreSet,
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: event.headers["cognito-identity-id"],
      status: "incomplete",
    },
  };

  await dynamoDb.put(params);
  await createDependentMeasures(state, year, coreSet);

  return params.Item;
});

const createDependentMeasures = async (state, year, coreSet) => {
  for await (const measure of Measures[year]) {
    // The State Year and ID are all part of the path
    const measureId = measure["measure"];
    // Dynamo only accepts one row as a key, so we are using a combination for the dynamoKey
    const dynamoKey = `${state}${year}${coreSet}${measureId}`;
    const params = {
      TableName: process.env.measureTableName,
      Item: {
        compoundKey: dynamoKey,
        state: state,
        year: year,
        coreSet: coreSet,
        measure: measureId,
        createdAt: Date.now(),
        lastAltered: Date.now(),
        status: "incomplete",
        description: measure.name,
      },
    };
    console.log("created measure: ", params);
    await dynamoDb.put(params);
  }
};

const Measures = {
  2021: [
    {
      type: "Adult",
      name: "Antidepressant Medication Management",
      measure: "AMM-AD",
    },
    {
      type: "Adult",
      name: "Asthma Medication Ratio: Ages 19 to 64",
      measure: "AMR-AD",
    },
    {
      type: "Adult",
      name: "Breast Cancer Screening",
      measure: "BCS-AD",
    },
    {
      type: "Adult",
      name: "Controlling High Blood Pressure",
      measure: "CBP-AD",
    },
    {
      type: "Adult",
      name: "Contraceptive Care Postpartum Women Ages 21-44",
      measure: "CCP-AD",
    },
    {
      type: "Adult",
      name: "Cervical Cancer Screening",
      measure: "CCS-AD",
    },
    {
      type: "Adult",
      name: "Contraceptive Care - All Women Ages 21 to 44",
      measure: "CCW-AD",
    },
    {
      type: "Adult",
      name: "Screening for Depression and Follow-Up Plan: Age 18 and older",
      measure: "CDF-AD",
    },
    {
      type: "Adult",
      name: "Chlamydia Screening in Women Ages 21-24",
      measure: "CHL-AD",
    },
    {
      type: "Adult",
      name: "Concurrent Use of Opioids and Benzodiazepines",
      measure: "COB-AD",
    },
    {
      type: "Adult",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.10H, Adult Version (Medicaid)",
      measure: "CPA-AD",
    },
    {
      type: "Adult",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-AD",
    },
    {
      type: "Adult",
      name: "Follow-up after Hospitalization for Mental Illness: Age 18 and older",
      measure: "FUH-AD",
    },
    {
      type: "Adult",
      name: "Follow-Up after Emergency Department Visit for Mental Illness",
      measure: "FUM-AD",
    },
    {
      type: "Adult",
      name: "Flu Vaccinations for Adults Ages 18 to 64",
      measure: "FVA-AD",
    },
    {
      type: "Adult",
      name: "Comprehensive Diabetes Care: Hemoglobin A1c Poor Control (>9.0%)",
      measure: "HPC-AD",
    },
    {
      type: "Adult",
      name: "Diabetes Care for People with Serious Mental Illness: Hemoglobin A1C (HbA1c) Poor Control (>9.0%)",
      measure: "HPCMI-AD",
    },
    {
      type: "Adult",
      name: "HIV Viral Loan Suppression",
      measure: "HVL-AD",
    },
    {
      type: "Adult",
      name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-AD",
    },
    {
      type: "Adult",
      name: "Medical Assistance with Smoking and Tobacco Use Cessation",
      measure: "MSC-AD",
    },
    {
      type: "Adult",
      name: "National Core Indicators",
      measure: "NCIDDS-AD",
    },
    {
      type: "Adult",
      name: "User of Opioids at High Dosage in Persons Without Cancer",
      measure: "OHD-AD",
    },
    {
      type: "Adult",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-AD",
    },
    {
      type: "Adult",
      name: "PC-01: Elective Delivery",
      measure: "PC01-AD",
    },
    {
      type: "Adult",
      name: "Plan All-Cause Readmissions",
      measure: "PCR-AD",
    },
    {
      type: "Adult",
      name: "Prenatal and PostPartum Care: Postpartum Care",
      measure: "PPC-AD",
    },
    {
      type: "Adult",
      name: "PQI 01: Diabetes Short-term Complications Admission Rate",
      measure: "PQI01-AD",
    },
    {
      type: "Adult",
      name: "PQI 05: Chronic Obstructive Pulmonary Disease (COPD) or Asthma in Older Adults Admission Rate",
      measure: "PQI05-AD",
    },
    {
      type: "Adult",
      name: "PQI 08: Heart Failure Admission Rate",
      measure: "PQI08-AD",
    },
    {
      type: "Adult",
      name: "PQI 15: Asthma in Younger Adults Admission Rate",
      measure: "PQI15-AD",
    },
    {
      type: "Adult",
      name: "Adherence to Antipsychotic Medications for Individuals with Schizophrenia",
      measure: "SAA-AD",
    },
    {
      type: "Adult",
      name: "Diabetes Screening for People with Schizophrenia or Bipolar Disorder Who Are Using Antipsychotic Medications",
      measure: "SSD-AD",
    },
    {
      type: "Child",
      name: "Follow-Up Care for Children Prescribed Attention-Deficit/Hyperactivity Disorder (ADHD) Medication",
      measure: "ADD-CH",
    },
    {
      type: "Child",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-CH",
    },
    {
      type: "Child",
      name: "Asthma Medication Ratio: Ages 5 to 18",
      measure: "AMR-CH",
    },
    {
      type: "Child",
      name: "Metabolic Monitoring for Children and Adolescents on Antipsychotics",
      measure: "APM-CH",
    },
    {
      type: "Child",
      name: "Use of First-Line Psychosocial Care for Children and Adolescents on Antipsychotics",
      measure: "APP-CH",
    },
    {
      type: "Child",
      name: "Audiological Diagnosis No Later Than 3 Months of Age",
      measure: "AUD-CH",
    },
    {
      type: "Child",
      name: "Contraceptive Care - Postpartum Women Ages 15 to 20",
      measure: "CCP-CH",
    },
    {
      type: "Child",
      name: "Contraceptive Care - All Women Ages 15-20",
      measure: "CCW-CH",
    },
    {
      type: "Child",
      name: "Screening for Depression and Follow-up Plan: Ages 12 to 17",
      measure: "CDF-CH",
    },
    {
      type: "Child",
      name: "Chlamydia Screening in Women Ages 16 to 20",
      measure: "CHL-CH",
    },
    {
      type: "Child",
      name: "Childhood Immunization Status",
      measure: "CIS-CH",
    },
    {
      type: "Child",
      name: "Consumer Assessment of Healthcare Providers and Systems (CAHPS) Health Plan Survey 5.1H - Child Version Including Medicaid and Children with Chronic Conditions Supplemental Items",
      measure: "CPC-CH",
    },
    {
      type: "Child",
      name: "Developmental Screening in the First Three Years of Life",
      measure: "DEV-CH",
    },
    {
      type: "Child",
      name: "Follow-Up After Hospitalization for Mental Illness: Ages 6 to 17",
      measure: "FUH-CH",
    },
    {
      type: "Child",
      name: "Immunizations for Adolescents",
      measure: "IMA-CH",
    },
    {
      type: "Child",
      name: "Live Births Weighing Less Than 2,500 Grams",
      measure: "LBW-CH",
    },
    {
      type: "Child",
      name: "Low-Risk Cesarean Delivery",
      measure: "LRCD-CH",
    },
    {
      type: "Child",
      name: "Percentage of Eligibles Who Received Preventive Dental Services",
      measure: "PDENT-CH",
    },
    {
      type: "Child",
      name: "Prenatal and Postpartum Care: Timeliness of Prenatal Care",
      measure: "PPC-CH",
    },
    {
      type: "Child",
      name: "Sealant Receipt on Permanent First Molars",
      measure: "SFM-CH",
    },
    {
      type: "Child",
      name: "Well-Child Visits in the First 30 Months of Life",
      measure: "W30-CH",
    },
    {
      type: "Child",
      name: "Weight Assessment and Counseling for Nutrition and. Physical Activity for Children/Adolescents",
      measure: "WCC-CH",
    },
    {
      type: "Child",
      name: "Child and Adolescent Well-Care Visits",
      measure: "WCV-CH",
    },
    {
      type: "Health Homes",
      name: "Admission to an Institution from the Community",
      measure: "AIF-HH",
    },
    {
      type: "Health Homes",
      name: "Ambulatory Care: Emergency Department (ED) Visits",
      measure: "AMB-HH",
    },
    {
      type: "Health Homes",
      name: "Controlling High Blood Pressure",
      measure: "CBP-HH",
    },
    {
      type: "Health Homes",
      name: "Screening for Depression and Follow-Up Plan",
      measure: "CDF-HH",
    },
    {
      type: "Health Homes",
      name: "Follow-up After Emergency Department Visit for Alcohol and Other Drug Abuse or Dependence",
      measure: "FUA-HH",
    },
    {
      type: "Health Homes",
      name: "Follow-Up after Hosptialization for Mental Illness",
      measure: "FUH-HH",
    },
    {
      type: "Health Homes",
      name: "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
      measure: "IET-HH",
    },
    {
      type: "Health Homes",
      name: "Inpatient Hospitalization",
      measure: "IU-HH",
    },
    {
      type: "Health Homes",
      name: "Use of Pharmacotherapy for Opioid Use Disorder",
      measure: "OUD-HH",
    },
    {
      type: "Health Homes",
      name: "Plan All-Cause Readmissions",
      measure: "PCR-HH",
    },
    {
      type: "Health Homes",
      name: "Prevention Quality Indicator (PQI) 92: Chronic Conditions Composite",
      measure: "PQI92-HH",
    },
  ],
  2022: [],
};
