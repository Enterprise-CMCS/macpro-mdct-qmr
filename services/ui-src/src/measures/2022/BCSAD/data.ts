import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = ["Ages 50 to 64", "Ages 65 to 74"];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of women ages 50 to 74 who had a mammogram to screen for breast cancer.",
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
};
