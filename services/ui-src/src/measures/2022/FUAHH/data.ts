import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [
  "Follow-up within 30 days of ED visit",
  "Follow-up within 7 days of ED visit",
];
export const qualifiers = [
  "Ages 13 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Total",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of emergency department (ED) visits for Health Home enrollees age 13 and older with a principal diagnosis of alcohol or other drug (AOD) abuse or dependence who had a follow-up visit for AOD abuse or dependence.  Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of ED visits for which the enrollee received follow-up within 30 days of the ED visit (31 total days)",
    "Percentage of ED visits for which the enrollee received follow-up within 7 days of the ED visit (8 total days)",
  ],
  categories,
  qualifiers,
};
