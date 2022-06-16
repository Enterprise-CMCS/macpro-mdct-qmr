import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = [
  "Children screened by 12 months of age",
  "Children screened by 24 months of age",
  "Children screened by 36 months of age",
  "Children Total",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children screened for risk of developmental, behavioral, and social delays using a standardized screening tool in the 12 months preceding or on their first, second, or third birthday.",
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
              value: DC.ADMINISTRATIVE_DATA_OTHER,
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
        {
          label: "What is the Medical Records Data Source?",
          options: [
            {
              value: DC.EHR_DATA,
            },
            {
              value: DC.PAPER,
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
