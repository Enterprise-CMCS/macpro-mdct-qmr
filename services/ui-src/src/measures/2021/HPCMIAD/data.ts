import { DataDrivenTypes } from "measures/CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = ["Ages 18 to 64", "Ages 65 to 75"];
export const categories = []; // none

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 75 with serious mental illness and diabetes (type 1 and type 2) who had hemoglobin A1c (HbA1c) in poor control (> 9.0%).",
  ],
  questionListItems: [
    "Effective Acute Phase Treatment: Percentage of beneficiaries who remained on an antidepressant medication for at least 84 days (12 weeks).",
    "Effective Continuation Phase Treatment: Percentage of beneficiaries who remained on an antidepressant medication for at least 180 days (6 months).",
  ],
  categories,
  qualifiers,
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: DC.ADMINISTRATIVE_DATA,
      subOptions: [
        {
          label: "What is the Administrative Data Source?",
          options: [
            {
              value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
            },
            {
              value: DC.OTHER,
              description: true,
            },
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
            {
              value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
            },
            {
              value: DC.OTHER,
              description: true,
            },
          ],
        },
      ],
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
