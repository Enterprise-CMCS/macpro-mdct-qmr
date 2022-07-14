import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 64 with schizophrenia, schizoaffective disorder, or bipolar disorder, who were dispensed an antipsychotic medication and had a diabetes screening test during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
