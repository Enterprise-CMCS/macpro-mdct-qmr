import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("CHL-CH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of women ages 16 to 20 who were identified as sexually active and who had at least one test for chlamydia during the measurement year.",
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
      { value: DC.ELECTRONIC_HEALTH_RECORDS, description: true },
      { value: DC.OTHER_DATA_SOURCE, description: true },
    ],
  },
  opm: {
    excludeOptions: ["O8BrOa"],
  },
};
