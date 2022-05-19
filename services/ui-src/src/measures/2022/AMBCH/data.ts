import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = [
  "< Age 1",
  "Ages 1 to 9",
  "Ages 10 to 19",
  "Ages unknown",
  "Total (Ages <1 to 19)",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Rate of emergency department (ED) visits per 1,000 beneficiary months among children up to age 19.",
  ],
  categories,
  qualifiers,
};
