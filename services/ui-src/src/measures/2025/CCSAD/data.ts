import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("CCS-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  hybridMeasure: true,
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 21 to 64 who were recommended for routine cervical cancer screening and were screened using any of the following criteria:",
    ],
    questionListItems: [
      "Beneficiaries ages 21 to 64 who were recommended for routine cervical cancer screening and had cervical cytology performed within the last 3 years",
      "Beneficiaries ages 30 to 64 who were recommended for routine cervical cancer screening and had cervical high-risk human papillomavirus (hrHPV)  testing performed within the last 5 years",
      "Beneficiaries ages 30 to 64 who were recommended for routine cervical cancer screening and had cervical cytology/high-risk human papillomavirus (hrHPV) cotesting within the last 5 years",
    ],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: DC.ADMINISTRATIVE_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
        ],
      },
      {
        value: DC.HYBRID_DATA,
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              { value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA_OTHER, description: true },
            ],
          },
          {
            label: "What is the Medical Records Data Source?",
            options: [{ value: DC.EHR_DATA }, { value: DC.PAPER }],
          },
        ],
      },
      { value: DC.ELECTRONIC_HEALTH_RECORDS, description: true },
      {
        value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
        subOptions: [
          {
            options: [
              { value: DC.ELECTRONIC_HEALTH_RECORDS_PERSONAL_HEALTH_REGISTRY },
              { value: DC.HEALTH_INFORMATION_EXCHANGE_CLINICAL_REGISTRY },
              { value: DC.CASE_MANAGEMENT_SYSTEM },
              { value: DC.ADMINISTRATIVE_DATA },
            ],
          },
        ],
        description: true,
      },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
  opm: {
    excludeOptions: ["O8BrOa"],
  },
};
