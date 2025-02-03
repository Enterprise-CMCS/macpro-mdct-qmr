import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("EDV-AD");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "adult",
  performanceMeasure: {
    questionText: [""],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
};
