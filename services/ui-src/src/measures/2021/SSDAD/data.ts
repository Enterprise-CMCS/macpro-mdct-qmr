import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("SSD-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries ages 18 to 64 with schizophrenia, schizoaffective disorder, or bipolar disorder, who were dispensed an antipsychotic medication and had a diabetes screening test during the measurement year.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
};
