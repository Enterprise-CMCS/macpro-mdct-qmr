import { positiveNumbersWithMaxDecimalPlaces } from "utils";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PQI92-HH");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "Number of inpatient hospital admissions for ambulatory care sensitive chronic conditions per 100,000 enrollee months for health home enrollees age 18 and older. This measure includes adult hospital admissions for diabetes with short-term complications, diabetes with long-term complications, uncontrolled diabetes without complications, diabetes with lower-extremity amputation, chronic obstructive pulmonary disease, asthma, hypertension, or heart failure without a cardiac procedure.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    calcTotal: true,
    customTotalLabel: qualifiers[2].label,
    rateScale: 100000,
    allowNumeratorGreaterThanDenominator: true,
    customMask: positiveNumbersWithMaxDecimalPlaces(1),
  },
};
