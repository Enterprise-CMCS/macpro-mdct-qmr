import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("AMB-HH");

export const data: MeasureTemplateData = {
  type: "HEDIS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Rate of emergency department (ED) visits per 1,000 enrollee months among health home enrollees.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    customTotalLabel: PMD.qualifiers[4].label,
    rateScale: 1000,
    allowNumeratorGreaterThanDenominator: true,
  },
};
