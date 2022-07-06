import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [
  "Follow-up within 30 days after discharge",
  "Follow-up within 7 days after discharge",
];
export const qualifiers = [
  "Ages 6 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Total (Age 6 and older)",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of discharges for Health Home enrollees age 6 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of discharges for which the enrollee received follow-up within 30 days after discharge",
    "Percentage of discharges for which the enrollee received follow-up within 7 days after discharge",
  ],
  categories,
  qualifiers,
};
