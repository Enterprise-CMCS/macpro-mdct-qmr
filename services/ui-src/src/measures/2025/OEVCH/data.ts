import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("OEV-CH");

export const data: MeasureTemplateData = {
  type: "ADA-DQA",
  coreset: "child",
  performanceMeasure: {
    questionText: [
      "Percentage of enrolled children under age 21 who received a comprehensive or periodic oral evaluation within the measurement year. For 2025 Child Core Set reporting, the following rate is required: Total (<Age 21).",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
  },
};
