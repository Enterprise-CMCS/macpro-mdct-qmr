import { DataDrivenTypes } from "measures/2024/shared/CommonQuestions/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AAB-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter a number for the numerator and the denominator. The measure is reported as an inverted rate. The formula for the Rate = (1 - (Numerator/Denominator)) x 100",
  questionText: [
    "Percentage of episodes for beneficiaries age 18 and older with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
