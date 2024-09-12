import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI01-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Number of inpatient hospital admissions for diabetes short-term complications (ketoacidosis, hyperosmolarity, or coma) per 100,000 beneficiary months for beneficiaries age 18 and Older.",
  ],
  categories,
  qualifiers,
};
