import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";

export const { categories, qualifiers } = getCatQualLabels("PQI05-AD");

export const data: MeasureTemplateData = {
  type: "AHRQ",
  coreset: "adult",
  performanceMeasure: {
    questionText: [
      "Number of inpatient hospital admissions for chronic obstructive pulmonary disease (COPD) or asthma per 100,000 beneficiary months for beneficiaries age 40 and older.",
    ],
    categories,
    qualifiers,
  },
  custom: {
    rateScale: 100000,
    allowNumeratorGreaterThanDenominator: true,
  },
};
