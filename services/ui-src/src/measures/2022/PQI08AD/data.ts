import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI08-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for heart failure per 100,000 beneficiary months for beneficiaries age 18 and Older.",
  ],
  categories,
  qualifiers,
};
