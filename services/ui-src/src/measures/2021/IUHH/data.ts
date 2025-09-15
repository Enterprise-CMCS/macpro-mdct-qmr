import { xNumbersYDecimals } from "utils";
import { getCatQualLabels } from "../rateLabelText";
import * as GV from "shared/globalValidations";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { ComplexRate } from "components";

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
      "Rate of acute inpatient care and services (total, maternity, mental and behavioral disorders, surgery, and medicine) per 1,000 enrollee months among Health Home enrollees.",
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
    GV.validateRequiredRadioButtonForCombinedRates,
    GV.validateReasonForNotReporting,
    GV.validateAtLeastOneDataSource,
    GV.validateBothDatesCompleted,
    GV.validateYearFormat,
    GV.ComplexValidateDualPopInformation,
    GV.ComplexAtLeastOneRateComplete,
    GV.ComplexNoNonZeroNumOrDenom,
    GV.ComplexValidateAtLeastOneNDRInDeviationOfMeasureSpec,
    GV.ComplexValidateNDRTotals,
  ],
};
