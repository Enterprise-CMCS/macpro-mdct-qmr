import { ComplexRate } from "components";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { xNumbersYDecimals } from "utils";

export const { categories, qualifiers } = getCatQualLabels("AIF-HH");

const inputFieldNames = [
  {
    label: "Number of Enrollee Months",
    text: "Number of Enrollee Months",
    id: "QFSYON",
  },
  {
    label: "Number of Short-Term Admissions",
    text: "Number of Short-Term Admissions",
    id: "tMeLfq",
  },
  {
    label: "Short-Term Admissions per 1,000 Enrollee Months",
    text: "Short-Term Admissions per 1,000 Enrollee Months",
    id: "bxkVCC",
  },
  {
    label: "Number of Medium-Term Admissions",
    text: "Number of Medium-Term Admissions",
    id: "KBOnkQ",
  },
  {
    label: "Medium-Term Admissions per 1,000 Enrollee Months",
    text: "Medium-Term Admissions per 1,000 Enrollee Months",
    id: "5RO62J",
  },
  {
    label: "Number of Long-Term Admissions",
    text: "Number of Long-Term Admissions",
    id: "m3HvMS",
  },
  {
    label: "Long-Term Admissions per 1,000 Enrollee Months",
    text: "Long-Term Admissions per 1,000 Enrollee Months",
    id: "dFMGFi",
  },
];

export const ndrFormulas = [
  // Short-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rateIndex: 2,
    mult: 1000,
  },
  // Medium-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rateIndex: 4,
    mult: 1000,
  },
  // Long-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 5,
    denominator: 0,
    rateIndex: 6,
    mult: 1000,
  },
];

export const data: MeasureTemplateData = {
  type: "CMS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "The number of admissions to a facility among enrollees age 18 and older residing in the community for at least one month. The number of short-term, medium-term, or long-term admissions is reported per 1,000 enrollee months. Enrollee months reflect the total number of months each enrollee is enrolled in the program and residing in the community for at least one day of the month.",
    ],
    questionListItems: [
      " The rate of admissions resulting in a short-term stay (1 to 20 days) per 1,000 enrollee months.",
      " The rate of admissions resulting in a medium-term stay (21 to 100 days) per 1,000 enrollee months.",
      " The rate of admissions resulting in a long-term stay (greater than or equal to 101 days) per 1,000 enrollee months.",
    ],
    questionListTitles: [
      "Short-Term Stay",
      "Medium-Term Stay",
      "Long-Term Stay",
    ],
    questionSubtext: [
      "The following three performance rates are reported across four age groups (ages 18 to 64, ages 65 to 74, ages 75 to 84, and age 85 and older):",
    ],
    categories,
    qualifiers,
    measureName: "AIFHH",
    inputFieldNames,
    ndrFormulas,
  },
  custom: {
    calcTotal: true,
    customMask: xNumbersYDecimals(12, 1),
    allowNumeratorGreaterThanDenominator: true,
    RateComponent: ComplexRate,
  },
  opm: {
    componentFlag: "AIF",
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
    "ComplexAtLeastOneRateComplete",
    "ComplexNoNonZeroNumOrDenom",
    "ComplexValidateNDRTotals",
    "ComplexValidateDualPopInformation",
  ],
};
