import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("APM-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "The percentage of children and adolescents ages 1 to 17 who had two or more antipsychotic prescriptions and had metabolic testing. Three rates are reported:",
    ],
    questionListItems: [
      "The percentage of children and adolescents on antipsychotics who received blood glucose testing",
      "The percentage of children and adolescents on antipsychotics who received cholesterol testing",
      "The percentage of children and adolescents on antipsychotics who received blood glucose and cholesterol testing",
    ],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
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
  custom: {
    calcTotal: true,
  },
};
