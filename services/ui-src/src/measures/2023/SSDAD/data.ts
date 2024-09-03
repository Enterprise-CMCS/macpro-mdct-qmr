import { DataDrivenTypes } from "shared/types/FormData";
import { getCatQualLabels } from "../rateLabelText";

export const { categories, qualifiers } = getCatQualLabels("SSD-AD");

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "Percentage of beneficiaries ages 18 to 64 with schizophrenia, schizoaffective disorder, or bipolar disorder, who were dispensed an antipsychotic medication and had a diabetes screening test during the measurement year.",
  ],
  questionListItems: [],
  categories,
  qualifiers,
};
