import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("OEVP-CH");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: ["."],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
};
