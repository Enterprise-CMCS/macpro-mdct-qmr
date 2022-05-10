import { DataDrivenTypes } from "../../CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = [
  "Count of Index Hospital Stays",
  "Count of Observed 30-Day Readmissions",
  "Observed Readmission Rate",
  "Count of Expected 30-Day Readmissions",
  "Expected Readmission Rate",
  "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
  "Count of Beneficiaries in Medicaid Population",
  "Number of Outliers",
  "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "For beneficiaries ages 18 to 64, the number of acute inpatient and observation stays during the measurement year that were followed by an unplanned acute readmission for any diagnosis within 30 days and the predicted probability of an acute readmission. Data are reported in the following categories:",
  ],
  questionListItems: [
    "Count of Index Hospital Stays (IHS)",
    "Count of Observed 30-Day Readmissions",
    "Count of Expected 30-Day Readmissions",
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
