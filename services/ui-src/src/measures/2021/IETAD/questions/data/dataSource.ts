import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const data: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: "Administrative Data",
      subOptions: {
        label: "What is the Administrative Data Source?",
        options: [
          {
            value: "Medicaid Management Information System (MMIS)",
          },
          {
            value: "Other",
          },
        ],
      },
    },
    {
      value: "Electronic Health Records",
    },
    {
      value: "Other Data Source",
    },
  ],
};
