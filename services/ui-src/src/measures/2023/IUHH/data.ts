import { ComplexRate } from "components";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { xNumbersYDecimals } from "utils";

export const { categories, qualifiers } = getCatQualLabels("IU-HH");

const inputFieldNames = [
  {
    label: "Number of Enrollee Months",
    text: "Number of Enrollee Months",
    id: "G3AVs1",
  },
  { label: "Discharges", text: "Discharges", id: "MwGkaA" },
  {
    label: "Discharges per 1,000 Enrollee Months",
    text: "Discharges per 1,000 Enrollee Months",
    id: "CGEK9m",
  },
  { label: "Days", text: "Days", id: "jSSEHA" },
  {
    label: "Days per 1,000 Enrollee Months",
    text: "Days per 1,000 Enrollee Months",
    id: "qjHhDk",
  },
  {
    label: "Average Length of Stay",
    text: "Average Length of Stay",
    id: "coDyWU",
  },
];

export const ndrFormulas = [
  // Discharges per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
    mult: 1000,
  },
  // Days per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
    mult: 1000,
  },
  // Average Length of Stay
  {
    numerator: 3,
    denominator: 1,
    rateIndex: 5,
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
      "Rate of acute inpatient care and services (total, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among health home enrollees.",
    ],
    questionListItems: [],
    categories,
    qualifiers,
    inputFieldNames,
    ndrFormulas,
    measureName: "IUHH",
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
  validations: [
    "validateRequiredRadioButtonForCombinedRates",
    "validateFfsRadioButtonCompletion",
    "validateAtLeastOneDataSourceType",
    "validateReasonForNotReporting",
    "validateDateRangeRadioButtonCompletion",
    "validateAtLeastOneDataSource",
    "validateDeviationTextFieldFilled",
    "validateOPMRates",
    "validateAtLeastOneDeliverySystem",
    "validateBothDatesCompleted",
    "validateAtLeastOneDefinitionOfPopulation",
    "validateYearFormat",
  ],
};
