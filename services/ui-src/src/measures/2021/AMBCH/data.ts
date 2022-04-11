import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = [
  "< Age 1",
  "Ages 1 to 9",
  "Ages unknown",
  "Total (Ages <1 to 19)",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of children and adolescents ages 5 to 18 who were identified as having persistent asthma and had a ratio of controller medications to total asthma medications of 0.50 or greater during the measurement year.",
  ],
  categories,
  qualifiers,
};
