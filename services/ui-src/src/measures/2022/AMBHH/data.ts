import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = [
  "Ages 0 to 17",
  "Ages 18 to 64",
  "Age 65 and older",
  "Ages unknown",
  "Total (All Ages)",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Rate of emergency department (ED) visits per 1,000 enrollee months among Health Home enrollees.",
  ],
  categories,
  qualifiers,
};
