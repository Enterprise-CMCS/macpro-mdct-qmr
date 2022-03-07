import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = ["Ages 18 to 64", "Age 65 to 85"];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 85 who had a diagnosis of hypertension and whose blood pressure (BP) was adequately controlled (< 140/90 mm Hg) during the measurement year.",
  ],
  questionListItems: [
    "Percentage of beneficiaries ages 18 to 85 who had a diagnosis of hypertension and whose blood pressure (BP) was adequately controlled (< 140/90 mm Hg) during the measurement year.",
  ],
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
      value: "Hybrid (Administrative and Medical Records Data)",
      subOptions: [
        {
          label: "What is the Administrative Data Source?",
          options: [
            {
              value: "Medicaid Management Information System (MMIS)",
            },
            {
              value: "Other",
              description: true,
            },
          ],
        },
        {
          label:
            "What is the Medical Records Data Source? (Both can be selected)",
          options: [
            {
              value: "Electronic Health Record (EHR) Data",
            },
            {
              value: "Paper",
            },
          ],
        },
      ],
    },
    {
      value: "Electronic Health Records",
    },
    {
      value: "Other Data Source",
      description: true,
    },
  ],
};
