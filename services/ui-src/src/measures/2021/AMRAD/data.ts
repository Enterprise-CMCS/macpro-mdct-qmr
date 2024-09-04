import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("AMR-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of beneficiaries ages 19 to 64 who were identified as having persistent asthma and had a ratio of controller medications to total asthma medications of 0.50 or greater during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
