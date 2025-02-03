import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("BCS-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of women ages 50 to 74 who had a mammogram to screen for breast cancer.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
  dataSource: {
    optionsLabel:
      "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
    options: [
      {
        value: "Administrative Data",
        subOptions: [
          {
            label: "What is the Administrative Data Source?",
            options: [
              {
                value: "Medicaid Management Information System (MMIS)",
              },
              {
                value: "Administrative Data Other",
                description: true,
              },
            ],
          },
        ],
      },
      {
        value: "Electronic Health Records",
        description: true,
      },
      {
        value: "Other Data Source",
        description: true,
      },
    ],
  },
  opm: {
    excludeOptions: ["Sex"],
  },
};
