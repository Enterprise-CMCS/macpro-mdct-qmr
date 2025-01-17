import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PQI15-AD");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Number of inpatient hospital admissions for asthma per 100,000 beneficiary months for beneficiaries ages 18 to 39.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    rateScale: 100000,
    allowNumeratorGreaterThanDenominator: true,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
  },
};
