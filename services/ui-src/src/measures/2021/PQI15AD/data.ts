import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for asthma per 100,000 beneficiary months for beneficiaries ages 18 to 39.",
  ],
  categories,
  qualifiers,
};
