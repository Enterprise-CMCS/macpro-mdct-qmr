import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = ["Ages 18 to 64", "Age 65 and older"];
export const categories = [
  "Follow up within 30 days after discharge",
  "Follow up within 7 days after discharge",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of discharges for beneficiaries age 18 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of discharges for which the child received follow-up within 30 days after discharge",
    "Percentage of discharges for which the child received follow-up within 7 days after discharge",
  ],
  categories,
  qualifiers,
};
