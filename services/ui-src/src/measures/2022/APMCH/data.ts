import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";

export const qualifiers = [
  "Ages 1 to 11",
  "Ages 12 to 17",
  "Total (Ages 1 to 17)",
];
export const categories = [
  "Blood Glucose",
  "Cholesterol",
  "Blood Glucose and Cholesterol",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children and adolescents ages 1 to 17 who had two or more antipsychotic prescriptions and had metabolic testing. Three rates are reported:",
  ],
  questionListItems: [
    "Percentage of children and adolescents on antipsychotics who received blood glucose testing",
    "Percentage of children and adolescents on antipsychotics who received cholesterol testing",
    "Percentage of children and adolescents on antipsychotics who received blood glucose and cholesterol testing",
  ],
  categories,
  qualifiers,
};
