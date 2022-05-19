import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = [
  "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age (90 days).",
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
      value: "Electronic Health Records",
      description: true,
    },
    {
      value: "Other",
      description: true,
    },
  ],
};
