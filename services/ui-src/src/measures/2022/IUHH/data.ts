import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const categories = [
  "Inpatient",
  "Maternity",
  "Mental and Behavioral Disorders",
  "Surgery",
  "Medicine",
];
export const qualifiers = [
  "Ages 0 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Ages unknown",
  "Total",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter the appropriate data below. Completion of at least one set of Numerator/Denominator/Rate (numeric entry, other than zero) is required.",
  questionText: [
    "Rate of acute inpatient care and services (total, maternity, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among Health Home enrollees.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
