import { DataDrivenTypes } from "shared/types";
import * as DC from "dataConstants";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("ADD-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children newly prescribed attention-deficit/hyperactivity disorder (ADHD) medication who had at least three follow-up care visits within a 10-month period, one of which was within 30 days of when the first ADHD medication was dispensed. Two rates are reported.",
  ],
  questionSubtextTitles: [
    "Initiation Phase",
    "Continuation and Maintenance (C&M) Phase",
  ],
  questionSubtext: [
    "Percentage of children ages 6 to 12 with an ambulatory prescription dispensed for ADHD medication, who had one follow-up visit with a practitioner with prescribing authority during the 30-day Initiation Phase.",
    "Percentage of children ages 6 to 12 with an ambulatory prescription dispensed for ADHD medication who remained on the medication for at least 210 days and who, in addition to the visit in the Initiation Phase, had at least two follow-up visits with a practitioner within 270 days (9 months) after the Initiation Phase ended.",
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
      value: DC.ELECTRONIC_HEALTH_RECORDS,
      description: true,
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};
