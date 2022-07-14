import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children and adolescents ages 1 to 17 who had a new prescription for an antipsychotic medication and had documentation of psychosocial care as first-line treatment.",
  ],
  categories,
  qualifiers,
};
