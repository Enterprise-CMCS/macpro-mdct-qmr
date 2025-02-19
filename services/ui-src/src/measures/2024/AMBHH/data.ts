import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { positiveNumbersWithMaxDecimalPlaces } from "utils";

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
    rateScale: 1000,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
    allowNumeratorGreaterThanDenominator: true,
  },
};
