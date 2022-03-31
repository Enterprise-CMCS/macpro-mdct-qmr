import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = [
  "Ages 3 to 11",
  "Ages 12 to 17",
  "Ages 18 to 21",
  "Total (Ages 3 to 21)",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children ages 3 to 21 who had at least one comprehensive well-care visit with a primary care practitioner (PCP) or an obstetrician/gynecologist (OB/GYN) during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
