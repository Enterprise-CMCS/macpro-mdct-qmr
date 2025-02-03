import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("AMM-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older who were treated with antidepressant medication, had a diagnosis of major depression, and who remained on an antidepressant medication treatment. Two rates are reported:",
    ],
    questionListItems: [
      "Effective Acute Phase Treatment: Percentage of beneficiaries who remained on an antidepressant medication for at least 84 days (12 weeks).",
      "Effective Continuation Phase Treatment: Percentage of beneficiaries who remained on an antidepressant medication for at least 180 days (6 months).",
    ],
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
              { value: "Medicaid Management Information System (MMIS)" },
              { value: "Administrative Data Other", description: true },
            ],
          },
        ],
      },
      { value: "Electronic Health Records", description: true },
      { value: "Other Data Source", description: true },
    ],
  },
};
