import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = [
  "Ages 13 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Total (age 13 and older)",
];
export const categories = [
  "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
  "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
  "Initiation of AOD Treatment: Opioid Abuse or Dependence",
  "Engagement of AOD Treatment: Opioid Abuse or Dependence",
  "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
  "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
  "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
  "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of Health Home enrollees age 13 and older with a new episode of alcohol or other drug (AOD) abuse or dependence who received the following:",
  ],
  questionListItems: [
    "Initiation of AOD Treatment. Percentage of enrollees who initiate treatment through an inpatient AOD admission, outpatient visit, intensive outpatient encounter or partial hospitalization, telehealth, or medication treatment within 14 days of the diagnosis. ",
    "Engagement of AOD Treatment. Percentage of enrollees who initiated treatment and who were engaged in ongoing AOD treatment within 34 days of the initiation visit.",
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
