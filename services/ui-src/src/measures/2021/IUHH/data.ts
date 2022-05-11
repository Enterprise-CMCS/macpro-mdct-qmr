import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const categories = [
  // "Age Ranges",
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
  "Unknown",
  "Total",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Rate of acute inpatient care and services (total, maternity, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among Health Home enrollees.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
