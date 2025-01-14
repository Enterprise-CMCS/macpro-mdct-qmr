import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import * as DC from "dataConstants";

export const { categories, qualifiers } = getCatQualLabels("OEV-CH");

export const data: MeasureTemplateData = {
  type: "DC.ADA_DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled children under age 21 who received a comprehensive or periodic oral evaluation within the measurement year.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    customTotalLabel: qualifiers.slice(-1)[0].label,
  },
};
