import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = [
  "Age <1",
  "Ages 1 to 2",
  "Ages 3 to 5",
  "Ages 6 to 7",
  "Ages 8 to 9",
  "Ages 10 to 11",
  "Ages 12 to 14",
  "Ages 15 to 18",
  "Ages 19 to 20",
  "Total ages <1 to 20",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children under age 21 who received a comprehensive or periodic oral evaluation within the measurement year.",
  ],
  categories,
  qualifiers,
};
