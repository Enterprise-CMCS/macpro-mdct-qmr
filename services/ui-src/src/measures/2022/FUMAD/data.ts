import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [
  "30-day follow-up after ED visit for mental illness",
  "7-day follow-up after ED visit for mental illness",
];
export const qualifiers = ["Ages 18 to 64", "Age 65 and older"];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of emergency department (ED) visits for beneficiaries age 18 and Older with a principal diagnosis of mental illness or intentional self-harm and who had a follow-up visit for mental illness. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of ED visits for mental illness for which the beneficiary received follow-up within 30 days of the ED visit (31 total days)",
    "Percentage of ED visits for mental illness for which the beneficiary received follow-up within 7 days of the ED visit (8 total days)",
  ],
  categories,
  qualifiers,
};
