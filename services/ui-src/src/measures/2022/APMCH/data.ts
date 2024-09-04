import { DataDrivenTypes } from "shared/types";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("APM-CH");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of children and adolescents ages 1 to 17 who had two or more antipsychotic prescriptions and had metabolic testing. Three rates are reported:",
  ],
  questionListItems: [
    "Percentage of children and adolescents on antipsychotics who received blood glucose testing",
    "Percentage of children and adolescents on antipsychotics who received cholesterol testing",
    "Percentage of children and adolescents on antipsychotics who received blood glucose and cholesterol testing",
  ],
  categories,
  qualifiers,
};
