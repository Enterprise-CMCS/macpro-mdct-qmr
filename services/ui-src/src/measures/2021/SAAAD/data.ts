import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries age 18 and older during the measurement year with schizophrenia or schizoaffective disorder who were dispensed and remained on an antipsychotic medication for at least 80 percent of their treatment period.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
