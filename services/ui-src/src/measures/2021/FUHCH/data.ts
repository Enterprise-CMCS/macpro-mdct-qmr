import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = ["Ages 6 to 17"];
export const categories = ["7 Day Follow-Up", "30 Day Follow-Up"];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of discharges for children ages 6 to 17 who were hospitalized for treatment of selected mental illness or intentional self-harm diagnoses and who had a follow-up visit with a mental health provider. Two rates are reported:",
  ],
  questionListItems: [
    "Percentage of discharges for which the child received follow-up within 7 days after discharge",
    "Percentage of discharges for which the child received follow-up within 30 days after discharge",
  ],
  categories,
  qualifiers,
};
