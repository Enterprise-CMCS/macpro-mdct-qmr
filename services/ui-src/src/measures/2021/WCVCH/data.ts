import { DataDrivenTypes } from "measures/CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = [
  "Ages 3 to 11",
  "Ages 12 to 17",
  "Ages 18 to 21",
  "Total (Ages 3 to 21)",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children ages 3 to 21 who had at least one comprehensive well-care visit with a primary care practitioner (PCP) or an obstetrician/gynecologist (OB/GYN) during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
// change to array
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
