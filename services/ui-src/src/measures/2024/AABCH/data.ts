import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AAB-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  customPrompt:
    "Enter a number for the numerator and the denominator. The measure is reported as an inverted rate. The formula for the Rate = (1 - (Numerator/Denominator)) x 100",
  questionText: [
    "The percentage of episodes for beneficiaries ages 3 months to 17 years with a diagnosis of acute bronchitis/bronchiolitis that did not result in an antibiotic dispensing event.",
  ],
  categories,
  qualifiers,
};
