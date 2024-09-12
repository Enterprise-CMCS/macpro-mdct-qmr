import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI05-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for chronic obstructive pulmonary disease (COPD) or asthma per 100,000 beneficiary months for beneficiaries age 40 and older.",
  ],
  categories,
  qualifiers,
};
