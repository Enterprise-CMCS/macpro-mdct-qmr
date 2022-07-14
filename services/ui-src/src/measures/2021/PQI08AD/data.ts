import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { getRateInfo } from "utils";

export const { categories, qualifiers } = getRateInfo();

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for heart failure per 100,000 beneficiary months for beneficiaries age 18 and Older.",
  ],
  categories,
  qualifiers,
};
