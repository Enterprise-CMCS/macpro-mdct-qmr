import * as DC from "dataConstants";
import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [
  "30-day follow-up after ED visit for mental illness",
  "7-day follow-up after ED visit for mental illness",
];
export const qualifiers = [
  "Ages 6 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Total (Ages 6 and older)",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of emergency department (ED) visits for health home enrollees ages 6 and older with a principal diagnosis of mental illness or intentional self-harm and who had a follow-up visit for mental illness. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of ED visits for mental illness for which the enrollee received follow-up within 30 days of the ED visit (31 total days)",
    "Percentage of ED visits for mental illness for which the enrollee received follow-up within 7 days of the ED visit (8 total days)",
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
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
