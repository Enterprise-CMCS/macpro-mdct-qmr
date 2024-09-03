import { DataDrivenTypes } from "shared/types/FormData";
import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("APM-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children and adolescents ages 1 to 17 who had two or more antipsychotic prescriptions and had metabolic testing. Three rates are reported:",
  ],
  questionListItems: [
    "Percentage of children and adolescents on antipsychotics who received blood glucose testing",
    "Percentage of children and adolescents on antipsychotics who received cholesterol testing",
    "Percentage of children and adolescents on antipsychotics who received blood glucose and cholesterol testing",
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
      value: DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
      description: true,
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
