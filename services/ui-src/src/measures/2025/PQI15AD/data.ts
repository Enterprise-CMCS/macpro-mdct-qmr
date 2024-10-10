import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI15-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Hospitalizations with a principal diagnosis of asthma per 100,000 beneficiary months for beneficiaries ages 18 to 39.",
  ],
  categories,
  qualifiers,
};
