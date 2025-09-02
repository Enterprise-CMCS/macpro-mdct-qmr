import { ComplexRate } from "components";
import { getCatQualLabels } from "../rateLabelText";
import { MeasureTemplateData } from "shared/types/MeasureTemplate";
import { xNumbersYDecimals } from "utils";

export const { categories, qualifiers } = getCatQualLabels("AIF-HH");

const inputFieldNames = [
  {
    id: "Number of Enrollee Months",
    label: "Number of Enrollee Months",
    text: "Number of Enrollee Months",
  },
  {
    id: "Number of Short-Term Admissions",
    label: "Number of Short-Term Admissions",
    text: "Number of Short-Term Admissions",
  },
  {
    id: "Short-Term Admissions per 1,000 Enrollee Months",
    label: "Short-Term Admissions per 1,000 Enrollee Months",
    text: "Short-Term Admissions per 1,000 Enrollee Months",
  },
  {
    id: "Number of Medium-Term Admissions",
    label: "Number of Medium-Term Admissions",
    text: "Number of Medium-Term Admissions",
  },
  {
    id: "Medium-Term Admissions per 1,000 Enrollee Months",
    label: "Medium-Term Admissions per 1,000 Enrollee Months",
    text: "Medium-Term Admissions per 1,000 Enrollee Months",
  },
  {
    id: "Number of Long-Term Admissions",
    label: "Number of Long-Term Admissions",
    text: "Number of Long-Term Admissions",
  },
  {
    id: "Long-Term Admissions per 1,000 Enrollee Months",
    label: "Long-Term Admissions per 1,000 Enrollee Months",
    text: "Long-Term Admissions per 1,000 Enrollee Months",
  },
];

const ndrFormulas = [
  // Short-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 1,
    denominator: 0,
    rate: 2,
    mult: 1000,
  },
  // Medium-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 3,
    denominator: 0,
    rate: 4,
    mult: 1000,
  },
  // Long-Term Admissions per 1,000 Enrollee Months
  {
    numerator: 5,
    denominator: 0,
    rate: 6,
    mult: 1000,
  },
];

export const data: MeasureTemplateData = {
  type: "CMS",
  coreset: "health",
  performanceMeasure: {
    questionText: [
      "The number of admissions to an institutional facility among health home enrollees age 18 and older residing in the community for at least one month. The number of short-, medium-, or long-term admissions is reported per 1,000 enrollee months. Enrollee months reflect the total number of months each enrollee is enrolled in the program and residing in the community for at least one day of the month.",
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
      "The following three rates are reported across four age groups (ages 18 to 64, ages 65 to 74, ages 75 to 84, and age 85 and older):",
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
};
