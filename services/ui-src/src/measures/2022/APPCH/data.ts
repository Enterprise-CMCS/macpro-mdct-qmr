import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("APP-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children and adolescents ages 1 to 17 who had a new prescription for an antipsychotic medication and had documentation of psychosocial care as first-line treatment.",
  ],
  categories,
  qualifiers,
};
