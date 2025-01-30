import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("SAA-AD");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Percentage of beneficiaries age 18 and older during the measurement year with schizophrenia or schizoaffective disorder who were dispensed and remained on an antipsychotic medication for at least 80 percent of their treatment period.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
  },
};
