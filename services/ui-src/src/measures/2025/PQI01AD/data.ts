import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("PQI01-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Hospitalizations for a principal diagnosis of diabetes with short-term complications (ketoacidosis, hyperosmolarity, or coma) per 100,000 beneficiary months for beneficiaries age 18 and older.",
  ],
  categories,
  qualifiers,
};
