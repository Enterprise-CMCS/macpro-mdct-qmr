import { ComplexRate } from "components";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { xNumbersYDecimals } from "utils";

export const { categories, qualifiers } = getCatQualLabels("IU-HH");

const inputFieldNames = [
  {
    id: "Number of Enrollee Months",
    label: "Number of Enrollee Months",
    text: "Number of Enrollee Months",
  },
  { id: "Discharges", label: "Discharges", text: "Discharges" },
  {
    id: "Discharges per 1,000 Enrollee Months",
    label: "Discharges per 1,000 Enrollee Months",
    text: "Discharges per 1,000 Enrollee Months",
  },
  { id: "Days", label: "Days", text: "Days" },
  {
    id: "Days per 1,000 Enrollee Months",
    label: "Days per 1,000 Enrollee Months",
    text: "Days per 1,000 Enrollee Months",
  },
  {
    id: "Average Length of Stay",
    label: "Average Length of Stay",
    text: "Average Length of Stay",
  },
];

const ndrFormulas = [
  // Discharges per 1,000 Enrollee Months
  {
    num: 1,
    denom: 0,
    rate: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    num: 3,
    denom: 0,
    rate: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    num: 3,
    denom: 1,
    rate: 5,
    mult: 1,
  },
];

export const data: MeasureTemplateData = {
  type: "CMS",
  coreset: "health",
  performanceMeasure: {
    customPrompt:
      "Enter the appropriate data below. Completion of at least one set of Numerator/Denominator/Rate (numeric entry, other than zero) is required.",
    questionText: [
      "Rate of acute inpatient care and services (total, maternity, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among health home enrollees.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
    inputFieldNames,
    ndrFormulas,
    measureName: "UIHH",
  },
  custom: {
    calcTotal: true,
    customMask: xNumbersYDecimals(12, 1),
    allowNumeratorGreaterThanDenominator: true,
    RateComponent: ComplexRate,
  },
  opm: {
    componentFlag: "IU",
  },
};
