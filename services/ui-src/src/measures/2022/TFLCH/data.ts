import { DataDrivenTypes } from "measures/2022/CommonQuestions/types";

export const qualifiers = [
  "Ages 1 to 2",
  "Ages 3 to 5",
  "Ages 6 to 7",
  "Ages 8 to 9",
  "Ages 10 to 11",
  "Ages 12 to 14",
  "Ages 15 to 18",
  "Ages 19 to 20",
  "Total Ages 1 through 20",
];
export const categories = [
  "Dental or oral health services",
  "Dental services",
  "Oral health services",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of enrolled children ages 1 through 20 who received at least two topical fluoride applications as: (1) dental or oral health services, (2) dental services, and (3) oral health services within the measurement year",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
