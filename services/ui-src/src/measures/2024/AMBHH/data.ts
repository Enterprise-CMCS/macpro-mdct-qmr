import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AMB-HH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Rate of emergency department (ED) visits per 1,000 enrollee months among health home enrollees.",
  ],
  categories,
  qualifiers,
};
