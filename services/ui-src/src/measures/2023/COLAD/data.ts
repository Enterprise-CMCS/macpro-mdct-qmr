import { DataDrivenTypes } from "shared/types";
import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("COL-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 45 to 75 who had appropriate screening for colorectal cancer.",
  ],
  questionListItems: [],
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
      value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
      description: true,
    },
    {
      value: DC.ELECTRONIC_HEALTH_RECORDS,
      description: true,
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
