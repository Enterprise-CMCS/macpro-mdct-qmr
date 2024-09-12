import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AMB-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Rate of emergency department (ED) visits per 1,000 beneficiary months among children up to age 19.",
  ],
  categories,
  qualifiers,
};
