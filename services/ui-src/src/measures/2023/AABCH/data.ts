import { DataDrivenTypes } from "measures/2023/shared/CommonQuestions/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AAB-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of episodes for beneficiaries ages 3 months to 17 years with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.",
  ],
  categories,
  qualifiers,
};
