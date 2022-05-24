import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = ["Ages 18 to 64", "Age 65 and older"];
export const categories = [
  "Follow-Up within 30 days after discharge",
  "Follow-Up within 7 days after discharge",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of discharges for beneficiaries age 18 and older who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of discharges for which the beneficiary received follow-up within 30 days of discharge",
    "Percentage of discharges for which the beneficiary received follow-up within 7 days of discharge",
  ],
  categories,
  qualifiers,
};
